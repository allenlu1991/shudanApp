import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, Form } from '@tarojs/components'
import classNames from 'classnames'
import formSubmitHandle from '@utils/formidHandle'

import './index.scss'

export default class List extends Component {
  static defaultProps = {
    list: [],
    isCheck: false,
  }

  handleClick = (bookName) => {
    if(this.props.isCheck) {
      return
    }

    Taro.navigateTo({
      url: '/pages/search-book/search-book?wd=' + encodeURIComponent(bookName) + '&source=' + encodeURIComponent('ranking')
    })
  }

  render () {
    const { list } = this.props

    return (
      <View className='ranking-list'>

          {
            list && list.records && list.records.map((item, index) => {

              return (
              // <Form 
              //   report-submit 
              //   onSubmit={(e)=>{
              //     if(!this.props.isCheck) {
              //       formSubmitHandle(e)
              //     }
              //   }} 
              //   taroKey={index}
              // >
              // <Button className='formid-bttn' form-type="submit">
                <View className='ranking-list-item' onClick={this.handleClick.bind(this, item.bookName)} hoverClass='ranking-list-item-hover'>
                  <Image className='ranking-list-item-img' src={item.coverUrl}></Image>
                  <View className='ranking-list-item-wrap'>

                    <View className='ranking-list-item-wrap-container'>
                      <Text className='ranking-list-item-bookname'>{(index + 1) + '.' + item.bookName}</Text>

                      <Text className='ranking-list-item-abstract'>{item.abstract}</Text>

                      <View
                        className='ranking-list-item-wrap-lastline'
                      >
                        <Text className='ranking-list-item-author'>{item.author}</Text>

                        <View className='ranking-list-item-tags'>
                          {item.tags.map((tagItem, tagIndex) => (
                            <View className='ranking-list-item-tag' taroKey={tagIndex}>
                              <Text className='ranking-list-item-tag-text'>{tagItem}</Text>
                            </View>
                            )
                          )}
                        </View>
                        
                      </View>
                      
                    </View>

                    <View className='ranking-list-separator'></View>
                  </View>
                
                </View>
              // </Button>
              // </Form>
              )
            })
          }
      </View>
    )
  }
}
