import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './content.scss'

import * as actions from '@actions/content'

@connect(state => state.content, { ...actions })
class Content extends Component {
  config = {
    navigationBarTitleText: ''
  }

  state = {
    loading: false,
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillMount() {
    Taro.showLoading({
      title: '拼命加载中...'
    })
    this.setState({
      loading: true
    })
    this.props.dispatchAgreementContent({
      name: this.$router.params.name
    }).then((res)=>{
      Taro.hideLoading()

      this.setState({
        loading: false
      })
    })
  }

  componentDidMount() {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let title, body
    if(JSON.stringify(this.props.content) != "{}") {
      title = this.props.content.title
      body = this.props.content.body

      Taro.setNavigationBarTitle({
        title,
      })
    }

    return (
      <View className='content'>
        {
          !this.state.loading &&
          <Text>
            {body}
          </Text>
        }
      </View>
    )
  }
}

export default Content