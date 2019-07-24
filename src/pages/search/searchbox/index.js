import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Form, Button } from '@tarojs/components'
import './index.scss'
import searchBoxIcon from '@assets/search/search-box-icon.png'
import formSubmitHandle from '@utils/formidHandle'

export default class SearchBox extends Component {

  handleSearchClick() {
    Taro.navigateTo({
      url: '/pages/search-book/search-book'
    })
  }

  render () {
    return (
      // <Form report-submit onSubmit={(e)=>formSubmitHandle(e)}>
        <Button className='search-box-home' form-type="submit" onClick={this.handleSearchClick.bind(this)}>
          <Text className='search-box-home-text'>输入书名或作者</Text>
          <Image className='search-box-home-icon' src={searchBoxIcon}></Image>
        </Button>
      // </Form>
    )
  }
}
