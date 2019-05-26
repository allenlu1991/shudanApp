import Taro, { Component } from '@tarojs/taro'
import { View, Image,Button } from '@tarojs/components'
import './index.scss'

export default class ReadBar extends Component {
  readCurrent() {
    this.props.onReadCurrent()
  }

  render () {

    return (
      <View className='read-bar'>
        <Button className='read-bar-share' open-type="share">分享书籍</Button>
        <View className='read-bar-read' onClick={this.readCurrent.bind(this)}>立即阅读</View>
      </View>
    )
  }
}
