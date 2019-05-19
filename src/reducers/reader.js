import {
  READ_CONTENT
} from '@constants/reader'

const INITIAL_STATE = {
  bookContent: {}
}

export default function reader(state = INITIAL_STATE, action) {
  switch(action.type) {
    case READ_CONTENT: {
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
