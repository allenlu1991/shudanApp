import { setBookInfoCache } from '@utils/cache'
import md5 from 'md5'

import {
  BOOK_INFO,
  OPEN_CHAPTERS,
  CLOSE_CHAPTERS,
  PRE_CHAPTERS,
  NEXT_CHAPTERS,
  CURRENT_CHAPTERS,
  GET_ONE_CHAPTER,
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
  chaptersNumPerSlice: 1000,
  oneChapterInfo: {},
}

export default function bookInfo(state = INITIAL_STATE, action) {
  switch(action.type) {
    case BOOK_INFO: {
      let bookInfoData = {}
      let chaptersData = {}
      if(action.payload.status == 'success') {
        bookInfoData = {
          ...action.payload.data,
          ...action.reqPayload,
          chapters: action.payload.data.chapters.slice(0,5)
        }
        chaptersData = {
          ...action.reqPayload,
          chapters: action.payload.data.chapters.slice(0,state.chaptersNumPerSlice)
        }

        bookInfoAllData = {
          ...action.payload.data,
          ...action.reqPayload,
        }

        let bookKey = md5(action.reqPayload.url)
        //缓存模块会维护更新策略
        setBookInfoCache(bookKey, action.payload)
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
    case GET_ONE_CHAPTER: {
      let oneChapterInfo
      if(action.payload.chapterNum <= state.bookInfoData.chaptersCount && action.payload.chapterNum >= 1) {
        oneChapterInfo = bookInfoAllData.chapters[action.payload.chapterNum - 1]
      } else {
        oneChapterInfo = {}
      }

      return {
        ...state,
        oneChapterInfo,
      }
    }
    default:
      return state
  }

  return {
    ...state,
  }
}
