import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import rightIcon from '@assets/book-info/right.png'

export default class BookChapters extends Component {

  render () {

    return (
      <View className='book-chapters'>
        <View className='book-chapters-head'>
          <Text className='book-chapters-head-title'>查看目录</Text>
          <View className='book-chapters-head-counts'>
            <Text className='book-chapters-head-counts-text'>共1272章</Text>
            <Image className='book-chapters-head-counts-icon' src={rightIcon}></Image>
          </View>
        </View>
        <View className='book-chapters-separator'></View>
        <View className='book-chapters-content'>
          <View className='book-chapters-content-item'>
            <Text className='book-chapters-content-item-text'>第1272章 斗帝破空</Text>
          </View>
          <View className='book-chapters-separator'></View>
          <View className='book-chapters-content-item'>
            <Text className='book-chapters-content-item-text'>第1271章 斗帝破空</Text>
          </View>
          <View className='book-chapters-separator'></View>
          <View className='book-chapters-content-item'>
            <Text className='book-chapters-content-item-text'>第1270章 斗帝破空</Text>
          </View>
          <View className='book-chapters-separator'></View>
          <View className='book-chapters-content-item'>
            <Text className='book-chapters-content-item-text'>第1269章 斗帝破空</Text>
          </View>
          <View className='book-chapters-separator'></View>
          <View className='book-chapters-content-item'>
            <Text className='book-chapters-content-item-text'>第1268章 斗帝破空</Text>
          </View>
          <View className='book-chapters-separator'></View>
          <View className='book-chapters-content-item'>
            <Text className='book-chapters-content-item-text'>第1267章 斗帝破空</Text>
          </View>
          <View className='book-chapters-separator'></View>
        </View>
      </View>
    )
  }
}
