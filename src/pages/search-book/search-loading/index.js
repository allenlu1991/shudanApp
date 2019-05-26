import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import tipsIcon from '@assets/search-book/tips.png'

export default class SearchLoading extends Component {

  render () {
    let iconStyle, tips, type

    if(this.props.type == 'loading') {
      type='loading'
      iconStyle = 'search-loading-icon'
      tips = '努力加载中...'
    } else {
      type='nodata'
      iconStyle = 'search-loading-nodata-icon'
      tips = '没有搜到这本书哦，换个词试试看呢~'
    }

    return (
      <View className='search-loading'>
        {
          type == 'loading' &&
          <View className={iconStyle}></View>
        }
        {
          type == 'nodata' &&
          <Image src={tipsIcon} className={iconStyle}></Image>
        }
        <Text className='search-loading-text'>{tips}</Text>
      </View>
    )
  }
}
