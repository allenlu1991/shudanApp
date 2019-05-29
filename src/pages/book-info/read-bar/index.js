import Taro, { Component } from '@tarojs/taro'
import { View, Image,Button } from '@tarojs/components'
import './index.scss'
import formSubmitHandle from '@utils/formidHandle'

export default class ReadBar extends Component {
  readCurrent() {
    this.props.onReadCurrent()
  }

  render () {

    return (
      // <View className='read-bar'>
      <Form report-submit onSubmit={(e)=>formSubmitHandle(e)}>
      <Button className='read-bar' form-type="submit">
        <Button className='read-bar-share' open-type="share">分享书籍</Button>
        <View className='read-bar-read' onClick={this.readCurrent.bind(this)}>立即阅读</View>
      </Button>
      </Form>
      // </View>
    )
  }
}
