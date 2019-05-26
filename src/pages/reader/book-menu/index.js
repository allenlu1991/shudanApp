import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'

export default class BookMenu extends Component {

  showChapters() {
    this.props.onShowChapters()
  }

  nextChapter() {
    this.props.onNextChapter()
  }

  preChapter() {
    this.props.onPreChapter()
  }

  changeReadMode(mode) {
    this.props.onChangeReadMode(mode)
  }

  incSize() {
    this.props.onIncSize()
  }

  decSize() {
    this.props.onDecSize()
  }

  goBackHome() {
    Taro.switchTab({
      url: '/pages/search/search'
    })
  }

  checkSite() {
    Taro.showModal({
      title: '书籍源地址',
      content: '内容来自\r\n' + this.props.url + '\r\n书单查查不储存任何内容',
      confirmText: '复制链接',
    }).then((res)=>{
      if(res.confirm) {
        Taro.setClipboardData({
          data: this.props.url,
        })
      }
    })
  }

  render () {
    const {readMode} = this.props
    
    let sideBarStyle, menuBarStyel

    if(this.props.appear == true) {
      sideBarStyle = 'book-menu-sidebar move_appear_right'
      menuBarStyel = 'book-menu-bar move_appear'
    } else if(this.props.appear == false){
      sideBarStyle = 'book-menu-sidebar move_disappear_right'
      menuBarStyel = 'book-menu-bar move_disappear'
    } else {
      sideBarStyle = menuBarStyel = 'displaynone'
    }

    let normalActive = ''
    let nightActive = ''
    let eyecareActive = ''
    switch (readMode) {
      case 'normal':
        normalActive = 'style-mode-active'
        break
      case 'night':
        nightActive = 'style-mode-active'
        break
      case 'eyecare':
        eyecareActive = 'style-mode-active'
        break
      default:
        normalActive = 'style-mode-active'
        break;
    }

    return (
      <View className='book-menu'>
        <View className={sideBarStyle}>
          <Button className='book-menu-sidebar-share' open-type="share">分享书籍</Button>
          <View className='book-menu-sidebar-site' onClick={this.checkSite.bind(this)}>查看源址</View>
          <View className='book-menu-sidebar-home' onClick={this.goBackHome.bind(this)}>返回首页</View>
        </View>

        <View className={menuBarStyel}>
          <View className='book-menu-bar-title'>{this.props.title}</View>
          <View className='book-menu-bar-chapters'>
            <View className='book-menu-bar-chapters-pre' onClick={this.preChapter.bind(this)}>上一章</View>
            <View className='book-menu-bar-chapters-link' onClick={this.showChapters.bind(this)}>目录</View>
            <View className='book-menu-bar-chapters-next' onClick={this.nextChapter.bind(this)}>下一章</View>
          </View>
          <View className='book-menu-bar-style'>
            <View className='book-menu-bar-style-font'>
              <View className='book-menu-bar-style-font-small' onClick={this.decSize.bind(this)}>Aa-</View>
              <View className='book-menu-bar-style-font-large' onClick={this.incSize.bind(this)}>Aa+</View>
            </View>
            <View className='book-menu-bar-style-mode'>
              <View className={`book-menu-bar-style-mode-normal ${normalActive}`} onClick={this.changeReadMode.bind(this,'normal')}></View>
              <View className={`book-menu-bar-style-mode-night ${nightActive}`} onClick={this.changeReadMode.bind(this,'night')}></View>
              <View className={`book-menu-bar-style-mode-eyecare ${eyecareActive}`} onClick={this.changeReadMode.bind(this,'eyecare')}></View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
