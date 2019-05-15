import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.scss'

import downloadedIcon from '@assets/components/chapters-selector/downloaded.png'

import { getWindowHeight } from '@utils/style'

let scrollViewHeight = getWindowHeight(false);

let scrollViewStyle = {
  height: scrollViewHeight + 'px' //这个px是不会被转成rpx的
}

export default class ChaptersSelector extends Component {

  render () {
    return (
      <View className='chapters-selector'>
        <ScrollView className='chapters-selector-box' scrollY style={scrollViewStyle} >
            <View className='chapters-selector-box-container'>
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text-selected'>第10章 你的身上，有一个凶兆！</Text>
                    <Image className='chapters-selector-box-item-icon' src={downloadedIcon}></Image>
                </View>
                <View className='chapters-selector-box-separator'></View>
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第11章 你的身上，有一个凶兆！</Text>
                    <Image className='chapters-selector-box-item-icon' src={downloadedIcon}></Image>
                </View>
                <View className='chapters-selector-box-separator'></View>
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第12章 你的身上，有一个凶兆！</Text>
                    <Image className='chapters-selector-box-item-icon' src={downloadedIcon}></Image>
                </View>
                <View className='chapters-selector-box-separator'></View>
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第13章 你的身上，有一个凶兆！</Text>
                    <Image className='chapters-selector-box-item-icon' src={downloadedIcon}></Image>
                </View>
                <View className='chapters-selector-box-separator'></View>
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>
                <View className='chapters-selector-box-separator'></View>
                <View className='chapters-selector-box-separator'></View>
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>
                <View className='chapters-selector-box-separator'></View>
                <View className='chapters-selector-box-separator'></View>
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>
                <View className='chapters-selector-box-separator'></View>
        
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>
                <View className='chapters-selector-box-separator'></View>
    
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>
                <View className='chapters-selector-box-separator'></View>

                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>
                <View className='chapters-selector-box-separator'></View>
    
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>
                <View className='chapters-selector-box-separator'></View>

                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>
                <View className='chapters-selector-box-separator'></View>
      
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>

                <View className='chapters-selector-box-separator'></View>
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>
                <View className='chapters-selector-box-separator'></View>
       
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>

                <View className='chapters-selector-box-separator'></View>
                <View className='chapters-selector-box-item'>
                    <Text className='chapters-selector-box-item-text'>第14章 你的身上，有一个凶兆！</Text>
                </View>
                <View className='chapters-selector-box-separator'></View>
            </View>
        </ScrollView>
        <View className='chapters-selector-mask' style={scrollViewStyle}></View>
      </View>
    )
  }
}
