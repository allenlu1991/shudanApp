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

/**
 * 获取记录信息
 * @param {*} key
 */
export function getBookRecord(key) {
    return Taro.getStorageSync(key)
}

/**
 * 设置记录信息
 * @param {*} key
 * @param {*} data
 */
export function setBookRecord(key, data) {
    Taro.setStorageSync(key, data)
}