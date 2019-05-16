import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.scss'

import downloadedIcon from '@assets/components/chapters-selector/downloaded.png'

export default class BookLoading extends Component {

  render () {
    return (
      <View  className='book-loading-mask'>
        <View className='book-loading'>
          <View className="loader">
            <View className="loader-inner"><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View></View>
            <View className="loader-inner box box-1"><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View></View>
            <View className="loader-inner box box-2"><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View></View>
            <View className="loader-inner box box-3"><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View></View>
            <View className="loader-inner box box-4"><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View></View>
            <View className="loader-inner box box-5"><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View></View>
            <View className="loader-inner box box-6"><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View></View>
            <View className="loader-inner"><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View><View className='book-loading-line'></View></View>
          </View>
          
          <Text className='book-loading-text'>努力加载中</Text>
        </View>
      </View>
    )
  }
}
