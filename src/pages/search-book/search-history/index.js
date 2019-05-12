import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

import historyIcon from '@assets/search-book/search-book-history-icon.png'

export default class SearchHistory extends Component {

  render () {

    return (
      <View className='search-history'>
        <View className='search-history-item'>
          <Image className='search-history-item-icon' src={historyIcon}></Image>
          <Text className='search-history-item-text'>斗破苍穹</Text>
        </View>
        <View className='search-history-separator'></View>
        <View className='search-history-item'>
          <Image className='search-history-item-icon' src={historyIcon}></Image>
          <Text className='search-history-item-text'>斗破苍穹</Text>
        </View>
        <View className='search-history-separator'></View>
        <View className='search-history-clear'>清空历史记录</View>
      </View>
    )
  }
}
