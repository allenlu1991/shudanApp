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

  state = {
    hasUserInfo: true,
    userInfo: {}
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillMount() {
    Taro.getUserInfo().then((res)=>{
      const userInfo = res.userInfo
      this.setState({
        userInfo,
        hasUserInfo: true,
      })
    }).catch((err)=>{
      this.setState({
        hasUserInfo: false,
      })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getUserInfo(e) {
    let userInfo = e.target.userInfo
    if(!!userInfo) {
      this.setState({
        hasUserInfo: true,
        userInfo,
      })
    }
  }

  render () {
    return (
      <View className='my'>
        {
        this.state.hasUserInfo &&
        <UserInfo 
          userInfo = {{
            ...this.state.userInfo,
            readBookCount: this.props.bookShelfData.length,
          }}
        />
        }
        {
          this.props.bookShelfData.length == 0 && this.state.hasUserInfo &&
          <Nodata />
        }
        {
          this.props.bookShelfData.length > 0 && this.state.hasUserInfo &&
          <ReadRecordContent />
        }
        {
          !this.state.hasUserInfo &&
          <WeLogin
          onGetUserInfo={this.getUserInfo.bind(this)}
          />
        }
      </View>
    )
  }
}

export default My