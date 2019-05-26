import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'

import rightIcon from '@assets/my/right.png'

export default class Menu extends Component {
  goToContent(name) {
    Taro.navigateTo({
      url: '/pages/content/content?name=' + name
    })
  }

  render () {
    return (
      <View className='menu'>
        <View className='menu-container'>
          <View className='menu-container-separator'></View>
          <View className='menu-container-item' onClick={this.goToContent.bind(this, 'agreement')}>
            <Text className='menu-container-item-text'>服务协议</Text>
            <Image className='menu-container-item-icon' src={rightIcon}></Image>
          </View>
          <View className='menu-container-separator'></View>
          <View className='menu-container-item' onClick={this.goToContent.bind(this, 'protection')}>
            <Text className='menu-container-item-text'>权利人保护引导</Text>
            <Image className='menu-container-item-icon' src={rightIcon}></Image>
          </View>
          <View className='menu-container-separator'></View>
          <Button className='menu-container-item' open-type='feedback'>
            <Text className='menu-container-item-text'>用户反馈</Text>
            <Image className='menu-container-item-icon' src={rightIcon}></Image>
          </Button>
          <View className='menu-container-separator'></View>
        </View>
      </View>
    )
  }
}
