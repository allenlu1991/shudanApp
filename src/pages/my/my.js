import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import UserInfo from './user-info'
import { ReadRecordContent } from '@components'

import './my.scss'


class My extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='my'>
        <UserInfo />
        <ReadRecordContent />
        {/* <WeLogin /> */}
      </View>
    )
  }
}

export default My