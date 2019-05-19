import {
  SEARCH_BOOK
} from '@constants/search-book'

const INITIAL_STATE = {
  resultsCount: 0,
  results: []
}

export default function searchBook(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SEARCH_BOOK: {
      return {
        ...state,
        resultsCount: action.payload.resultsCount,
        results: action.payload.results,
      }
    }
    default:
      return state
  }

  return {
    ...state,
  }
}
