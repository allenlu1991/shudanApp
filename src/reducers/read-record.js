import { setBookRecordCache, getBookRecordCache } from '@utils/cache'

import {
  GET_ALL_RECORD,
  UPDATE_ONE_RECORD,
} from '@constants/read-record'

const INITIAL_STATE = {
  bookShelfData: []
}

export default function readRecord(state = INITIAL_STATE, action) {
  switch(action.type) {
    case UPDATE_ONE_RECORD: {
      let bookShelfData = setBookRecordCache(action.payload)
      return {
        ...state,
        bookShelfData,
      }
    }
    case GET_ALL_RECORD: {
      let bookShelfData = getBookRecordCache()
      return {
        ...state,
        bookShelfData,
      }
    }
    // case HOME_SEARCH_COUNT: {
    //   return {
    //     ...state,
    //     searchCount: action.payload.count
    //   }
    // }
    // case HOME_PIN: {
    //   // 每3个分成一组
    //   const pin = []
    //   action.payload.forEach((item, index) => {
    //     const groupIndex = parseInt(index / 3)
    //     if (!pin[groupIndex]) {
    //       pin[groupIndex] = []
    //     }
    //     pin[groupIndex].push(item)
    //   })
    //   return { ...state, pin }
    // }
    // case HOME_RECOMMEND: {
    //   return {
    //     ...state,
    //     recommend: state.recommend.concat(action.payload.rcmdItemList)
    //   }
    // }
    // default:
    //   return state
  }

  return {
    ...state,
  }
}
