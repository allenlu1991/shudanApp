import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import searchBoxIcon from '@assets/search/search-box-icon.png'

export default class SearchBox extends Component {

  render () {
    return (
      <View className='search-box'>
        <Text className='search-box-text'>输入书名或作者</Text>
        <Image className='search-box-icon' src={searchBoxIcon}></Image>
      </View>
    )
  }
}
