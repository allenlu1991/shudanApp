import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import logoIcon from '@assets/search/logo-icon.png'
import logoText from '@assets/search/logo-text.png'

export default class Logo extends Component {

  render () {

    return (
      <View className='search-logo'>
        <Image className='search-logo-icon' src={logoIcon} />
        <Image className='search-logo-text' src={logoText} />
      </View>
    )
  }
}
