import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class Menu extends Component {
  static defaultProps = {
    list: []
  }

  handleClick = (index) => {
    this.props.onSubMenuChange(index)
  }

  render () {
    let { current, list } = this.props
    current = parseInt(current)

    return (
      <View className='ranking-menu'>

      {list.map((item, index) => (
        <View
          className={classNames('ranking-menu__item', current === index && 'ranking-menu__item--active')}
          taroKey={index}
          onClick={this.handleClick.bind(this, index)}
        >
          <View
            className={classNames('ranking-menu__item-container', current === index && 'ranking-menu__item-container--active')}
          >
            <Text
              className={classNames('ranking-menu__item-name', current === index && 'ranking-menu__item-name--active')}
            >
              {item.name}
            </Text>
          </View>
        </View>
      ))}

        

        {/* <View
          className={classNames('ranking-menu__item', 'ranking-menu__item--active')}
        >
          <View
            className={classNames('ranking-menu__item-container', 'ranking-menu__item-container--active')}
          >
            <Text
              className={classNames('ranking-menu__item-name', 'ranking-menu__item-name--active')}
            >
              分类榜单
            </Text>
          </View>
        </View>

        <View
          className={classNames('ranking-menu__item')}
        >
          <View
            className={classNames('ranking-menu__item-container')}
          >
            <Text
              className={classNames('ranking-menu__item-name')}
            >
              分类3
            </Text>
          </View>
        </View> */}


        
      </View>
    )
  }
}
