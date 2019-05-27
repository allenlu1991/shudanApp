import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import bookDefaultCover from '@assets/book-info/default_book.png'
import upIcon from '@assets/book-info/up.png'
import downIcon from '@assets/book-info/down.png'

export default class BookDesc extends Component {
  state = {
    fold: true,
    defaultImg: false,
  }

  abstractClickHandle() {
    this.setState({
      fold: !this.state.fold
    })
  }

  imgErrorHandle() {
    this.setState({
      defaultImg: true,
    })
  }

  render () {
    const {bookInfo} = this.props
    return (
      <View className='book-desc'>
        <View className='book-desc-base'>
          <Image className='book-desc-base-cover' onError={this.imgErrorHandle.bind(this)} src={!!bookInfo.bookCover && !defaultImg ? bookInfo.bookCover : bookDefaultCover}></Image>
          <Text className='book-desc-base-name'>{bookInfo.bookName}</Text>
          <Text className='book-desc-base-author'>{bookInfo.author}</Text>
          <Text className='book-desc-base-site'>来源：{bookInfo.domainName}</Text>
        </View>
        <View className='book-desc-separator'></View>

        {
          !!bookInfo.bookAbstract && 
          <View className='book-desc-abstract' onClick={this.abstractClickHandle.bind(this)}>
            <View className={this.state.fold ? 'book-desc-abstract-text book-desc-abstract-text-fold' : 'book-desc-abstract-text'}>
            {bookInfo.bookAbstract}
            </View>
            <View className='book-desc-abstract-bttn'>
              <Image className='book-desc-abstract-bttn-icon' src={this.state.fold ? downIcon : upIcon}></Image>
            </View>
          </View>
        }
        
      </View>
    )
  }
}
