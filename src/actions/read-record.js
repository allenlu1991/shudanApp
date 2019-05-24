import {
  GET_ALL_RECORD,
  UPDATE_ONE_RECORD,
} from '@constants/read-record'

// import {
//     API_HOT_WORDS
// } from '@constants/api'

// import { createAction } from '@utils/redux'

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
export const dispatchUpdateOneRecord = payload => {
  return({
    type: UPDATE_ONE_RECORD,
    payload
  })
}

export const dispatchGetAllRecord = payload => {
  return({
    type: GET_ALL_RECORD,
    payload
  })
}