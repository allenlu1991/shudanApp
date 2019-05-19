import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import md5 from 'md5'

import BookContent from './book-content'
import BookMenu from './book-menu'
import UserGuide from './user-guide'
import { ChaptersSelector, BookLoading } from '@components'

import './reader.scss'


import * as actions from '@actions/reader'

@connect(state => state.reader, { ...actions })
class Read extends Component {

  config = {
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#F2EEEA',
    navigationBarTextStyle: 'black'
  }

  state = {
    loading: true,
    showChapters: false,
    bookData:{},
    currentChapterNum: 1,
    chaptersUrl: '',
    wd: '',
    contentData:{},
    scrollTop: 0.000001,
  }

  onDisappear() {
    this.setState({
      showChapters: false
    })

    Taro.setNavigationBarTitle({
      title: this.$router.params.book_name
    })

    Taro.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#F2EEEA',
      animation: {
        duration: 0,
        timingFunc: 'linear'
      }
    })

  }

  onScrollHandle(e) {
    // this.setState({
    //   scrollTop: e.detail.scrollTop
    // })
  }

  onShowChapters() {
    this.setState({
      showChapters: true
    })
  }

  onNextChapter() {
    this.setState({
      loading: true,
    })
    this.getBookContent(this.state.chaptersUrl, this.state.currentChapterNum + 1, this.state.wd)
  }

  onPreChapter() {
    
    this.getBookContent(this.state.chaptersUrl, this.state.currentChapterNum - 1, this.state.wd)
  }

  getBookContent(chaptersUrl, chapterNum = 1, wd='') {
    const bookInfo = Taro.getStorageSync(md5(chaptersUrl))

    if(!bookInfo) {
      Taro.showToast({
        title: '没有书籍信息',
        icon: 'none',
      })

      return
    }

    if(chapterNum <= bookInfo.chapters.length && chapterNum >= 1) {
      this.setState({
        loading: true,
      })

      let content_url = bookInfo.chapters[chapterNum-1].chapter_url
      let content_name = bookInfo.chapters[chapterNum-1].title
      let chapters_url = chaptersUrl
      let book_name = bookInfo.bookName
      let chapter_count = bookInfo.chaptersCount
      let chapter_num = chapterNum

      this.props.dispatchBookContent({
        content_url,
        content_name,
        chapters_url,
        wd,
        book_name,
        chapter_count,
        chapter_num,
      }).then((res)=>{
        this.setState({
          loading: false,
          contentData: res.data,
          currentChapterNum: chapterNum,
          scrollTop: this.state.scrollTop * (-1),//必须得让state的值发生变化，否则不会更新视图
        })
      })

    }else if(chapterNum > bookInfo.chapters.length) {
      Taro.showToast({
        title: '已是最后一章',
        icon: 'none',
      })

      return
    }else if(chapterNum < 1) {
      Taro.showToast({
        title: '已是第一章',
        icon: 'none',
      })

      return
    }
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillMount() {    
    const {content_url, content_name,chapters_url,wd,book_name,chapter_count,chapter_num} = this.$router.params

    this.props.dispatchBookContent({
      content_url,
      content_name,
      chapters_url,
      wd,
      book_name,
      chapter_count,
      chapter_num,
    }).then((res)=>{
      this.setState({
        loading: false,
        currentChapterNum: !!chapter_num ? parseInt(chapter_num) : 1,
        chaptersUrl: chapters_url,
        wd: wd,
        contentData: res.data
      })
    })
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: this.$router.params.book_name
    })

    this.setState({
      bookData: Taro.getStorageSync(md5(this.$router.params.chapters_url))
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    
    return (
      <View className='read'>
        {this.state.loading && <BookLoading />}
        <BookContent 
          data={this.state.contentData}
          onShowChapters={this.onShowChapters.bind(this)}
          onNextChapter={this.onNextChapter.bind(this)}
          onPreChapter={this.onPreChapter.bind(this)}
          scrollTop={this.state.scrollTop}
          onScrollHandle={this.onScrollHandle.bind(this)}
        />
        {/* <BookMenu /> */}
        {/* <UserGuide /> */}
        { this.state.showChapters &&
        <ChaptersSelector 
          data={this.state.bookData}
          onDisappear={this.onDisappear.bind(this)}
          url={this.$router.params.chapters_url}
          onGetBookContent={this.getBookContent.bind(this)}
          currentChapterNum={this.state.currentChapterNum}
        />
        }
      </View>
    )
    
  }
}

export default Read