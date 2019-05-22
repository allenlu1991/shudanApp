import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import './index.scss'

import bookCover from '@assets/search/book.jpg'

import { getWindowHeight } from '@utils/style'

import wxParse from './wxParse/wxParse'

let systemInfo = Taro.getSystemInfoSync();
let ratio = systemInfo.windowWidth / 750;

// let readerStyle = {
//   titleSize: 40*ratio,
//   contentSize: 32*ratio,
//   lineHeight: 60*ratio,
//   // color: '#333', //夜间 #424952
//   color: '#7C7674',
  
//   backgroundColor: '#F2EEEA' //#C7EDCC 护眼色  #080C10 黑夜
// }

// let readerStyle = {
//   titleSize: 40*ratio,
//   contentSize: 32*ratio,
//   // color: '#333', //夜间 #424952
//   color: '#424952',
//   lineHeight: 60*ratio,
//   backgroundColor: '#080C10' //#C7EDCC 护眼色  #080C10 黑夜
// }

// let readerStyle = {
//   titleSize: 40*ratio,
//   contentSize: 32*ratio,
//   // color: '#333', //夜间 #424952
//   color: '#333',
//   lineHeight: 60*ratio,
//   backgroundColor: '#C7EDCC' //#C7EDCC 护眼色  #080C10 黑夜
// }

export default class BookContent extends Component {
  static defaultProps = {
    data: {
      title: '',
      body: ''
    }
  }

  state = {
    lock: false,
    scrollViewStyle: {},
  }

  scrollHandle(e) {
    this.props.onScrollHandle(e)
  }

  showChapters(e) {
    e.stopPropagation() //阻止事件冒泡
    this.props.onShowChapters()
  }

  nextChapter(e) {
    e.stopPropagation()
    this.props.onNextChapter()
  }

  preChapter(e) {
    e.stopPropagation()
    this.props.onPreChapter()
  }

  menuToggle() {
    this.props.onMenuToggle()
  }

  componentDidMount() {
    let scrollViewHeight = getWindowHeight(false);

    let scrollViewStyle = {
      height: scrollViewHeight + 'px' //这个px是不会被转成rpx的
    }

    this.setState({
      scrollViewStyle,
    })
  }

  render () {
    const {data, scrollTop, readMode, readerFontCss} = this.props
    let readerStyle = {
      ...readerFontCss,
      // color: '#333', //夜间 #424952
      color: '#7C7674',
      backgroundColor: '#F2EEEA' //#C7EDCC 护眼色  #080C10 黑夜
    }

    switch (readMode) {
      case 'night':{
        readerStyle.color = '#424952'
        readerStyle.backgroundColor = '#080C10'

        Taro.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#080C10',
          animation: {
            duration: 0,
            timingFunc: 'linear'
          }
        })
        break
      }
      case 'eyecare': {
        readerStyle.color = '#333'
        readerStyle.backgroundColor = '#C7EDCC'

        Taro.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#C7EDCC',
          animation: {
            duration: 0,
            timingFunc: 'linear'
          }
        })
        break
      }
      default:
        Taro.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#F2EEEA',
          animation: {
            duration: 0,
            timingFunc: 'linear'
          }
        })
        break;
    }

    let titleStyle = {
      fontSize: readerStyle.titleSize + 'px',
      color: readerStyle.color
    }
    
    let bodyStyle = {
      fontSize: readerStyle.contentSize + 'px',
      color: readerStyle.color,
      lineHeight: readerStyle.lineHeight + 'px',
    }

    //去除多余的换行符
    if(data && data.body) {
      const body = data.body.replace(/(<br\s?\/?>\s*)+/gi, '$1').replace(/<(script|a).*?>.*?<\/(script|a)>/gi, '')
      wxParse.wxParse('article', 'html', body, this.$scope, 5)
    }

    return (
      <View className='book-content' style={{background: readerStyle.backgroundColor}}>

        <ScrollView onScroll={this.scrollHandle.bind(this)} scrollTop={scrollTop} scrollY style={this.state.scrollViewStyle} className='book-content-container' onClick={this.menuToggle.bind(this)}>
          <View className='book-content-container-title' style={titleStyle}>
          {data.title}
          </View>
          <View className='book-content-container-body' style={bodyStyle}>
            <import src='./wxParse/wxParse.wxml' />
            <template is='wxParse' data='{{wxParseData:article.nodes}}'/>
          </View> 
          {
            this.state.lock && 
            <View className='book-content-container-share-unlock-container'>
              <Text className='book-content-container-share-unlock-tips'>分享到微信群，立即解锁剩余章节</Text>
              <Button plain className='book-content-container-share-unlock-btn' style={{border: 2*ratio + "px solid #E45258", color: "#E45258"}}>分享到微信群</Button>
            </View>
          }
          
          {
          data && data.title &&
          <View className='book-content-container-chapterLink'>
            <View className="book-content-container-chapterLink-next" onClick={this.nextChapter.bind(this)}>下一章</View>
            <View className='book-content-container-chapterLink-otherlink'>
              <View className="book-content-container-chapterLink-otherlink-prev" onClick={this.preChapter.bind(this)}>上一章</View>
              <View className="book-content-container-chapterLink-otherlink-chapterMenu" onClick={this.showChapters.bind(this)}>目录</View>
            </View>
          </View>
          }
        </ScrollView>
    </View> 
    )
  }
}
