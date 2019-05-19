import { combineReducers } from 'redux'
import search from './search'
import searchBook from './search-book'
import bookInfo from './book-info'
import reader from './reader'


export default combineReducers({
  search,
  searchBook,
  bookInfo,
  reader
})
