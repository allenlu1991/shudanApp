import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.scss'

import {BookLoading} from '@components'

import downloadedIcon from '@assets/components/chapters-selector/downloaded.png'

import { getWindowHeight } from '@utils/style'

export default class ChaptersSelector extends Component {

  state = {
    loading: true,
    scrollViewStyle: {},
  }  

  static defaultProps = {
    data:{
        chaptersCount: 0,
        chapters: []
    }
  }

  chapterClickHandle(contentUrl, contentName, bookName, charptersCount, charpterNum) {
    this.disAppear()
    if(!!this.props.onGetBookContent) {
        this.props.onGetBookContent(this.props.url, charpterNum, this.props.wd) 
        return
    }

    Taro.navigateTo({
      url: '/pages/reader/reader?content_url=' + encodeURIComponent(contentUrl) + '&content_name=' + encodeURIComponent(contentName) + '&chapters_url=' + encodeURIComponent(this.props.url) + '&wd=' + encodeURIComponent(this.props.wd) + '&book_name=' + encodeURIComponent(bookName) + '&chapter_count=' + charptersCount + '&chapter_num=' + charpterNum
    })
  }

  disAppear() {
    this.props.onDisappear()
  }  

  componentWillMount() {
    Taro.showLoading({
      title: '努力加载中'
    })
  }
  componentDidMount() {
    Taro.hideLoading()
    Taro.setNavigationBarTitle({
        title: '目录'
    })
    Taro.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
        animation: {
            duration: 0,
            timingFunc: 'linear'
        }
    })

    let scrollViewHeight = getWindowHeight(false);

    let scrollViewStyle = {
        height: scrollViewHeight + 'px' //这个px是不会被转成rpx的
    }
    this.setState({
        scrollViewStyle
    })
  }

  render () {
    // if(this.state.loading) {
    //     return(
    //         <BookLoading />
    //     )
    // }
    const {data, currentChapterNum} = this.props
    return (
      <View className='chapters-selector'>
        <ScrollView className='chapters-selector-box' scrollY style={this.state.scrollViewStyle} >
            <View className='chapters-selector-box-container'>
                {/* <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text-selected'>第10章 你的身上，有一个凶兆！</Text>
                    <Image className='chapters-selector-box-item-icon' src={downloadedIcon}></Image>
                </View>
                <View className='chapters-selector-box-separator'></View> */}
                {
                    data.chapters.map((item,index)=>{
                        let itemTextStyle = 'chapters-selector-box-item-text'
                        if(currentChapterNum == index + 1) {
                            itemTextStyle = 'chapters-selector-box-item-text-selected'
                        }
                        return(
                            <View taroKey={index}>
                                <View className='chapters-selector-box-item' onClick={this.chapterClickHandle.bind(this, item.chapter_url, item.title, data.bookName, data.chaptersCount, index+1)}>
                                    <Text className={itemTextStyle}>{item.title}</Text>
                                    {/* <Image className='chapters-selector-box-item-icon' src={downloadedIcon}></Image> */}
                                </View>
                                <View className='chapters-selector-box-separator'></View>
                            </View>
                        )
                    })
                }
                
            </View>
        </ScrollView>
        <View className='chapters-selector-mask' style={this.state.scrollViewStyle} onClick={this.disAppear.bind(this)}></View>
      </View>
    )
  }
}
