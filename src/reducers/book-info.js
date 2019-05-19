import {
  BOOK_INFO,
  OPEN_CHAPTERS,
  CLOSE_CHAPTERS
} from '@constants/book-info'

const INITIAL_STATE = {
  bookInfoRes: {},
  openChapters: false,
}

export default function bookInfo(state = INITIAL_STATE, action) {
  switch(action.type) {
    case BOOK_INFO: {
      return {
        ...state,
        bookInfoRes: action.payload,
      }
    }
    case OPEN_CHAPTERS: {
      return {
        ...state,
        openChapters: true,
      }
    }
    case CLOSE_CHAPTERS: {
      return {
        ...state,
        openChapters: false,
      }
    }
    default:
      return state
  }

  return {
    ...state,
  }
}
