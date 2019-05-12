import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import BookContent from './book-content'
import BookMenu from './book-menu'
import UserGuide from './user-guide'

import './reader.scss'


class Read extends Component {

  config = {
    navigationBarTitleText: '小说名',
    navigationBarBackgroundColor: '#F2EEEA',
    navigationBarTextStyle: 'black'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='read'>
        <BookContent />
        {/* <BookMenu />
        <UserGuide /> */}
        {/* <ChaptersSelector /> */}
      </View>
    )
  }
}

export default Read