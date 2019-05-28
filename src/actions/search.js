import {
    HOT_WORDS,
    APP_CHECK,
} from '@constants/search'

import {
    API_HOT_WORDS,
    API_APP_CHECK,
} from '@constants/api'

import { createAction } from '@utils/redux'

/**
 * 热门搜索词数据
 * @param {*} payload
 */
export const dispatchHotWords = payload => createAction({
  url: API_HOT_WORDS,
  type: HOT_WORDS,
  payload
})

/**
 * app是否审查中
 * @param {*} payload
 */
export const dispatchAppCheck = payload => createAction({
  url: API_APP_CHECK,
  type: APP_CHECK,
  payload
})