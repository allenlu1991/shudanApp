import Taro, { Component } from '@tarojs/taro'
import { View, Input, Text, Image } from '@tarojs/components'
import './index.scss'
import boxIcon from '@assets/search-book/search-book-box-icon.png'
import boxCancle from '@assets/search-book/search-book-box-cancle.png'

export default class SearchBox extends Component {
  state = {
    cancle: false,
    inputValue: '',
    focus: true,
  }

  componentDidMount() {
    const {wd} = this.props
    if(!!wd) {
      this.setState({
        inputValue: wd,
        focus: false,
        cancle: true,
      })
      this.searchByWd(wd)
    }
  }

  searchByWd(wd) {
    if(!wd) {
      Taro.showToast({
        title: '搜索不能为空哦~',
        icon: 'none',
        duration: 2000,
      })

      return
    }

    this.props.onSearchLoading({
      wd,
      loading: true
    })

    this.props.dispatchSearchBook({
      wd,
    }).then((res)=>{
      this.props.onSearchLoading({
        wd,
        loading: false,
        searched: true,
      })
    })
  }

  searchHandle(e) {
    let inputValue = e.target.value;
    this.searchByWd(inputValue)
  }

  changeHandle(e) {
    let inputValue = e.target.value
    this.changeInputValue(inputValue)
  }
  
  changeInputValue(value) {
    this.props.onSearchLoading({
      wd: value,
    })

    if(!!value) {
      this.setState({
        cancle: true,
        inputValue: value,
        focus: true,
      })
    } else {
      this.setState({
        cancle: false,
        inputValue: value,
        focus: true,
      })
    }
  }

  clearInput() {
    this.changeInputValue('')
  }

  blurHandle() {
    this.setState({
      focus: false,
    })
  }

  render () {
    return (

      <View className='search-box'>
        <View className='search-box-container'>
          <View className='search-box-content'>
              <Image className='search-box-content-icon' src={boxIcon}></Image>
              <Input ref={(input) => this.input = input} confirmType='search' value={this.state.inputValue} onConfirm={this.searchHandle.bind(this)} onBlur={this.blurHandle.bind(this)} onInput={this.changeHandle.bind(this)} className='search-box-content-input' type='text' placeholder='请输入书名或作者名' focus={this.state.focus} placeholderClass='search-box-content-input-placeholder'/>
          </View>
          {
            this.state.cancle && <Image onClick={this.clearInput.bind(this)} className='search-box-cancle' src={boxCancle}></Image>
          }
        </View>
      </View>
    )
  }
}
