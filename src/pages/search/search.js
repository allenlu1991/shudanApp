import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import * as actions from '@actions/search'

import { BookLoading } from '@components'
import Logo from './Logo'
import SearchBox from './searchbox'
import HotWords from './hotwords'
import ReadRecord from './readrecord'

import './search.scss'

@connect(state => state.search, { ...actions })
class Search extends Component {

  config = {
    navigationBarTitleText: ''
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidMount() {
    this.props.dispatchHotWords({
      n: 1
    });
  }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='search'>
        <View style={{height:'40px', width: '100%'}}></View>
        <Logo />
        <View style={{height:'15px', width: '100%'}}></View>
        <SearchBox />
        <HotWords 
          list={this.props.hotWords}
          hotWordsRefresh={this.props.dispatchHotWords}
        />
        {/* <View className='search-separator'></View> */}
        {/* <ReadRecord /> */}
        {/* <BookLoading /> */}
      </View>
    )
  }
}

export default Search