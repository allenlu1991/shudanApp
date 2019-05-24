import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import avatarIcon from '@assets/my/avatar.jpeg'
import rightIcon from '@assets/my/right.png'

export default class UserInfo extends Component {

  goToMyinfo() {
    Taro.navigateTo({
      url: '/pages/my-info/my-info'
    })
  }
  
  render () {
    let readBookCount

    if(!!this.props.userInfo) {
      readBookCount = this.props.userInfo.readBookCount
    } else {
      readBookCount = 0
    }
    
    // if(!readBookCount)
    return (
      <View className='user-info'>
        <View className='user-info-container'>
          <View className='user-info-container-userinfo'>
            <Image className='user-info-container-userinfo-avatar' src={avatarIcon}></Image>
            <View className='user-info-container-userinfo-text'>
              <Text className='user-info-container-userinfo-text-name'>陆文祥</Text>
              <Text className='user-info-container-userinfo-text-desc'>{readBookCount > 0?`最近读了${readBookCount}本书`:'不看书会变sa哦~'}</Text>
            </View>
          </View>
          <View className='user-info-container-link' onClick={this.goToMyinfo.bind(this)}>
            <Text className='user-info-container-link-text'>个人主页</Text>
            <Image className='user-info-container-link-icon' src={rightIcon}></Image>
          </View>
        </View>
      </View>
    )
  }
}
