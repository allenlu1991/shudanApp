import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import { connect } from '@tarojs/redux'

import { getBookRecord, setBookRecord } from '@utils/cache'

import bookCover from '@assets/search/book.jpg'
import * as actions from '@actions/read-record'

@connect(state => state.readRecord, { ...actions })
export default class ReadRecordContent extends Component {

  render () {
    return (
      <View className='read-record-content'>
        <View className='read-record-content-item'>
          <Image className='read-record-content-item-cover' src={bookCover}></Image>
          <View className='read-record-content-item-info'>
            <Text className='read-record-content-item-info-name'>斗破苍穹</Text>
            <Text className='read-record-content-item-info-lastread'>读至第100章/共998章</Text>
            <Text className='read-record-content-item-info-lastreadtime'>上次阅读时间：05-23 11:33</Text>
          </View>
        </View>
        <View className='read-record-content-item-separator'></View>
        <View className='read-record-content-item'>
          <Image className='read-record-content-item-cover' src={bookCover}></Image>
          <View className='read-record-content-item-info'>
            <Text className='read-record-content-item-info-name'>斗破苍穹</Text>
            <Text className='read-record-content-item-info-lastread'>读至第100章/共998章</Text>
            <Text className='read-record-content-item-info-lastreadtime'>上次阅读时间：05-23 11:33</Text>
          </View>
        </View>
        <View className='read-record-content-item-separator'></View>
        <View className='read-record-content-item'>
          <Image className='read-record-content-item-cover' src={bookCover}></Image>
          <View className='read-record-content-item-info'>
            <Text className='read-record-content-item-info-name'>斗破苍穹</Text>
            <Text className='read-record-content-item-info-lastread'>读至第100章/共998章</Text>
            <Text className='read-record-content-item-info-lastreadtime'>上次阅读时间：05-23 11:33</Text>
          </View>
        </View>
        <View className='read-record-content-item-separator'></View>
      </View>
    )
  }
}
