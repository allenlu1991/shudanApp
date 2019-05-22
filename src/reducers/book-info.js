import {
  BOOK_INFO,
  OPEN_CHAPTERS,
  CLOSE_CHAPTERS,
  PRE_CHAPTERS,
  NEXT_CHAPTERS,
  CURRENT_CHAPTERS,
} from '@constants/book-info'

let bookInfoAllData = {}

const INITIAL_STATE = {
  bookInfoRes: {},
  openChapters: false,
  bookInfoData: {},
  chaptersData: {},
  currentChapterSliceNum: 1,
  isFirstChapterSlice: true,
  isLastChapterSlice: false,
  chaptersNumPerSlice: 2000,
}

export default function bookInfo(state = INITIAL_STATE, action) {
  switch(action.type) {
    case BOOK_INFO: {
      let bookInfoData = {}
      let chaptersData = {}
      if(action.payload.status == 'success') {
        bookInfoData = {
          ...action.payload.data,
          chapters: action.payload.data.chapters.slice(0,5)
        }
        chaptersData = {
          chapters: action.payload.data.chapters.slice(0,state.chaptersNumPerSlice)
        }

        bookInfoAllData = {
          ...action.payload.data,
        }
      }
      return {
        ...state,
        bookInfoRes: {
          status: action.payload.status
        },
        bookInfoData,
        chaptersData,
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
    case PRE_CHAPTERS: {
      let currentChapterSliceNum = state.currentChapterSliceNum <= 1 ? 1 : state.currentChapterSliceNum - 1
      return {
        ...state,
        currentChapterSliceNum,
        chaptersData: {
          chapters: bookInfoAllData.chapters.slice((currentChapterSliceNum-1)*state.chaptersNumPerSlice, currentChapterSliceNum*state.chaptersNumPerSlice)
        },
        isLastChapterSlice: currentChapterSliceNum >= Math.ceil(bookInfoAllData.chapters.length / state.chaptersNumPerSlice) ? true : false,
        isFirstChapterSlice: currentChapterSliceNum <= 1 ? true : false,
      }
    }
    case NEXT_CHAPTERS: {
      let currentChapterSliceNum = state.currentChapterSliceNum >= Math.ceil(bookInfoAllData.chapters.length / state.chaptersNumPerSlice) ? state.currentChapterSliceNum : state.currentChapterSliceNum + 1
      return {
        ...state,
        currentChapterSliceNum,
        chaptersData: {
          chapters: bookInfoAllData.chapters.slice((currentChapterSliceNum-1)*state.chaptersNumPerSlice, currentChapterSliceNum*state.chaptersNumPerSlice)
        },
        isLastChapterSlice: currentChapterSliceNum >= Math.ceil(bookInfoAllData.chapters.length / state.chaptersNumPerSlice) ? true : false,
        isFirstChapterSlice: currentChapterSliceNum <= 1 ? true : false,
      }
    }
    case CURRENT_CHAPTERS: {
      let currentChapterSliceNum = Math.ceil(action.payload.chapterNum / state.chaptersNumPerSlice)
      return {
        ...state,
        currentChapterSliceNum,
        chaptersData: {
          chapters: bookInfoAllData.chapters.slice((currentChapterSliceNum-1)*state.chaptersNumPerSlice, currentChapterSliceNum*state.chaptersNumPerSlice)
        },
        isLastChapterSlice: currentChapterSliceNum >= Math.ceil(bookInfoAllData.chapters.length / state.chaptersNumPerSlice) ? true : false,
        isFirstChapterSlice: currentChapterSliceNum <= 1 ? true : false,
      }
      
    }
    default:
      return state
  }

  return {
    ...state,
  }
}
