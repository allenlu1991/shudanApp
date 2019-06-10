import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Tab from './tab'
import Menu from './menu'
import List from './list'
import { getWindowHeight } from '@utils/style'
import { Loading } from '@components'

import * as actions from '@actions/ranking'

import './ranking.scss'

@connect(state => state.ranking, { ...actions })
class Ranking extends Component {

  config = {
    navigationBarTitleText: '排行'
  }

  state = {
    subCurrent: {},
    current: 0,
    loading: false,
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillMount() {
    this.props.dispatchRinkingCate().then((res)=> {

      if(res.status == 'success') {
        let subCurrent = this.state.subCurrent[this.state.current] || 0
        
        this.props.dispatchRinkingList({
          f: res.data[this.state.current].type,
          s: res.data[this.state.current]['subCategories'][subCurrent].type,
          page: 1,
        })
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  loadListMore(firstCate, subCate, pageNum, isLast) {
    pageNum = parseInt(pageNum)
    isLast = parseInt(isLast)

    if(isLast == 0) {
      Taro.showLoading({
        title: '努力加载中...'
      })

      this.props.dispatchRinkingListMore({
        f: firstCate,
        s: subCate,
        page: pageNum + 1,
      }).then(res => {
        Taro.hideLoading()
      })
    }
  }

  tabChangeHandle(index) {
    this.setState({
      loading: true,
    })
    
    let subCurrent = this.state.subCurrent[index] || 0

    this.props.dispatchRinkingList({
      f: this.props.rankingCate[index].type,
      s: this.props.rankingCate[index]['subCategories'][subCurrent].type,
      page: 1,
    }).then(res=>{
      this.setState({
        loading: false,
      })
    })

    this.setState({
      current: index,
    })
  }

  subMenuChangeHandle(subIndex) {
    this.setState({
      loading: true,
    })

    this.props.dispatchRinkingList({
      f: this.props.rankingCate[this.state.current].type,
      s: this.props.rankingCate[this.state.current]['subCategories'][subIndex].type,
      page: 1,
    }).then(res=>{
      this.setState({
        loading: false,
      })
    })

    this.setState({
      subCurrent: {
        [this.state.current]: subIndex,
      }
    })
  }

  render () {
    let systemInfo = Taro.getSystemInfoSync();
    let ratio = systemInfo.windowWidth / 750;

    const height = getWindowHeight() - 80 * ratio

    let {rankingCate, rankingList} = this.props

    return (
      <View className='ranking'>
        <View className='ranking-tab'>
          <Tab 
            list={rankingCate}
            current={this.state.current || 0}
            onTabChange = {this.tabChangeHandle.bind(this)}
          />
        </View>

        <Swiper
          className='ranking-swiper'
          current={this.state.current}
          onChange={(e)=>{this.tabChangeHandle(e.detail.current)}}
          style={{ height: height+'px' }}
        >

          {
            rankingCate.map((item, index) => {
              let currentIndex = this.state.subCurrent[index] ? this.state.subCurrent[index] : 0
              let firstCate = rankingCate[index].type
              let subCate = rankingCate[index]['subCategories'][currentIndex].type

              return (
              <SwiperItem 
                className='ranking-swiper-item'
                taroKey={index}
              >
                  <ScrollView
                    scrollY
                    className='ranking-submenu'
                    style={{ height: height+'px' }}
                  >
                    <Menu 
                      list={rankingCate[index].subCategories}
                      current={currentIndex}
                      onSubMenuChange = {this.subMenuChangeHandle.bind(this)}
                    />
                  </ScrollView>

                  <ScrollView
                    scrollY
                    className='ranking-list'
                    style={{ height: height+'px' }}
                    lowerThreshold = '80'
                    onScrollToLower = {this.loadListMore.bind(this, firstCate, subCate, rankingList[firstCate][subCate].pageNum, rankingList[firstCate][subCate].isLast)}
                  >
                    {
                      this.state.loading ? 
                      <Loading />
                      :
                      <List
                        list = {rankingList[firstCate][subCate]}
                      />
                    }
                    
                  </ScrollView>
              </SwiperItem>
              )
            })
          }
          

        </Swiper>
      </View>
    )
  }
}

export default Ranking