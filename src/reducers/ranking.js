import {
  RANKING_CATE,
  RANKING_CATE_LIST,
  RANKING_CATE_LIST_MORE,
} from '@constants/ranking'

let rankingListData = {}

const INITIAL_STATE = {
  rankingCate: [],
  rankingList: {},
}

export default function ranking(state = INITIAL_STATE, action) {
  switch(action.type) {
    case RANKING_CATE: {
      if(action.payload.status == 'success') {
        return {
          ...state,
          rankingCate: action.payload.data
        }
      }

      return {
        ...state,
      }
      
    }
    case RANKING_CATE_LIST: {
      if(action.payload.status == 'success') {
        rankingListData = {
          ...rankingListData,
          [action.reqPayload.f]: {
            [action.reqPayload.s]: action.payload.data,
          }
        }
      }
      let rankingList = {
        [action.reqPayload.f]: rankingListData[action.reqPayload.f]
      }

      let res = {
        ...state,
        rankingList,
      }

      return res
    }
    case RANKING_CATE_LIST_MORE: {
      if(action.payload.status == 'success' && rankingListData[action.reqPayload.f] && rankingListData[action.reqPayload.f][action.reqPayload.s]) {
        let currentPageNum = parseInt(rankingListData[action.reqPayload.f][action.reqPayload.s]['pageNum'])
        let currentRecords = rankingListData[action.reqPayload.f][action.reqPayload.s]['records']
        
        if(currentPageNum < action.payload.data.pageNum) {
          rankingListData = {
            ...rankingListData,
            [action.reqPayload.f]: {
              [action.reqPayload.s]: {
                ...action.payload.data,
                records: currentRecords.concat(action.payload.data.records)
              },
            }
          }
        }
      }

      return {
        ...state,
        rankingList: {
          [action.reqPayload.f]: rankingListData[action.reqPayload.f]
        }
      }
    }
    default:
      return state
  }

  return {
    ...state,
  }
}
