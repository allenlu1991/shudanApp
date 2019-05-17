import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class NoData extends Component {

  render () {

    return (
      <View className='no-data'>
        <View className='no-data-tips'>有没有想看的书</View>

        <Button className='no-data-bttn' open-type="">
          去搜搜看看
        </Button>
      </View>
    )
  }
}
