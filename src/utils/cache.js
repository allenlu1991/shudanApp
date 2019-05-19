import Taro from '@tarojs/taro'
/**
 * 获取书籍信息
 * @param {*} bookKey
 */
export function getBookInfo(bookKey) {
    return Taro.getStorageSync(bookKey)
}

/**
 * 存储书籍信息
 * @param {*} bookKey
 * @param {*} bookInfoData
 */
export function setBookInfo(bookKey, bookInfoData) {
    Taro.setStorageSync(bookKey, bookInfoData)
}

/**
 * 获取内容信息
 * @param {*} contentKey
 */
export function getContentInfo(contentKey) {
    return Taro.getStorageSync(contentKey)
}

/**
 * 设置内容信息
 * @param {*} contentKey
 * @param {*} contentData
 */
export function setContentInfo(contentKey, contentData) {
    Taro.setStorageSync(contentKey, contentData)
}