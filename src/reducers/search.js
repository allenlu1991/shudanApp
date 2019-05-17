import {
  HOT_WORDS
} from '@constants/search'
import { start } from 'repl';

const INITIAL_STATE = {
  hotWords: []
}

export default function search(state = INITIAL_STATE, action) {
  switch(action.type) {
    case HOT_WORDS: {
      return {
        ...state,
        hotWords: action.payload
      }
    }
    // case HOME_INFO: {
    //   return {
    //     ...state,
    //     homeInfo: action.payload
    //   }
    // }
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
