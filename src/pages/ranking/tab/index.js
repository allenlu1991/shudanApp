import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class Tab extends Component {
  static defaultProps = {
    list: [],
    onChange: () => {}
  }

  handleClick = (index) => {
    this.props.onTabChange(index)
  }

  render () {
    let { list, current } = this.props
    current = parseInt(current)
    
    // XXX 暂未实现 tab item 与内容区域的同步滚动
    return (
      // <ScrollView
      //   scrollX
      //   className='cate-sub-tab'
      // >
      //   {list.map((item, index) => (
      //     <View
      //       key={item.id}
      //       className='ranking-sub-tab-item'
      //       onClick={this.handleClick.bind(this, index)}
      //     >
      //       <Text className='ranking-sub-tab-item-txt'>{item.name}</Text>
      //       {index === current &&
      //         <View className='ranking-sub-tab-item-line' />
      //       }
      //     </View>
      //   ))}
      // </ScrollView>
      <View
        className='ranking-sub-tab'
      >
        {list.map((item, index) => (
          <View
            taroKey={index}
            className='ranking-sub-tab-item'
            onClick={this.handleClick.bind(this, index)}
          >
            <Text className={classNames('ranking-sub-tab-item-txt', index === current && 'ranking-sub-tab-item-txt-active')}>{item.name}</Text>
            {index === current &&
            <View className='ranking-sub-tab-item-line' />
            }
          </View>
        ))}
        

        {/* <View
          className='ranking-sub-tab-item'
          onClick={this.handleClick.bind(this, 'male')}
        >
            <Text className='ranking-sub-tab-item-txt-active'>男生</Text>
            <View className='ranking-sub-tab-item-line' />
        </View>

        <View
          className='ranking-sub-tab-item'
          onClick={this.handleClick.bind(this, 'male')}
        >
            <Text className='ranking-sub-tab-item-txt'>女生</Text>
        </View>
        
        <View
          className='ranking-sub-tab-item'
          onClick={this.handleClick.bind(this, 'male')}
        >
            <Text className='ranking-sub-tab-item-txt'>百度榜</Text>
        </View> */}

      </View>
    )
  }
}
