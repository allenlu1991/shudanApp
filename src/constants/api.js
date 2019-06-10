/**
 * NOTE HOST 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
let devMode = false
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

//agreement content
export const API_AGREEMENT_CONTENT = `${host}/bookapi/v2/agreement`

//user
export const API_USER = `${host}/bookapi/v2/user`

//formid
export const API_FORMID = `${host}/bookapi/v2/formids`

//ischeck
export const API_APP_CHECK = `${host}/bookapi/apps`

//ranking
export const API_RANKING = `${host}/bookapi/v2/ranking`