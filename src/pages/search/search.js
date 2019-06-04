import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import * as actions from '@actions/search'
import { dispatchGetAllRecord } from '@actions/read-record'

import { BookLoading } from '@components'
import Logo from './Logo'
import SearchBox from './searchbox'
import HotWords from './hotwords'
import ReadRecord from './readrecord'

import ShudanImg from '@assets/search/shudan.jpg'

import './search.scss'

const appVersion = '2.0.4'

@connect(state => {
  return {
    readRecord: state.readRecord,
    search: state.search,
  }
}, { ...actions, dispatchGetAllRecord })
class Search extends Component {

  config = {
    navigationBarTitleText: '',
  }

  state = {
    isCheck: true,
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentWillMount() {
    let isCheckCache = Taro.getStorageSync('isCheck');

    if(!!isCheckCache) {
      this.setState({
        isCheck: isCheckCache == 'yes' ? true : false
      })
    }

    this.props.dispatchHotWords({
      n: 1
    })

    this.props.dispatchGetAllRecord()
  }

  componentDidShow() {
    let isCheckCache = Taro.getStorageSync('isCheck');

    if(!!isCheckCache) {
      this.setState({
        isCheck: isCheckCache == 'yes' ? true : false
      })
    }

    this.props.dispatchAppCheck({
      app: 'novalapp'
    }).then((res)=>{
      const {status, data} = res
      let isCheck
      
      if(status == 'success' && data && data.checkVersion == appVersion && !!data.isCheck) {
        isCheck = true
      } else {
        isCheck = false
      }

      this.setState({
        isCheck
      })

      Taro.setStorageSync('isCheck', isCheck ? 'yes' : 'no');
    })
  }

  componentDidMount() {
    
  }

  componentDidHide () { }

  onShareAppMessage (res) {
    return {
      title: '想看的书，查查就有！',
      path: '/pages/search/search'
    }
  }

  render () {

    let {bookShelfData} = this.props.readRecord

    let isShowRecord = !!bookShelfData && bookShelfData.length > 0

    return (
      <View className='search'>
        {
        !this.state.isCheck && !isShowRecord &&
        <View style={{height:'40px', width: '100%'}}></View>
        }
        {
          !this.state.isCheck &&  <Logo />
        }
        {
        !this.state.isCheck && !isShowRecord &&
        <View style={{height:'15px', width: '100%'}}></View>
        }

        {
          !this.state.isCheck && <SearchBox />
        }
        
        {
          !this.state.isCheck &&
          <HotWords 
            list={this.props.search.hotWords}
            hotWordsRefresh={this.props.dispatchHotWords}
          />
        }
        
        {
          !this.state.isCheck && isShowRecord && 
          <View className='search-separator'></View>
        }
        {
          !this.state.isCheck && isShowRecord && 
          <ReadRecord />
        }

        {
          this.state.isCheck && 
          <Image src={ShudanImg} mode='widthFix' style={{width:'100%'}}/>
        }
        {/* <BookLoading /> */}
      </View>
    )
  }
}

export default Search