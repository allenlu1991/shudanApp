import {
    HOT_WORDS
} from '@constants/search'

import {
    API_HOT_WORDS
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