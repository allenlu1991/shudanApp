import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import titleIcon from '@assets/search/title-icon.png'

import { ReadRecordContent } from '@components'

export default class ReadRecord extends Component {

  render () {

    return (
      <View className='read-record'>
        <View className='read-record-head'>
          <Image className='read-record-head-icon' src={titleIcon}></Image>
          <Text className='read-record-head-title'>阅读记录</Text>
        </View>
 
        <ReadRecordContent />
      </View>
    )
  }
}
