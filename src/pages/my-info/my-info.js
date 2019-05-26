import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import MyUserInfo from './my-user-info'
import Menu from './menu'

import './my-info.scss'


class MyInfo extends Component {
  state = {
    userInfo: {}
  }

  config = {
    navigationBarTitleText: '个人主页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    Taro.getUserInfo().then((res)=>{
      const userInfo = res.userInfo
      this.setState({
        userInfo,
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='my-info'>
        <MyUserInfo 
          userInfo = {this.state.userInfo}
        />
        <Menu />
      </View>
    )
  }
}

export default MyInfo