import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import fingerIcon from '@assets/reader/finger.png'

export default class UserGuide extends Component {
  finishGuide() {
    this.props.onFinishGuide()
  }

  render () {
    return (
      <View className='user-guide' onClick={this.finishGuide.bind(this)}>
        <View className='user-guide-container'>
          <View className='user-guide-container-tips'>
            <Text className='user-guide-container-tips-firstline'>点击界面</Text>
            <Text className='user-guide-container-tips-secondeline'>显示菜单</Text>
          </View>
          <Image className='user-guide-container-icon' src={fingerIcon}></Image>
        </View>
      </View>
    )
  }
}
