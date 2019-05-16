import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import avatarIcon from '@assets/my/avatar.jpeg'
import bookCover from '@assets/search/book.jpg'

export default class MyUserInfo extends Component {

  render () {
    return (
      <View className='my-user-info'>
        <View className='my-user-info-container'>
          <View className='my-user-info-container-userinfo'>
            <Image className='my-user-info-container-userinfo-avatar' src={avatarIcon}></Image>
            <View className='my-user-info-container-userinfo-text'>
              <Text className='my-user-info-container-userinfo-text-name'>陆文祥</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
