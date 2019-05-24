import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import UserInfo from './user-info'
import { ReadRecordContent, WeLogin } from '@components'
import Nodata from './no-data'

import './my.scss'


@connect(state => state.readRecord)
class My extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='my'>
        <UserInfo 
          userInfo = {{
            readBookCount: this.props.bookShelfData.length,
          }}
        />
        {
          this.props.bookShelfData.length == 0 &&
          <Nodata />
        }
        {
          this.props.bookShelfData.length > 0 &&
          <ReadRecordContent />
        }
        {/* <WeLogin /> */}
      </View>
    )
  }
}

export default My