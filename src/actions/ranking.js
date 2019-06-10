import {
  RANKING_CATE,
  RANKING_CATE_LIST,
  RANKING_CATE_LIST_MORE,
} from '@constants/ranking'

import {
  API_RANKING
} from '@constants/api'

import { createAction } from '@utils/redux'

/**
 * 获取分类
 * @param {*} payload
 */
export const dispatchRinkingCate = payload => createAction({
  url: API_RANKING,
  type: RANKING_CATE,
  payload
})

/**
 * 获取分类列表
 * @param {*} payload
 */
export const dispatchRinkingList = payload => createAction({
  url: API_RANKING,
  type: RANKING_CATE_LIST,
  payload
})

/**
 * 加载分类列表分页
 * @param {*} payload
 */
export const dispatchRinkingListMore = payload => createAction({
  url: API_RANKING,
  type: RANKING_CATE_LIST_MORE,
  payload
})

