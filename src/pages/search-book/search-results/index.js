import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { getWindowHeight } from '@utils/style'

import './index.scss'

let systemInfo = Taro.getSystemInfoSync();
let ratio = systemInfo.windowWidth / 750;

let searchBoxHeight = 106;

let scrollViewHeight = getWindowHeight(false) - searchBoxHeight * ratio;

let scrollViewStyle = {
  height: scrollViewHeight + 'px' //这个px是不会被转成rpx的
}

export default class SearchResults extends Component {

  render () {

    return (
      <ScrollView className='search-results-scrollview' scrollY style={scrollViewStyle}>
        <View className='search-results'>
          <View className='search-results-item'>
            <Text className='search-results-item-title'>仙帝归来最新章节,仙帝归来无弹窗全文阅读-顶点小说</Text>
            <Text className='search-results-item-abstract'>顶点小说提供仙帝归来最新章节,作者:修果,仙帝归来最新章节免费阅读,努力打造最好的仙帝归来无弹广…</Text>
            <Text className='search-results-item-site'>m.2wxs.com</Text>
          </View>
          <View className='search-results-separator'></View>
          <View className='search-results-item'>
            <Text className='search-results-item-title'>仙帝归来最新章节,仙帝归来无弹窗全文阅读-顶点小说</Text>
            <Text className='search-results-item-abstract'>顶点小说提供仙帝归来最新章节,作者:修果,仙帝归来最新章节免费阅读,努力打造最好的仙帝归来无弹广…</Text>
            <Text className='search-results-item-site'>m.2wxs.com</Text>
          </View>
          <View className='search-results-separator'></View>
          <View className='search-results-item'>
            <Text className='search-results-item-title'>仙帝归来最新章节,仙帝归来无弹窗全文阅读-顶点小说</Text>
            <Text className='search-results-item-abstract'>顶点小说提供仙帝归来最新章节,作者:修果,仙帝归来最新章节免费阅读,努力打造最好的仙帝归来无弹广…</Text>
            <Text className='search-results-item-site'>m.2wxs.com</Text>
          </View>
          <View className='search-results-separator'></View>
          <View className='search-results-item'>
            <Text className='search-results-item-title'>仙帝归来最新章节,仙帝归来无弹窗全文阅读-顶点小说</Text>
            <Text className='search-results-item-abstract'>顶点小说提供仙帝归来最新章节,作者:修果,仙帝归来最新章节免费阅读,努力打造最好的仙帝归来无弹广…</Text>
            <Text className='search-results-item-site'>m.2wxs.com</Text>
          </View>
          <View className='search-results-separator'></View>
          <View className='search-results-item'>
            <Text className='search-results-item-title'>仙帝归来最新章节,仙帝归来无弹窗全文阅读-顶点小说</Text>
            <Text className='search-results-item-abstract'>顶点小说提供仙帝归来最新章节,作者:修果,仙帝归来最新章节免费阅读,努力打造最好的仙帝归来无弹广…</Text>
            <Text className='search-results-item-site'>m.2wxs.com</Text>
          </View>
          <View className='search-results-separator'></View>
          <View className='search-results-item'>
            <Text className='search-results-item-title'>仙帝归来最新章节,仙帝归来无弹窗全文阅读-顶点小说</Text>
            <Text className='search-results-item-abstract'>顶点小说提供仙帝归来最新章节,作者:修果,仙帝归来最新章节免费阅读,努力打造最好的仙帝归来无弹广…</Text>
            <Text className='search-results-item-site'>m.2wxs.com</Text>
          </View>
          <View className='search-results-separator'></View>
          <View className='search-results-item'>
            <Text className='search-results-item-title'>仙帝归来最新章节,仙帝归来无弹窗全文阅读-顶点小说</Text>
            <Text className='search-results-item-abstract'>顶点小说提供仙帝归来最新章节,作者:修果,仙帝归来最新章节免费阅读,努力打造最好的仙帝归来无弹广…</Text>
            <Text className='search-results-item-site'>m.2wxs.com</Text>
          </View>
          <View className='search-results-separator'></View>
        </View>
      </ScrollView>
    )
  }
}
