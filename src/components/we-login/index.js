import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'

import wechatIcon from '@assets/components/we-login/wechat.png'

export default class WeLogin extends Component {

  render () {
    return (
      <View className='we-login'>
        <View className='we-login-tips'>登录查看个人主页</View>

        <Button className='we-login-bttn' open-type="">
          <Image className='we-login-bttn-icon' src={wechatIcon}></Image>
          <Text className='we-login-bttn-text'>微信一键登录</Text>
        </Button>

      </View>
    )
  }
}
