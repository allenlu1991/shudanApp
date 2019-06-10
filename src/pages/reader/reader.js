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
import { dispatchGetOneChapter, dispatchBookInfo } from '@actions/book-info'
import { dispatchUpdateOneRecord } from '@actions/read-record'

import { getNowFormatDate } from '@utils/functions'
import { setAppOptionCache, getAppOptionCache } from '@utils/cache'

let systemInfo = Taro.getSystemInfoSync();
let ratio = systemInfo.windowWidth / 750;

@connect(state => state, { ...actions, dispatchGetOneChapter, dispatchUpdateOneRecord, dispatchBookInfo})
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
    contentUrl: '',
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
    finishGuide: false,
  }

  onDisappear() {
    this.setState({
      showChapters: false
    })

    Taro.setNavigationBarTitle({
      title: decodeURIComponent(this.$router.params.book_name)
    })
  }

  onMenuToggle() {
    this.setState({
      menuAppear: !this.state.menuAppear,
      menuDefaultAppear: true
    })
  }

  onScrollHandle(e) {
   
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

    let {chapters_url, wd} = this.$router.params
    chapters_url = decodeURIComponent(chapters_url)
    wd = decodeURIComponent(wd)

    this.getBookContent(chapters_url, parseInt(this.state.currentChapterNum) + 1, wd, {})
  }

  onPreChapter() {
    this.setState({
      loading: true,
    })

    let {chapters_url, wd} = this.$router.params
    chapters_url = decodeURIComponent(chapters_url)
    wd = decodeURIComponent(wd)

    this.getBookContent(chapters_url, parseInt(this.state.currentChapterNum) - 1, wd, {})
  }

  onIncSize() {
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
    setAppOptionCache('readerFontCss', this.state.readerFontCss)
  }

  onDecSize() {
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
    setAppOptionCache('readerFontCss', this.state.readerFontCss)
  }

  onChangeReadMode(readMode) {
    this.setState({
      readMode,
    })

    setAppOptionCache('readMode', readMode)
  }

  preloadingContent(chaptersUrl, chapterNum = 1, wd='', bookInfoData={}) {
    chapterNum = parseInt(chapterNum)
    this.props.dispatchGetOneChapter({
      chapterNum,
    })

    let bookInfo
    if(JSON.stringify(bookInfoData) == "{}") {
      bookInfo = this.props.bookInfo.bookInfoData
    } else {
      bookInfo = bookInfoData
    }

    if(!bookInfo) {
      return
    }

    if(chapterNum <= bookInfo.chaptersCount && chapterNum >= 1) {
      let content_url = this.props.bookInfo.oneChapterInfo.chapter_url
      let content_name = this.props.bookInfo.oneChapterInfo.title
      let chapters_url = chaptersUrl
      let book_name = bookInfo.bookName
      let chapter_count = bookInfo.chaptersCount
      let chapter_num = chapterNum

      this.props.dispatchBookContent({
        url: content_url,
        content_name,
        chapters_url,
        wd,
        book_name,
        chapter_count,
        chapter_num,
      })
    }
  }

  getBookContent(chaptersUrl, chapterNum = 1, wd='', bookInfoData={}) {
    chapterNum = parseInt(chapterNum)
    this.props.dispatchGetOneChapter({
      chapterNum,
    })

    let bookInfo
    if(JSON.stringify(bookInfoData) == "{}") {
      bookInfo = this.props.bookInfo.bookInfoData
    } else {
      bookInfo = bookInfoData
    }

    if(!bookInfo) {
      this.setState({
        loading: false,
      })

      Taro.showToast({
        title: '没有书籍信息',
        icon: 'none',
      })

      return
    }

    if(chapterNum <= bookInfo.chaptersCount && chapterNum >= 1) {
      this.setState({
        loading: true,
      })

      let content_url = this.props.bookInfo.oneChapterInfo.chapter_url
      let content_name = this.props.bookInfo.oneChapterInfo.title
      let chapters_url = chaptersUrl
      let book_name = bookInfo.bookName
      let chapter_count = bookInfo.chaptersCount
      let chapter_num = chapterNum
      let book_cover = bookInfo.bookCover

      this.props.dispatchBookContent({
        url: content_url,
        content_name,
        chapters_url,
        wd,
        book_name,
        chapter_count,
        chapter_num,
      }).then((res)=>{
        this.setState({
          contentUrl: content_url,
          loading: false,
          contentData: res.data,
          currentChapterNum: chapterNum,
          scrollTop: this.state.scrollTop * (-1),//必须得让state的值发生变化，否则不会更新视图
        })

        if(res.status == 'success') {
          let shelfData = {
            url: chapters_url,
            name: book_name,
            cover: book_cover,
            readNum: chapter_num,
            chapterCount: parseInt(chapter_count),
            laterScrollTop: 0, //上次滑动的距离
            chapterName: res.data.title,
            lastTime: getNowFormatDate(),
          }

          this.props.dispatchUpdateOneRecord(shelfData)
          
          //预加载后面1章
          this.preloadingContent(chaptersUrl, parseInt(chapterNum)+1, wd, {})

        } else {
          Taro.showToast({
            title: '呜呜~ 书丢了',
            icon: 'none',
            duration: 2000,
          })
        }
       
      })

    }else if(chapterNum > bookInfo.chaptersCount) {
      this.setState({
        loading: false,
      })

      Taro.showToast({
        title: '已是最后一章',
        icon: 'none',
      })

      return
    }else if(chapterNum < 1) {
      this.setState({
        loading: false,
      })

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
    let {content_url, content_name, chapters_url, wd, book_name, chapter_count, chapter_num} = this.$router.params

    chapters_url = decodeURIComponent(chapters_url)
    wd = decodeURIComponent(wd)
    chapter_num = decodeURIComponent(chapter_num)

    this.setState({
      loading: true,
    })

    this.props.dispatchBookInfo({
      url: chapters_url,
      wd,
    }).then((res)=>{
      this.setState({
        loading: false,
      })
      if(res.status == 'success') {
        this.getBookContent(chapters_url, parseInt(chapter_num), wd, {})
      } else {
        Taro.showToast({
          title: '呜呜~这本书丢了~',
          icon: 'none',
          duration: 2000,
        })
      }
      
    })

    //引导
    this.setState({
      finishGuide: !!getAppOptionCache('finishGuide') ? getAppOptionCache('finishGuide') : false,
    })
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: decodeURIComponent(this.$router.params.book_name)
    })

    let readMode = 'normal'
    let readerFontCss = {
      titleSize: 40*ratio,
      contentSize: 32*ratio,
      lineHeight: 60*ratio,
    }

    let readerFontCssCache = getAppOptionCache('readerFontCss')
    let readModeCache = getAppOptionCache('readMode')

    this.setState({
      readerFontCss: readerFontCssCache ? readerFontCssCache : readerFontCss,
      readMode: readModeCache ? readModeCache : readMode,
    })
  }

  finishGuideHandle() {
    setAppOptionCache('finishGuide', true)
    this.setState({
      finishGuide: true,
      menuAppear: true, //控制菜单是否展示
      menuDefaultAppear: true, //第一次菜单是否展示
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onShareAppMessage (res) {
    let {bookName} = this.props.bookInfo.bookInfoData

    let rawUrl = '/pages/book-info/book-info?url=' + encodeURIComponent(decodeURIComponent(this.$router.params.chapters_url)) + '&wd=' + encodeURIComponent('share')
    let shareUrl = '/pages/search/search?navigateToUrl=' + encodeURIComponent(rawUrl)

    return {
      title: bookName,
      path: shareUrl,
    }
  }

  render () {
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
            url = {this.state.contentUrl}
            onChangeReadMode = {this.onChangeReadMode.bind(this)}
            onShowChapters={this.onShowChapters.bind(this)}
            onNextChapter={this.onNextChapter.bind(this)}
            onPreChapter={this.onPreChapter.bind(this)}
            onIncSize = {this.onIncSize.bind(this)}
            onDecSize={this.onDecSize.bind(this)}
          />
        }
        
        {!this.state.finishGuide && 
        <UserGuide 
          onFinishGuide = {this.finishGuideHandle.bind(this)}
        />}
        { this.state.showChapters &&
        <ChaptersSelector 
          // data={charptersData}
          onDisappear={this.onDisappear.bind(this)}
          url={decodeURIComponent(this.$router.params.chapters_url)}
          onGetBookContent={this.getBookContent.bind(this)}
          currentChapterNum={this.state.currentChapterNum}
        />
        }
      </View>
    )
    
  }
}

export default Read