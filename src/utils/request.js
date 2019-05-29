import Taro from '@tarojs/taro'
import { getUrlDataCache } from '@utils/cache'
import md5 from 'md5'

import {
  API_USER,
} from '@constants/api'

let session = ''
let lock = false //加锁避免多次请求登录，导致存储session信息无法一一对应（回调的不确定性）

// import { API_USER, API_USER_LOGIN } from '@constants/api'

// const CODE_SUCCESS = '200'
// const CODE_AUTH_EXPIRED = '600'

// function getStorage(key) {
//   return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
// }

// function updateStorage(data = {}) {
//   return Promise.all([
//     Taro.setStorage({ key: 'token', data: data['3rdSession'] || '' }),
//     Taro.setStorage({ key: 'uid', data: data['uid'] || ''})
//   ])
// }

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */

 /*
export default async function fetch(options) {
  const { url, payload, method = 'GET', showToast = true, autoLogin = true } = options
  const token = await getStorage('token')
  const header = token ? { 'WX-PIN-SESSION': token, 'X-WX-3RD-Session': token } : {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {
    const { code, data } = res.data

    if (code !== CODE_SUCCESS) {
      if (code === CODE_AUTH_EXPIRED) {
        await updateStorage({})
      }
      return Promise.reject(res.data)
    }

    if (url === API_USER_LOGIN) {
      await updateStorage(data)
    }

    // XXX 用户信息需展示 uid，但是 uid 是登录接口就返回的，比较蛋疼，暂时糅合在 fetch 中解决
    if (url === API_USER) {
      const uid = await getStorage('uid')
      return { ...data, uid }
    }

    return data
  }).catch((err) => {
    const defaultMsg = err.code === CODE_AUTH_EXPIRED ? '登录失效' : '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
      Taro.navigateTo({
        url: '/pages/user-login/user-login'
      })
    }

    return Promise.reject({ message: defaultMsg, ...err })
  })
}
*/

function parseCookie(cookie, name) {
    let cookies = cookie;
    let list = cookies.split("; ")          // 解析出名/值对列表
        
    for(let i = 0; i < list.length; i++) {
      let arr = list[i].split("=");          // 解析出名和值
      if(arr[0] == name)
        return decodeURIComponent(arr[1]);   // 对cookie值解码
    }
    return "";
}

function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

function getSession() {
  if(!lock) {
    lock = true

    return Taro.login().then(res=>{
      let code = res.code
      let method = 'GET'
      return Taro.request({
        url: API_USER,
        method,
        data: {
          code,
        },
      }).then(res => {

        if(res.statusCode == 200) {
          let cookie = res.header["set-cookie"] || res.header["Set-Cookie"];
          if (!!cookie) {
            Taro.setStorageSync('session', cookie)

            lock = false
            return cookie
          }
        }

        lock = false
        return ''
      }).catch(() => '')
    })
  }
}

export default async function fetch(options) {
  const { url, payload, method = 'GET', showToast = true, autoLogin = true } = options
  let header = {}

  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }

  //存在缓存，返回缓存结果
  if(!!payload.url) {
    let cacheUrl = md5(payload.url)
    let urlDataCache = getUrlDataCache(cacheUrl)
  
    if(!!urlDataCache) {
      urlDataCache.cached = true
      return Promise.resolve(urlDataCache) 
    }
  }

  if(!session) { //这个过程只是程序启动的时候执行一次
    session  = await getStorage('session')
    //过期处理
    if(!!session) {
      let cookieExpires = parseCookie(session, 'Expires')
      let expiresTime = new Date(cookieExpires).getTime()
      let nowTime = new Date().getTime()

      if(nowTime > expiresTime) {
        session =  await getSession()
      }
    }

    //不存在session
    if(!session) {
      session =  await getSession()
    }

    //仍然不存在
    // if(!session) {
    //   console.log('hi')
    //   Taro.showToast({
    //     title: '获取不到登录信息',
    //     icon: 'none'
    //   })
    // }
  }
  header['cookie'] = !!session ? session : ''

  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {
    const { statusCode, data } = res

    if (statusCode !== 200) {
      return Promise.reject(res.data)
    }

    return data
  }).catch((err) => {
    const defaultMsg = '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    return Promise.reject({ message: defaultMsg, ...err })
  })
}
