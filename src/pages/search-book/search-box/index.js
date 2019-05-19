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
        focus: false
      })
      this.searchByWd(wd)
    }
  }

  searchByWd(wd) {
    this.props.onSearchLoading({
      loading: true
    })

    this.props.dispatchSearchBook({
      wd,
    }).then((res)=>{
      this.props.onSearchLoading({
        wd,
        loading: false
      })
    })
  }

  searchHandle(e) {
    let inputValue = e.target.value;
    this.searchByWd(inputValue)
  }

  changeHandle(e) {
    let inputValue = e.target.value;
    if(!!inputValue) {
      this.setState({
        cancle: true,
        inputValue
      })
    }else {
      this.setState({
        cancle: false,
        inputValue
      })
    }
  }

  clearInput() {
    this.setState({
      cancle: false,
      inputValue: '',
      focus: true,
    })
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
