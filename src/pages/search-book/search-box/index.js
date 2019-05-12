import Taro, { Component } from '@tarojs/taro'
import { View, Input, Text, Image } from '@tarojs/components'
import './index.scss'
import boxIcon from '@assets/search-book/search-book-box-icon.png'
import boxCancle from '@assets/search-book/search-book-box-cancle.png'

export default class SearchBox extends Component {

  render () {

    return (

      <View className='search-box'>
        <View className='search-box-container'>
          <View className='search-box-content'>
              <Image className='search-box-content-icon' src={boxIcon}></Image>
              <Input className='search-box-content-input' type='text' placeholder='请输入书名或作者名' focus='true' placeholderClass='search-box-content-input-placeholder'/>
          </View>

          <Image className='search-box-cancle' src={boxCancle}></Image>
        </View>
      </View>
    )
  }
}
