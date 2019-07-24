import {
  HOT_WORDS,
  APP_CHECK,
} from '@constants/search'

let appVersion;

if (process.env.TARO_ENV === 'weapp') {
   appVersion = '2.0.9'
} else {
   appVersion = '1.0.0'
}

const INITIAL_STATE = {
  hotWords: [],
  isCheck: true,
}

export default function search(state = INITIAL_STATE, action) {
  switch(action.type) {
    case HOT_WORDS: {
      return {
        ...state,
        hotWords: action.payload
      }
    }
    case APP_CHECK: {
      const {status, data} = action.payload
      let isCheck

      if(status == 'success' && data && data.checkVersion == appVersion && !!data.isCheck) {
        isCheck = true
      } else {
        isCheck = false
      }

      return {
        ...state,
        isCheck,
      }
    }

  }

  return {
    ...state,
  }
}
