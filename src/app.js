import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/search/search',
      'pages/reader/reader',
      'pages/book-info/book-info',
      'pages/my/my',
      'pages/search-book/search-book',
      'pages/my-info/my-info',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '书单查查',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#94A0AE",
      selectedColor: "#F42423",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/search/search",
        iconPath: "./assets/tab-bar/search.png",
        selectedIconPath: "./assets/tab-bar/search-active.png",
        text: "搜索"
      }, {
        pagePath: "pages/my/my",
        iconPath: "./assets/tab-bar/my.png",
        selectedIconPath: "./assets/tab-bar/my-active.png",
        text: "我的"
      }]
    }

  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
