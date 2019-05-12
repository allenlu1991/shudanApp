import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SearchBox from './search-box'
import SearchHistory from './search-history'
import SearchLoading from './search-loading'
import SearchResults from './search-results'

import './search-book.scss'

class SearchBook extends Component {

  config = {
    navigationBarTitleText: '搜索'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='search-book'>
        <SearchBox />
        {/* <SearchHistory /> */}
        {/* <SearchLoading /> */}
        
        <SearchResults />
      </View>
    )
  }
}

export default SearchBook