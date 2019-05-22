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
    bookInfoData: {},
    chaptersData: [],
  }

  onReadCurrent() {
    const {chapters,bookName,chaptersCount} = this.props.bookInfoRes.data
    const {url, wd} = this.$router.params
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
        url:this.$router.params.url,
        wd: this.$router.params.wd,
      }).then((res)=>{
        this.setState({
          loading: false
        })

        if(res.status=='success') {
          

          let bookInfoData = {
            ...res.data,
            chapters: res.data.chapters.slice(0,5)
          }

          this.setState({
            bookInfoData,
          })

          let charptsPerNum = 1000
          for (let index = 0; index < Math.ceil(res.data.chapters.length/charptsPerNum); index++) {
            
            //用回调函数保证执行顺序
            this.forceUpdate(()=>{
              this.state.chaptersData[index] = res.data.chapters.slice(index*charptsPerNum, (index+1)*charptsPerNum)
            })            
          }

          this.forceUpdate()
        }
 
        const dataKey = md5(this.$router.params.url)
        Taro.setStorageSync(dataKey, res.data)
      })
    }
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    console.log(this.state)

    if(this.state.loading) {
      return (
        <BookLoading />
      )
    }

    

    if(!this.state.loading && this.props.bookInfoRes && this.props.bookInfoRes.status == 'success') {
      return (
        <View className='book-info'>
          <ScrollView scrollY style={this.state.scrollViewStyle}>
            <BookDesc
              bookInfo={this.state.bookInfoData}
            />
            <View className='book-info-separator'></View>
            <BookChapters 
              //只要当 JSX 组件传入的参数是函数，参数名就必须以 on 开头
              onOpenSelector={this.onOpenSelector.bind(this)}
              chaptersInfo={this.state.bookInfoData}
              wd={this.$router.params.wd}
              url={this.$router.params.url}
            />
          </ScrollView>
          <ReadBar 
            onReadCurrent={this.onReadCurrent.bind(this)}
          />

          {
          this.state.openSelector && 
          <ChaptersSelector 
            data={this.state.chaptersData}
            onDisappear={this.onDisappear.bind(this)}
            url={this.$router.params.url}
          />
          }
        </View>
      )
    } else if(this.props.bookInfoRes.status == 'fail'){
      Taro.showToast({
        icon: 'none',
        title: '呜呜~书丢了~',
      })
    }

  }
}

export default BookInfo