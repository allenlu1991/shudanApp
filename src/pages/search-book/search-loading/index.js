import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
export default class SearchLoading extends Component {

  render () {

    return (
      <View className='search-loading'>
        <View className='search-loading-icon'></View>
        <Text className='search-loading-text'>努力加载中...</Text>
      </View>
    )
  }
}
