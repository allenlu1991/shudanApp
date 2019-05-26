import {
  AGREEMENT_CONTENT
} from '@constants/content'

const INITIAL_STATE = {
  content: {}
}

export default function content(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AGREEMENT_CONTENT: {
      return {
        ...state,
        content: action.payload,
      }
    }
    default:
      return state
  }

  return {
    ...state,
  }
}
