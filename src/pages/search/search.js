import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import Logo from './Logo'
import SearchBox from './searchbox'
import HotWords from './hotwords'
import ReadRecord from './readrecord'

import './search.scss'

class Search extends Component {

  config = {
    navigationBarTitleText: ''
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='search'>
        <Logo />
        <SearchBox />
        <HotWords />
        <View className='search-separator'></View>
        <ReadRecord />
        {/* <BookLoading /> */}
      </View>
    )
  }
}

export default Search