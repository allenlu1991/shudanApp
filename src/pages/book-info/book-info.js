import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import md5 from 'md5'

import { ChaptersSelector, BookLoading } from '@components'

import { getWindowHeight } from '@utils/style'

import BookDesc from './book-desc'
import BookChapters from './book-chapters'
import ReadBar from './read-bar'

import './book-info.scss'

import * as actions from '@actions/book-info'

@connect(state => state.bookInfo, { ...actions })
class BookInfo extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    scrollViewStyle: {},
    loading: false,
    openSelector: false,
  }

  bookChapters = {

  }

  onReadCurrent() {
    // console.log(this.props)
    const {chapters,bookName,chaptersCount} = this.props.bookInfoData
    const url = decodeURIComponent(this.$router.params.url)
    const wd = decodeURIComponent(this.$router.params.wd)

    Taro.navigateTo({
      url: '/pages/reader/reader?content_url=' + encodeURIComponent(chapters[0].chapter_url) + '&content_name=' + encodeURIComponent(chapters[0].title) + '&chapters_url=' + encodeURIComponent(url) + '&wd=' + encodeURIComponent(wd) + '&book_name=' + encodeURIComponent(bookName) + '&chapter_count=' + chaptersCount + '&chapter_num=' + 1
    })
  }

  onOpenSelector() {
    this.setState({
      openSelector: true
    })
  }

  onDisappear() {
    this.setState({
      openSelector: false
    })

    Taro.setNavigationBarTitle({
      title: ''
    })
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillMount() {
    let systemInfo = Taro.getSystemInfoSync();
    let ratio = systemInfo.windowWidth / 750;

    let readBarHeight = 108;

    let scrollViewHeight = getWindowHeight(false) - readBarHeight * ratio;

    let scrollViewStyle = {
      height: scrollViewHeight + 'px' //这个px是不会被转成rpx的
    }

    this.setState({
      loading: true,
      scrollViewStyle
    })
    
    if(this.$router.params && this.$router.params.url && this.$router.params.wd) {
      this.props.dispatchBookInfo({
        url: decodeURIComponent(this.$router.params.url),
        wd: decodeURIComponent(this.$router.params.wd),
      }).then((res)=>{
        // console.log(res)
        this.setState({
          loading: false,
        })

        if(res.status == 'fail'){
          Taro.showToast({
            icon: 'none',
            title: '呜呜~书丢了~',
          })
        }
        
        // const dataKey = md5(decodeURIComponent(this.$router.params.url))
        // Taro.setStorageSync(dataKey, res.data)
      })
    }
    
  }

  //小程序不支持一次性setData太多数据，因此也没有使用redux（调用action只是为了发起请求）
  setStateSlice(res) {
    if(res && res.status == 'success') {
      let bookInfoData = {
        ...res.data
      }

      let bookChaptersData = {
        chapters: res.data.chapters
      }

      let chapterSliceArr = []
      for (let index = 0; index < bookChaptersData.chapters.length; index+=1000) {
        if(bookChaptersData.chapters.length - index >= 1000) {
          chapterSliceArr.push(bookChaptersData.chapters.slice(index,index+1000))
        } else {
          chapterSliceArr.push(bookChaptersData.chapters.slice(index))
        }
        
      }

      for (let index = 0; index < chapterSliceArr.length; index++) {
        const chaptersItem = chapterSliceArr[index];

        const stateItem = {
          ['chapters'+index]:chaptersItem, 
        }

        this.setState(stateItem)
      }

      this.setState({
        chaptersSliceNum: chapterSliceArr.length
      })
      

      if(bookInfoData.chapters && bookInfoData.chapters.length > 5) {
        bookInfoData.chapters = bookInfoData.chapters.slice(0,5)
      }

      this.setState({
        bookInfoData,
      })


    }
  }

  onScrollLower() {

    let bookChaptersData = {
      chapters: this.bookChapters.chapters.slice(2000,4000)
    }

    this.setState({
      bookChaptersData
    })
  }

  componentWillUnmount () { 

  }

  componentDidShow () { }

  componentDidHide () { }

  onShareAppMessage (res) {
    
    let {bookName} = this.props.bookInfoData

    return {
      title: bookName,
      path: '/pages/book-info/book-info?url=' + encodeURIComponent(decodeURIComponent(this.$router.params.url)) + '&wd=' + encodeURIComponent('share')
    }
  }

  render () {

    if(this.state.loading) {
      return (
        <BookLoading />
      )
    }

    if(!this.state.loading && this.props.bookInfoRes.status == 'success') {


      return (
        <View className='book-info'>
          <ScrollView scrollY style={this.state.scrollViewStyle}>
            <BookDesc
              bookInfo={this.props.bookInfoData}
            />
            
            <View className='book-info-separator'></View>
            <BookChapters 
              //只要当 JSX 组件传入的参数是函数，参数名就必须以 on 开头
              onOpenSelector={this.onOpenSelector.bind(this)}
              chaptersInfo={this.props.bookInfoData}
              wd={decodeURIComponent(this.$router.params.wd)}
              url={decodeURIComponent(this.$router.params.url)}
            />
          </ScrollView>

          <ReadBar 
            onReadCurrent={this.onReadCurrent.bind(this)}
          />

          {


          this.state.openSelector && 
          <ChaptersSelector 
            // data={this.props.chaptersData}
            onDisappear={this.onDisappear.bind(this)}
            url={decodeURIComponent(this.$router.params.url)}
            onScrollLower={this.onScrollLower.bind(this)}
          />
          }

        </View>
      )
    }

  }
}

export default BookInfo