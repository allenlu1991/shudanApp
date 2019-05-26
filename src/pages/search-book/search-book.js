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
    searched: false,
  }

  onSearchLoading= ({wd, loading, searched = false}) => {
    this.setState({
      wd,
      loading,
      searched
    })

    if(!!wd && searched == true) {
      this.props.dispatchSetSearchRecord({
        wd,
      })
    }
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

       {
         !this.state.wd &&
         <SearchHistory 
          dispatchSearchBook={this.props.dispatchSearchBook}
          onSearchLoading={this.onSearchLoading}
         />
       } 
        {
        this.state.loading && 
        <SearchLoading 
          type='loading'
        />
        }
        {
        !this.state.loading && this.props.results.length == 0 && this.state.searched &&
        <SearchLoading 
          type='nodata'
        />
        }
        {
          !this.state.loading && this.state.searched && !!this.state.wd &&
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