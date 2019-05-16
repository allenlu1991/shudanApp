import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import avatarIcon from '@assets/my/avatar.jpeg'
import rightIcon from '@assets/my/right.png'

export default class UserInfo extends Component {

  render () {

    return (
      <View className='user-info'>
        <View className='user-info-container'>
          <View className='user-info-container-userinfo'>
            <Image className='user-info-container-userinfo-avatar' src={avatarIcon}></Image>
            <View className='user-info-container-userinfo-text'>
              <Text className='user-info-container-userinfo-text-name'>陆文祥</Text>
              <Text className='user-info-container-userinfo-text-desc'>最近读了12本书</Text>
            </View>
          </View>
          <View className='user-info-container-link'>
            <Text className='user-info-container-link-text'>个人主页</Text>
            <Image className='user-info-container-link-icon' src={rightIcon}></Image>
          </View>
        </View>
      </View>
    )
  }
}
