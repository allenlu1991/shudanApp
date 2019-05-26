import {
  READ_CONTENT
} from '@constants/reader'

import {
  API_READ_CONTENT
} from '@constants/api'

import { createAction } from '@utils/redux'

/**
 * 获取章节内容数据
 * @param {*} payload
 */
export const dispatchBookContent = payload => createAction({
  url: API_READ_CONTENT,
  type: READ_CONTENT,
  payload
})