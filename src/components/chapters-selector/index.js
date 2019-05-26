import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.scss'

import { connect } from '@tarojs/redux'
import { getContentCache } from '@utils/cache'
import md5 from 'md5'

import {BookLoading, DataLoading} from '@components'

import downloadedIcon from '@assets/components/chapters-selector/downloaded.png'

import { getWindowHeight } from '@utils/style'

import * as actions from '@actions/book-info'

let systemInfo = Taro.getSystemInfoSync();
let ratio = systemInfo.windowWidth / 750;

@connect(state => state.bookInfo, { ...actions })
export default class ChaptersSelector extends Component {

  state = {
    loading: true,
    scrollViewStyle: {},
    scrollPos: 0,
    miniNum: 0.0001,
    scrollIntoView: '',
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
        this.props.onGetBookContent(this.props.url, charpterNum, this.props.wd, {})
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

    let chapterNum = !!this.props.currentChapterNum ? this.props.currentChapterNum : 1
    this.props.dispatchCurrentChapters({
      chapterNum,
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

    let chapterNum = !!this.props.currentChapterNum ? this.props.currentChapterNum : 1
    
    chapterNum = chapterNum % this.props.chaptersNumPerSlice

    setTimeout(() => {
      this.setState({
        scrollIntoView: 'item' + chapterNum,
      })
    }, 0);

  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)

  }

  getNextChapters() {

    this.props.dispatchNextChapters()

    !this.props.isFirstChapterSlice &&
    this.setState({
      scrollPos: this.state.miniNum + ratio*90,
      miniNum: -this.state.miniNum
    })

  }

  getPreChapters() {

    this.props.dispatchPreChapters()

    !this.props.isFirstChapterSlice &&
    this.setState({
      scrollPos: this.state.miniNum + ratio*90,
      miniNum: -this.state.miniNum
    })

  }

  isCached(url) {
    let cacheArr = getContentCache()
    if(!cacheArr){
      cacheArr = []
    }
    let key = md5(url)
    if(cacheArr.indexOf(key) > -1) {
      return true
    } else {
      false
    }
  }

  render () {


    const {currentChapterNum, chaptersData, bookInfoData, chaptersNumPerSlice, currentChapterSliceNum} = this.props

    if(!!chaptersData.chapters) {
      
      return (
        <View className='chapters-selector'>
          <ScrollView scrollIntoView={this.state.scrollIntoView} className='chapters-selector-box' scrollY scrollTop={this.state.scrollPos} style={this.state.scrollViewStyle}>
              
              {
                !this.props.isFirstChapterSlice &&
                <View className='loading-pre-chapters' onClick={this.getPreChapters.bind(this)}>点击加载前面目录</View>
              }
              <View className='chapters-selector-box-container'>
                  {
                      chaptersData.chapters.map((item,index)=>{                      

                        return(
                            <View taroKey={index} id={`item${index+1}`}>
                                <View className='chapters-selector-box-item' onClick={this.chapterClickHandle.bind(this, item.chapter_url, item.title, bookInfoData.bookName, bookInfoData.chaptersCount, chaptersNumPerSlice*(currentChapterSliceNum-1) + index + 1)}>
                                    <Text className={currentChapterNum == (chaptersNumPerSlice*(currentChapterSliceNum-1) + index + 1) ? 'chapters-selector-box-item-text-selected' : 'chapters-selector-box-item-text'}>{item.title}</Text>
                                    {/* {
                                    this.isCached(item.chapter_url) &&
                                    <Image className='chapters-selector-box-item-icon' src={downloadedIcon}></Image>
                                    } */}
                                </View>
                                <View className='chapters-selector-box-separator'></View>
                            </View>
                        )

                      })
                  }
              </View>
              {
                this.props.isLastChapterSlice && 
                <View className='loading-next-chapters'>没有更多了</View>
              }

              {
                !this.props.isLastChapterSlice && 
                <View className='loading-next-chapters' onClick={this.getNextChapters.bind(this)}>点击加载后面目录</View>
              }
              
          </ScrollView>
          <View className='chapters-selector-mask' style={this.state.scrollViewStyle} onClick={this.disAppear.bind(this)}></View>
        </View>
      )
    }

  }
}
