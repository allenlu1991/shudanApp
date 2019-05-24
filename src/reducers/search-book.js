import { getSearchRecord, setSearchRecord, clearSearchRecord } from '@utils/cache'

import {
  SEARCH_BOOK,
  GET_SEARCH_RECORD,
  SET_SEARCH_RECORD,
  CLEAR_SEARCH_RECORD,
} from '@constants/search-book'

const INITIAL_STATE = {
  resultsCount: 0,
  results: [],
  searchRecords: [],
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
    case GET_SEARCH_RECORD: {
      let searchRecords = getSearchRecord()
      return {
        ...state,
        searchRecords,
      }
    }
    case SET_SEARCH_RECORD: {
      let searchRecords = setSearchRecord(action.payload.wd)
      return {
        ...state,
        searchRecords,
      }
    }
    case CLEAR_SEARCH_RECORD: {
      let searchRecords = clearSearchRecord()
      return {
        ...state,
        searchRecords,
      }
    }
    default:
      return state
  }

  return {
    ...state,
  }
}
