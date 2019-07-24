import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Form, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.scss'
import rightIcon from '@assets/book-info/right.png'

import * as actions from '@actions/book-info'
import formSubmitHandle from '@utils/formidHandle'

@connect(state => state.bookInfo, { ...actions })
export default class BookChapters extends Component {
  static defaultProps = {
    chaptersInfo: {
      chaptersCount: 0,
      chapters: []
    },
    url: '',
    wd: '',
  }

  openSelector() {
    this.props.onOpenSelector()
    // this.props.dispatchOpenChapters()
  }

  chapterClickHandle(contentUrl, contentName, bookName, charptersCount, charpterNum) {
    Taro.navigateTo({
      url: '/pages/reader/reader?content_url=' + encodeURIComponent(contentUrl) + '&content_name=' + encodeURIComponent(contentName) + '&chapters_url=' + encodeURIComponent(this.props.url) + '&wd=' + encodeURIComponent(this.props.wd) + '&book_name=' + encodeURIComponent(bookName) + '&chapter_count=' + charptersCount + '&chapter_num=' + charpterNum
    })
  }

  render () {

    const {chaptersInfo} = this.props

    return (
      <View className='book-chapters'>
        <View className='book-chapters-head' onClick={this.openSelector.bind(this)}>
          <Text className='book-chapters-head-title'>查看目录</Text>
          <View className='book-chapters-head-counts'>
            <Text className='book-chapters-head-counts-text'>共{chaptersInfo.chaptersCount}章</Text>
            <Image className='book-chapters-head-counts-icon' src={rightIcon}></Image>
          </View>
        </View>
        <View className='book-chapters-separator'></View>
        {/* <View className='book-chapters-content'> */}
        {/* <Form report-submit onSubmit={(e)=>formSubmitHandle(e)}> */}
        {/* <Button className='book-chapters-content' form-type="submit"> */}
          {chaptersInfo.chapters.map((item,index)=>{
            if(index < 5) {
              return(
                <View taroKey={index}>
                  <View className='book-chapters-content-item' onClick={this.chapterClickHandle.bind(this, item.chapter_url, item.title, chaptersInfo.bookName, chaptersInfo.chaptersCount, index+1)}>
                    <Text className='book-chapters-content-item-text'>{item.title}</Text>
                  </View>
                  <View className='book-chapters-separator'></View>
                </View>
              )
            }
          })}
          {/* </Button> */}
          {/* </Form> */}
        {/* </View> */}
      </View>
    )
  }
    
}
