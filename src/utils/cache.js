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

    //最多保留30本小说记录
    if(bookShelfData.length > 30) {
        bookShelfData.pop()
    }

    Taro.setStorageSync(cachekey, bookShelfData)

    return bookShelfData
}

/**
 * 获取搜索记录
 * @param {*} key
 */
export function getSearchRecord() {
    let cachekey = 'searchRecord'
    let searchRecord = Taro.getStorageSync(cachekey)
    if(!searchRecord){
        searchRecord = []
    }
    return searchRecord
}

/**
 * 设置搜索记录
 * @param {*} key
 * @param {*} data
 */
export function setSearchRecord(data) {
    let cachekey = 'searchRecord'
    let searchRecord = Taro.getStorageSync(cachekey)
    if(!searchRecord){
        searchRecord = []
    }

    let index = searchRecord.indexOf(data)
    if(index > -1) { //存在则删除
        searchRecord.splice(index, 1)
    }

    searchRecord.unshift(data)

    if(searchRecord.length > 10) {
        searchRecord.pop()
    }

    Taro.setStorageSync(cachekey, searchRecord)

    return searchRecord
}

/**
 * 设置搜索记录
 * @param {*} key
 * @param {*} data
 */
export function clearSearchRecord() {
    let cachekey = 'searchRecord'
    let searchRecord = []

    Taro.setStorageSync(cachekey, searchRecord)
    return searchRecord
}