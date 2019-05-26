import {
  AGREEMENT_CONTENT
} from '@constants/content'

import {
  API_AGREEMENT_CONTENT
} from '@constants/api'

import { createAction } from '@utils/redux'

/**
 * 获取协议内容数据
 * @param {*} payload
 */
export const dispatchAgreementContent = payload => createAction({
  url: API_AGREEMENT_CONTENT,
  type: AGREEMENT_CONTENT,
  payload
})