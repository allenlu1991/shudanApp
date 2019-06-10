import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'

import historyIcon from '@assets/search-book/search-book-history-icon.png'

import * as actions from '@actions/search-book'

@connect(state => state.searchBook, { ...actions })
export default class SearchHistory extends Component {

  componentWillMount() {
    this.props.dispatchGetSearchRecord()
  }

  clearSearchHistory() {
    this.props.dispatchClearSearchRecord()
  }

  searchByWd(wd) {
    Taro.redirectTo({
      url: '/pages/search-book/search-book?wd=' + encodeURIComponent(wd)+ '&source=' + encodeURIComponent('search_history')
    })
  }

  render () {

    return (
      <View className='search-history'>
        {
          this.props.searchRecords.map((item,index)=>{
            return(
              <View taroKey={index} className='search-history-container'>
                <View className='search-history-item' onClick={this.searchByWd.bind(this, item)}>
                  <Image className='search-history-item-icon' src={historyIcon}></Image>
                  <Text className='search-history-item-text'>{item}</Text>
                </View>
                <View className='search-history-separator'></View>
              </View>
            )
          })
        }
        {
          this.props.searchRecords.length > 0 &&
          <View className='search-history-clear' onClick={this.clearSearchHistory.bind(this)}>清空历史记录</View>
        }
        
      </View>
    )
  }
}
