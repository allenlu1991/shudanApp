import {
  SEARCH_BOOK,
  GET_SEARCH_RECORD,
  SET_SEARCH_RECORD,
  CLEAR_SEARCH_RECORD,
} from '@constants/search-book'

import {
  API_SEARCH_BOOK
} from '@constants/api'

import { createAction } from '@utils/redux'

/**
 * 获取搜索结果
 * @param {*} payload
 */
export const dispatchSearchBook = payload => createAction({
  url: API_SEARCH_BOOK,
  type: SEARCH_BOOK,
  payload
})

/**
 * 添加搜索记录
 * @param {*} payload
 */
export const dispatchSetSearchRecord = payload => {
  return {
    type: SET_SEARCH_RECORD,
    payload
  } 
}

/**
 * 获取搜索记录
 * @param {*} payload
 */
export const dispatchGetSearchRecord = payload => {
  return {
    type: GET_SEARCH_RECORD,
    payload
  } 
}

/**
 * 清楚搜索记录
 * @param {*} payload
 */
export const dispatchClearSearchRecord = payload => {
  return {
    type: CLEAR_SEARCH_RECORD,
    payload
  } 
}