import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import { getWindowHeight } from '@utils/style'

import './index.scss'
import formSubmitHandle from '@utils/formidHandle'

export default class SearchResults extends Component {
  static defaultProps = {
    list: []
  }

  state = {
    scrollViewStyle: {}
  }

  componentWillMount() {
    let systemInfo = Taro.getSystemInfoSync();
    let ratio = systemInfo.windowWidth / 750;

    let searchBoxHeight = 106;

    let scrollViewHeight = getWindowHeight(false) - searchBoxHeight * ratio;

    let scrollViewStyle = {
      height: scrollViewHeight + 'px' //这个px是不会被转成rpx的
    }

    this.scrollViewStyle = scrollViewStyle
  }

  itemClickHandle(url) {
    Taro.navigateTo({
      url: '/pages/book-info/book-info?url=' + encodeURIComponent(url) + '&wd=' + encodeURIComponent(this.props.wd)
    })
  }

  render () {
    const { list } = this.props
    
    return (
      <ScrollView className='search-results-scrollview' scrollY style={this.scrollViewStyle}>
        {/* <Form report-submit onSubmit={(e)=>formSubmitHandle(e)}> */}
        <View className='search-results'>
        {/* <View className='search-results'> */}
          {
          list.map((item,index) => {
            return(
              <View taroKey={index}>
                <View className='search-results-item' onClick={this.itemClickHandle.bind(this,item.url)}>
                  <Text className='search-results-item-title'>{item.title}</Text>
                  <Text className='search-results-item-abstract'>{item.abstract}</Text>
                  <Text className='search-results-item-site'>{item.domainName}</Text>
                </View>
                <View className='search-results-separator'></View>
              </View>
            )
          })
          }
        {/* </View> */}
        </View>
        {/* </Form> */}
      </ScrollView>
    )
  }
}
