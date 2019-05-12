import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import titleIcon from '@assets/search/title-icon.png'
import refreshIcon from '@assets/search/refresh-icon.png'

export default class HotWords extends Component {

  render () {

    return (
      <View className='hot-words'>
        <View className='hot-words-head'>
          <View className='hot-words-head-title'>
            <Image className='hot-words-head-title-icon' src={titleIcon}></Image>
            <Text className='hot-words-head-title-text'>热门搜索</Text>
          </View>
          <View className='hot-words-head-refresh'>
            <Text className='hot-words-head-refresh-text'>换一换</Text>
            <Image className='hot-words-head-refresh-icon' src={refreshIcon}></Image>
          </View>
        </View>
        <View className='hot-words-content'>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-firstnum'>1</View>
            <View className='hot-words-content-item-text'>最强道士在都市</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-secondnum'>2</View>
            <View className='hot-words-content-item-text'>重生之都市仙尊</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-thirdnum'>3</View>
            <View className='hot-words-content-item-text'>校花的贴身高手</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-othernum'>4</View>
            <View className='hot-words-content-item-text'>超级兵王</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-othernum'>5</View>
            <View className='hot-words-content-item-text'>重生</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-othernum'>6</View>
            <View className='hot-words-content-item-text'>算死命</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-othernum'>7</View>
            <View className='hot-words-content-item-text'>系统</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-othernum'>8</View>
            <View className='hot-words-content-item-text'>全职房东</View>
          </View>
        </View>
      </View>
    )
  }
}
