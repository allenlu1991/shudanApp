import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import titleIcon from '@assets/search/title-icon.png'
import refreshIcon from '@assets/search/refresh-icon.png'

export default class HotWords extends Component {
  static defaultProps = {
    list: []
  }

  state = {
    n: 1,
    animation: ''
  }

  refreshAnimation = Taro.createAnimation({
    transformOrigin: "50% 50% 0",
    duration: 1500,
    timingFunction: "ease",
    delay: 0
  })

  searchBywords(words) {
    Taro.navigateTo({
      url: '/pages/search-book/search-book?wd=' + encodeURIComponent(words)
    })
  }

  handleRefreshClick = () => {
    this.refreshAnimation.rotate(360*this.state.n).step()

    this.setState({
      animation: this.refreshAnimation.export()
    })

    this.props.hotWordsRefresh({
      n: this.state.n + 1,
    })

    this.setState({
      n: this.state.n + 1
    })

  }

  render () {
    const { list } = this.props

    return (
      <View className='hot-words'>
        <View className='hot-words-head'>
          <View className='hot-words-head-title'>
            <Image className='hot-words-head-title-icon' src={titleIcon}></Image>
            <Text className='hot-words-head-title-text'>热门搜索</Text>
          </View>
          <View className='hot-words-head-refresh' onClick={this.handleRefreshClick.bind(this)}>
            <Text className='hot-words-head-refresh-text'>换一换</Text>
            <Image className='hot-words-head-refresh-icon' animation={this.state.animation} src={refreshIcon}></Image>
          </View>
        </View>
        <View className='hot-words-content'>
          {list.map((item, index) => {
            let numClass = 'hot-words-content-item-othernum'
            switch(index) {
              case 0:
                numClass = 'hot-words-content-item-firstnum'
                break
              case 1:
                numClass = 'hot-words-content-item-secondnum'
                break
              case 2:
                numClass = 'hot-words-content-item-thirdnum'
                break
              default:
                numClass = 'hot-words-content-item-othernum'
            }

            return (
              <View className='hot-words-content-item' taroKey={index} onClick={this.searchBywords.bind(this,item)}>
                <View className={numClass}>{index+1}</View>
                <View className='hot-words-content-item-text'>{item}</View>
              </View>
            )
            
          })}

          {/* <View className='hot-words-content-item'>
            <View className='hot-words-content-item-firstnum'>1</View>
            <View className='hot-words-content-item-text'>最强道士在都市</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-secondnum'>2</View>
            <View className='hot-words-content-item-text'>重生之都市仙尊</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-thirdnum'>3</View>
            <View className='hot-words-content-item-text'>校花的贴身高手</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-othernum'>4</View>
            <View className='hot-words-content-item-text'>超级兵王</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-othernum'>5</View>
            <View className='hot-words-content-item-text'>重生</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-othernum'>6</View>
            <View className='hot-words-content-item-text'>算死命</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-othernum'>7</View>
            <View className='hot-words-content-item-text'>系统</View>
          </View>
          <View className='hot-words-content-item'>
            <View className='hot-words-content-item-othernum'>8</View>
            <View className='hot-words-content-item-text'>全职房东</View>
          </View> */}
        </View>
      </View>
    )
  }
}
