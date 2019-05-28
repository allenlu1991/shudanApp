import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class NoData extends Component {
  doSearch() {
    Taro.switchTab({
      url: '/pages/search/search'
    })
  }

  render () {

    return (
      <View className='no-data'>
        <View className='no-data-tips'>有没有想看的书</View>

        <Button className='no-data-bttn' onClick={this.doSearch.bind(this)}>
          去看看
        </Button>
      </View>
    )
  }
}
