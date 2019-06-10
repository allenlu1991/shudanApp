import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import classNames from 'classnames'
import formSubmitHandle from '@utils/formidHandle'

import './index.scss'

import bookIcon from '@assets/search/book.jpg'

export default class List extends Component {
  static defaultProps = {
    list: []
  }

  handleClick = (bookName) => {
    Taro.navigateTo({
      url: '/pages/search-book/search-book?wd=' + encodeURIComponent(bookName) + '&source=' + encodeURIComponent('ranking')
    })
  }

  render () {
    const { list } = this.props

    return (
      // <View className='cate-list'>
      //   {list.map(group => (
      //     <View key={group.id} className='cate-list__group'>
      //       {!!group.name &&
      //         <View className='cate-list__title'>
      //           <Text className='cate-list__title-txt'>{group.name}</Text>
      //         </View>
      //       }
      //       <View className='cate-list__wrap'>
      //         {group.categoryList.map((item, index) => (
      //           <View
      //             key={item.id}
      //             className={classNames('cate-list__item',
      //               { 'cate-list__item--right': (index + 1) % 3 === 0 }
      //             )}
      //             onClick={this.handleClick.bind(this, item)}
      //           >
      //             <Image className='cate-list__item-img' src={item.bannerUrl} />
      //             <View className='cate-list__item-txt-wrap'>
      //               <Text className='cate-list__item-txt'>{item.name}</Text>
      //             </View>
      //           </View>
      //         ))}
      //       </View>
      //     </View>
      //   ))}
      // </View>
      <View className='ranking-list'>

          {
            list && list.records && list.records.map((item, index) => {

              return (
              <Form report-submit onSubmit={(e)=>formSubmitHandle(e)} taroKey={index}>
              <Button className='formid-bttn' form-type="submit">
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
              </Button>
              </Form>
              )
            })
          }
          {/* <Form report-submit onSubmit={(e)=>formSubmitHandle(e)}>
          <Button className='formid-bttn' form-type="submit">
            <View className='ranking-list-item'>
              <Image className='ranking-list-item-img' src={bookIcon}></Image>
              <View className='ranking-list-item-wrap'>

                <View className='ranking-list-item-wrap-container'>
                  <Text className='ranking-list-item-bookname'>1.元尊</Text>

                  <Text className='ranking-list-item-abstract'>彼时的归途，已是一条命运倒悬的路昔日的荣华，如白云苍狗。彼时的归途，已是一条命运倒悬的路。昔日的荣华，如白云苍狗</Text>

                  <View
                    className='ranking-list-item-wrap-lastline'
                  >
                    <Text className='ranking-list-item-author'>天蚕土豆</Text>

                    <View className='ranking-list-item-tags'>
                      <View className='ranking-list-item-tag'>
                        <Text className='ranking-list-item-tag-text'>东方玄幻</Text>
                      </View>
                      <View className='ranking-list-item-tag'>
                        <Text className='ranking-list-item-tag-text'>男生</Text>
                      </View>
                    </View>
                    
                  </View>
                  
                </View>

                <View className='ranking-list-separator'></View>
              </View>
            
            </View>
          </Button>
          </Form> */}
      
      </View>
    )
  }
}
