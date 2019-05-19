import {
  SEARCH_BOOK
} from '@constants/search-book'

import {
  API_SEARCH_BOOK
} from '@constants/api'

import { createAction } from '@utils/redux'

/**
 * 热门搜索词数据
 * @param {*} payload
 */
export const dispatchSearchBook = payload => createAction({
  url: API_SEARCH_BOOK,
  type: SEARCH_BOOK,
  payload
})