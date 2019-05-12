import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import bookCover from '@assets/search/book.jpg'
import upIcon from '@assets/book-info/up.png'
import downIcon from '@assets/book-info/down.png'

export default class BookDesc extends Component {

  render () {

    return (
      <View className='book-desc'>
        <View className='book-desc-base'>
          <Image className='book-desc-base-cover' src={bookCover}></Image>
          <Text className='book-desc-base-name'>斗破苍穹</Text>
          <Text className='book-desc-base-author'>天蚕土豆</Text>
          <Text className='book-desc-base-site'>来源：顶点小说</Text>
        </View>
        <View className='book-desc-separator'></View>
        <View className='book-desc-abstract'>
          <View className='book-desc-abstract-text'>
          三间七界，万道争锋！独闯七界，为救伊人！化蝶入蛊，勾魂断肠！生死献祭，倾城之恋！美杜莎化，石化之瞳！熏儿相知，回眸一笑！伊人着衣裳，…
          </View>
          <View className='book-desc-abstract-bttn'>
            <Image className='book-desc-abstract-bttn-icon' src={downIcon}></Image>
          </View>
        </View>
      </View>
    )
  }
}
