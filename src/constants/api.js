/**
 * NOTE HOST 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
const devMode = false
// devMode = true

export const host = devMode ? HOST_DEV : HOST
export const hostDev = HOST_DEV

/* eslint-enable */

//hotwords
export const API_HOT_WORDS = `${host}/bookapi/v2/hotWords`

//search book
export const API_SEARCH_BOOK = `${host}/bookapi/v2/search`

//book info
export const API_BOOK_INFO = `${host}/bookapi/v2/chapters`

//book content
export const API_READ_CONTENT = `${host}/bookapi/v2/content`

// // pic
// export const CDN = 'https://yanxuan.nosdn.127.net'

// // home
// export const API_HOME = `${host}/xhr/index/index.json`
// export const API_HOME_SEARCH_COUNT = `${host}/xhr/search/displayBar.json`
// export const API_HOME_PIN = `${hostM}/pin/min/item/recommend.json`
// export const API_HOME_RECOMMEND = `${host}/xhr/rcmd/index.json`

// // cate
// export const API_CATE = `${host}/xhr/list/category.json`
// export const API_CATE_SUB = `${host}/xhr/list/subCate.json`
// export const API_CATE_SUB_LIST = `${host}/xhr/list/l2Items2.json`

// // cart
// export const API_CART = `${host}/xhr/promotionCart/getCarts.json`
// export const API_CART_NUM = `${host}/xhr/promotionCart/getMiniCartNum.json`
// export const API_CART_RECOMMEND = `${host}/xhr/rcmd/cart.json`
// export const API_CART_ADD = `${host}/xhr/promotionCart/add.json`
// export const API_CART_UPDATE = `${host}/xhr/promotionCart/update.json`
// export const API_CART_UPDATE_CHECK = `${host}/xhr/promotionCart/updateCheck.json`

// // user
// export const API_USER = `${host}/xhr/user/getDetail.json`
// export const API_USER_LOGIN = `${host}/xhr/u/mailLogin.json`
// export const API_CHECK_LOGIN = `${host}/xhr/u/checkLogin.json`

// // item
// export const API_ITEM = `${host}/xhr/item/detail.json`
// export const API_ITEM_RECOMMEND = `${host}/xhr/rcmd/itemDetail.json`
