import {
  BOOK_INFO,
  OPEN_CHAPTERS,
  CLOSE_CHAPTERS,
  PRE_CHAPTERS,
  NEXT_CHAPTERS,
  CURRENT_CHAPTERS,
  GET_ONE_CHAPTER,
} from '@constants/book-info'

import {
  API_BOOK_INFO
} from '@constants/api'

import { createAction } from '@utils/redux'

/**
 * 书籍内容数据
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
 * 关闭目录
 * @param {*} payload
 */
export const dispatchCloseChapters = payload => {
  return({
    type: CLOSE_CHAPTERS,
    payload
  })
}

/**
 * 获取下一部分目录
 * @param {*} payload
 */
export const dispatchNextChapters = payload => {
  return({
    type: NEXT_CHAPTERS,
    payload
  })
}

/**
 * 获取上一部分目录
 * @param {*} payload
 */
export const dispatchPreChapters = payload => {
  return({
    type: PRE_CHAPTERS,
    payload
  })
}

/**
 * 获取当前章节所在目录
 * @param {*} payload
 */
export const dispatchCurrentChapters = payload => {
  return({
    type: CURRENT_CHAPTERS,
    payload
  })
}

/**
 * 获取当前某一个章节信息
 * @param {*} payload
 */
export const dispatchGetOneChapter = payload => {
  return({
    type: GET_ONE_CHAPTER,
    payload
  })
}