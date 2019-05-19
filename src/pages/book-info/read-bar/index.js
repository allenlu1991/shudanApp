import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import logoIcon from '@assets/search/logo-icon.png'
import logoText from '@assets/search/logo-text.png'

export default class ReadBar extends Component {
  readCurrent() {
    this.props.onReadCurrent()
  }

  render () {

    return (
      <View className='read-bar'>
        <View className='read-bar-share'>分享书籍</View>
        <View className='read-bar-read' onClick={this.readCurrent.bind(this)}>优化阅读</View>
      </View>
    )
  }
}
