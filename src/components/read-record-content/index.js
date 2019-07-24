import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import { connect } from '@tarojs/redux'
import formSubmitHandle from '@utils/formidHandle'
import md5 from 'md5'

import { getBookRecord, setBookRecord } from '@utils/cache'

import defaultCover from '@assets/book-info/default_book.png'
import * as actions from '@actions/read-record'

@connect(state => state.readRecord, { ...actions })
export default class ReadRecordContent extends Component {

  defautImgObj = {

  }

  imgErrorHandle(cover) {
    let url = md5(cover)
    this.defautImgObj[url] = true
  }

  isDefault(cover) {
    let url = md5(cover)
    return this.defautImgObj.hasOwnProperty(url)
  }

  readCurrent(bookData) {
    const {url, name, chapterCount, readNum, laterScrollTop} = bookData
    const wd = ''
    Taro.navigateTo({
      url: '/pages/reader/reader?chapters_url=' + encodeURIComponent(url) + '&wd=' + encodeURIComponent(wd) + '&book_name=' + encodeURIComponent(name) + '&chapter_count=' + chapterCount + '&chapter_num=' + readNum + '&laterScrollTop=' + laterScrollTop
    })
  }

  render () {
    // console.log(this.defautImgObj)
    return (
      <View className='read-record-content'>

      {
        this.props.bookShelfData.map((item,index)=>{
          return(
            <View taroKey={index}>
              {/* <Form report-submit onSubmit={(e)=>formSubmitHandle(e)}>
              <Button className='formid-bttn' form-type="submit"> */}
              <View className='read-record-content-item' onClick={this.readCurrent.bind(this, item)}>
                <Image className='read-record-content-item-cover' onError={this.imgErrorHandle.bind(this,item.cover)} src={!!item.cover && !this.isDefault(item.cover) ? item.cover : defaultCover}></Image>
                <View className='read-record-content-item-info'>
                  <Text className='read-record-content-item-info-name'>{item.name}</Text>
                  <Text className='read-record-content-item-info-lastread'>读至 {item.chapterName}(共{item.chapterCount}章)</Text>
                  <Text className='read-record-content-item-info-lastreadtime'>上次阅读时间：{item.lastTime}</Text>
                </View>
              </View>
              <View className='read-record-content-item-separator'></View>
              {/* </Button>
              </Form> */}
            </View>
          )
        })
      }
      </View>
    )
  }
}
