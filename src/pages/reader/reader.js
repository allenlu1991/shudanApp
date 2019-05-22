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

let systemInfo = Taro.getSystemInfoSync();
let ratio = systemInfo.windowWidth / 750;

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
    menuAppear: false, //控制菜单是否展示
    menuDefaultAppear: false, //第一次菜单是否展示
    readMode: 'normal', //阅读模式, 有：normal, night, eyecare
    readerFontCss: {
      titleSize: 40*ratio,
      contentSize: 32*ratio,
      lineHeight: 60*ratio,
    },
  }

  

  onDisappear() {
    this.setState({
      showChapters: false
    })

    Taro.setNavigationBarTitle({
      title: this.$router.params.book_name
    })
  }

  onMenuToggle() {
    this.setState({
      menuAppear: !this.state.menuAppear,
      menuDefaultAppear: true
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

  onIncSize() {
    console.log(ratio,this.state.readerFontCss.titleSize/ratio,this.state.readerFontCss.titleSize)
    if (this.state.readerFontCss.titleSize >= 50*ratio) {
      Taro.showToast({
        title: '已经是最大号字啦~',
        icon: 'none',
      })
      return
    }
    this.state.readerFontCss.titleSize = this.state.readerFontCss.titleSize + 5*ratio;
    this.state.readerFontCss.lineHeight = this.state.readerFontCss.lineHeight + 10*ratio;
    this.state.readerFontCss.contentSize = this.state.readerFontCss.contentSize + 5*ratio;
    this.setState({
      readerFontCss: this.state.readerFontCss
    });
  }

  onDecSize() {
    console.log(ratio,this.state.readerFontCss.titleSize/ratio,this.state.readerFontCss.titleSize)
    if (this.state.readerFontCss.titleSize <= 30*ratio) {
      Taro.showToast({
        title: '已经是最小号字啦~',
        icon: 'none',
      })
      return
    }
    this.state.readerFontCss.titleSize = this.state.readerFontCss.titleSize - 5*ratio;
    this.state.readerFontCss.contentSize = this.state.readerFontCss.contentSize - 5*ratio;
    this.state.readerFontCss.lineHeight = this.state.readerFontCss.lineHeight - 10*ratio;
    this.setState({
      readerFontCss: this.state.readerFontCss
    });
  }

  onChangeReadMode(readMode) {
    this.setState({
      readMode,
    })
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
    
    // this.setState({
    //   bookData: Taro.getStorageSync(md5(this.$router.params.chapters_url))
    // })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    // let charptersData = {
    //   chapters: this.state.bookData.chapters,
    //   chaptersCount: this.state.bookData.chaptersCount
    // }
    if(this.props.bookContent.status == 'fail') {
      Taro.showToast({
        title: '呜呜~ 书丢了',
        icon: 'none',
        duration: 2000,
      })
    }
    
    return (
      <View className='reader'>
        {this.state.loading && <BookLoading />}
        <BookContent 
          data={this.state.contentData}
          readMode = {this.state.readMode}
          readerFontCss = {this.state.readerFontCss}
          onShowChapters={this.onShowChapters.bind(this)}
          onNextChapter={this.onNextChapter.bind(this)}
          onPreChapter={this.onPreChapter.bind(this)}
          scrollTop={this.state.scrollTop}
          onScrollHandle={this.onScrollHandle.bind(this)}
          onMenuToggle={this.onMenuToggle.bind(this)}
        />
        {
          this.state.menuDefaultAppear &&
          <BookMenu
            appear={this.state.menuAppear}
            title={this.state.contentData ? this.state.contentData.title : ''}
            readMode = {this.state.readMode}
            onChangeReadMode = {this.onChangeReadMode.bind(this)}
            onShowChapters={this.onShowChapters.bind(this)}
            onNextChapter={this.onNextChapter.bind(this)}
            onPreChapter={this.onPreChapter.bind(this)}
            onIncSize = {this.onIncSize.bind(this)}
            onDecSize={this.onDecSize.bind(this)}
          />
        }
        {/* <UserGuide /> */}
        { this.state.showChapters &&
        <ChaptersSelector 
          // data={charptersData}
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