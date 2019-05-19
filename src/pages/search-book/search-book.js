import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import SearchBox from './search-box'
import SearchHistory from './search-history'
import SearchLoading from './search-loading'
import SearchResults from './search-results'

import * as actions from '@actions/search-book'

import './search-book.scss'

@connect(state => state.searchBook, { ...actions })
class SearchBook extends Component {

  config = {
    navigationBarTitleText: '搜索'
  }

  state = {
    loading: false,
    wd: '',
  }

  onSearchLoading= (loadingStatus={}) => {
    this.setState(loadingStatus)
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentWillMount() { //组件装载之前
    const {wd} = this.$router.params
    this.setState({
      wd,
    })
  }

  render () {
    return (
      <View className='search-book'>
        <SearchBox 
          dispatchSearchBook={this.props.dispatchSearchBook}
          onSearchLoading={this.onSearchLoading}
          wd={this.state.wd}
        />
        {/* <SearchHistory /> */}
        {this.state.loading && <SearchLoading />}
        {
          !this.state.loading && !!this.state.wd &&
          <SearchResults
            list={this.props.results}
            wd={this.state.wd}
          />
        }
        
      </View>
    )
  }
}

export default SearchBook