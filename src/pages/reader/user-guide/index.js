import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import bookCover from '@assets/search/book.jpg'

export default class UserGuide extends Component {

  render () {
    return (
      <View className='user-guide'>
      引导
      </View>
    )
  }
}
