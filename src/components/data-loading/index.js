import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
export default class DataLoading extends Component {

  render () {

    return (
      <View className='data-loading'>
        <View className='data-loading-icon'></View>
        <Text className='data-loading-text'>努力加载中...</Text>
      </View>
    )
  }
}
