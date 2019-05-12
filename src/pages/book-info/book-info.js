import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getWindowHeight } from '@utils/style'

import BookDesc from './book-desc'
import BookChapters from './book-chapters'
import ReadBar from './read-bar'

import './book-info.scss'

let systemInfo = Taro.getSystemInfoSync();
let ratio = systemInfo.windowWidth / 750;

let readBarHeight = 108;

let scrollViewHeight = getWindowHeight(false) - readBarHeight * ratio;

let scrollViewStyle = {
  height: scrollViewHeight + 'px' //这个px是不会被转成rpx的
}

class BookInfo extends Component {

  config = {
    navigationBarTitleText: ''
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='book-info'>
        <ScrollView scrollY style={scrollViewStyle}>
          <BookDesc />
          <View className='book-info-separator'></View>
          <BookChapters />
        </ScrollView>
        
        {/* <ChaptersSelector /> */}
        <ReadBar />
      </View>
    )
  }
}

export default BookInfo