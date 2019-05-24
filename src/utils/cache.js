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
export function getBookRecordCache() {
    let cachekey = 'bookShelfData'
    let bookShelfData = Taro.getStorageSync(cachekey)
    if(!bookShelfData){
        bookShelfData = []
    }
    return bookShelfData
}

/**
 * 设置记录信息
 * @param {*} key
 * @param {*} data
 */
export function setBookRecordCache(oneRecord) {
    let cachekey = 'bookShelfData'
    let bookShelfData = Taro.getStorageSync(cachekey)
    if(!bookShelfData){
        bookShelfData = []
    }

    let index;
    bookShelfData.forEach((item, i) => {
        if(item.url == oneRecord.url){
            index = i
        }
    })
    
    if(index !== undefined) { //如果存在，则删除元素
        bookShelfData.splice(index, 1)
    }

    bookShelfData.unshift(oneRecord)

    Taro.setStorageSync(cachekey, bookShelfData)

    return bookShelfData
}