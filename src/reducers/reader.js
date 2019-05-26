import { setContentCache } from '@utils/cache'
import md5 from 'md5'

import {
  READ_CONTENT
} from '@constants/reader'

const INITIAL_STATE = {
  bookContent: {}
}

export default function reader(state = INITIAL_STATE, action) {
  switch(action.type) {
    case READ_CONTENT: {

      if(action.payload && action.payload.status == 'success') {
        let contentKey = md5(action.reqPayload.url)
        //缓存模块会维护更新策略
        setContentCache(contentKey, action.payload)
      }

      return {
        ...state,
        bookContent: action.payload,
      }
    }
    default:
      return state
  }

  return {
    ...state,
  }
}
