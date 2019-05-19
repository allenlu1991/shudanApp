import {
  BOOK_INFO,
  OPEN_CHAPTERS,
  CLOSE_CHAPTERS
} from '@constants/book-info'

import {
  API_BOOK_INFO
} from '@constants/api'

import { createAction } from '@utils/redux'

/**
 * 热门搜索词数据
 * @param {*} payload
 */
export const dispatchBookInfo = payload => createAction({
  url: API_BOOK_INFO,
  type: BOOK_INFO,
  payload
})

/**
 * 打开目录
 * @param {*} payload
 */
export const dispatchOpenChapters = payload => {
  return ({
    type: OPEN_CHAPTERS,
    payload
  })
}

/**
 * 打开目录
 * @param {*} payload
 */
export const dispatchCloseChapters = payload => {
  return({
    type: CLOSE_CHAPTERS,
    payload
  })
}