import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import bookCover from '@assets/search/book.jpg'

export default class BookMenu extends Component {

  render () {
    return (
      <View className='book-menu'>
      菜单
      </View>
    )
  }
}
