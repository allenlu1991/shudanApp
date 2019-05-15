import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import bookCover from '@assets/search/book.jpg'

export default class BookMenu extends Component {

  render () {
    return (
      <View className='book-menu'>
        <View className='book-menu-sidebar'>
          <View className='book-menu-sidebar-share'>分享书籍</View>
          <View className='book-menu-sidebar-site'>查看源址</View>
          <View className='book-menu-sidebar-home'>返回首页</View>
        </View>

        <View className='book-menu-bar'>
          <View className='book-menu-bar-title'>第10章 你的身上，有一个凶兆！</View>
          <View className='book-menu-bar-chapters'>
            <View className='book-menu-bar-chapters-pre'>上一章</View>
            <View className='book-menu-bar-chapters-link'>目录</View>
            <View className='book-menu-bar-chapters-next'>下一章</View>
          </View>
          <View className='book-menu-bar-style'>
            <View className='book-menu-bar-style-font'>
              <View className='book-menu-bar-style-font-small'>Aa-</View>
              <View className='book-menu-bar-style-font-large'>Aa+</View>
            </View>
            <View className='book-menu-bar-style-mode'>
              <View className='book-menu-bar-style-mode-normal'></View>
              <View className='book-menu-bar-style-mode-night'></View>
              <View className='book-menu-bar-style-mode-eyecare'></View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
