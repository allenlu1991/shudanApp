import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import rightIcon from '@assets/my/right.png'

export default class Menu extends Component {

  render () {
    return (
      <View className='menu'>
        <View className='menu-container'>
          <View className='menu-container-separator'></View>
          <View className='menu-container-item'>
            <Text className='menu-container-item-text'>免责声明</Text>
            <Image className='menu-container-item-icon' src={rightIcon}></Image>
          </View>
          <View className='menu-container-separator'></View>
          <View className='menu-container-item'>
            <Text className='menu-container-item-text'>权利人保护引导</Text>
            <Image className='menu-container-item-icon' src={rightIcon}></Image>
          </View>
          <View className='menu-container-separator'></View>
          <View className='menu-container-item'>
            <Text className='menu-container-item-text'>用户反馈</Text>
            <Image className='menu-container-item-icon' src={rightIcon}></Image>
          </View>
          <View className='menu-container-separator'></View>
        </View>
      </View>
    )
  }
}
