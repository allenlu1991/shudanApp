import {
  GET_ALL_RECORD,
  INSERT_ONE_RECORD,
  UPDATE_ONE_RECORD,
} from '@constants/read-record'
import {
    API_HOT_WORDS
} from '@constants/api'

import { createAction } from '@utils/redux'

/**
 * 热门搜索词数据
 * @param {*} payload
 */
// export const dispatchHotWords = payload => createAction({
//   url: API_HOT_WORDS,
//   type: HOT_WORDS,
//   payload
// })

/**
 * 插入一条记录
 * @param {*} payload
 */
export const dispatchInsertOneRecord = payload => {
  return({
    type: INSERT_ONE_RECORD,
    payload
  })
}