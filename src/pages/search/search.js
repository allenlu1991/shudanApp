import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import * as actions from '@actions/search'
import { dispatchGetAllRecord } from '@actions/read-record'

import { BookLoading } from '@components'
import Logo from './Logo'
import SearchBox from './searchbox'
import HotWords from './hotwords'
import ReadRecord from './readrecord'

import './search.scss'

@connect(state => {
  return {
    readRecord: state.readRecord,
    search: state.search,
  }
}, { ...actions, dispatchGetAllRecord })
class Search extends Component {

  config = {
    navigationBarTitleText: '',
    // navigationBarTextStyle: 'black',
    // navigationBarBackgroundColor: '#ffffff',
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentWillMount() {
    this.props.dispatchHotWords({
      n: 1
    })

    this.props.dispatchGetAllRecord()
  }

  componentDidMount() {
    
  }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let {bookShelfData} = this.props.readRecord

    let isShowRecord = !!bookShelfData && bookShelfData.length > 0

    return (
      <View className='search'>
        {
        !isShowRecord &&
        <View style={{height:'40px', width: '100%'}}></View>
        }
        <Logo />
        {
        !isShowRecord &&
        <View style={{height:'15px', width: '100%'}}></View>
        }
        <SearchBox />
        <HotWords 
          list={this.props.search.hotWords}
          hotWordsRefresh={this.props.dispatchHotWords}
        />
        
        {
          isShowRecord && 
          <View className='search-separator'></View>
        }
        {
          isShowRecord && 
          <ReadRecord />
        }

        {/* <BookLoading /> */}
      </View>
    )
  }
}

export default Search