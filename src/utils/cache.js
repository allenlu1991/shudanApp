import Taro from '@tarojs/taro'

/**
 * 获取书籍信息
 * @param {*} urlKey 为url以md5方式加密后的字符串
 */
export function getUrlDataCache(urlKey) {
    return Taro.getStorageSync(urlKey)
}

/**
 * 获取书籍信息
 * @param {*} bookKey
 */
export function getBookInfoCache(bookKey) {
    return Taro.getStorageSync(bookKey)
}

/**
 * 存储书籍信息
 * @param {*} bookKey
 * @param {*} bookInfoData
 */
export function setBookInfoCache(bookKey, bookInfoData) {
    let bookDataKey = 'bookDataArr'

    let bookDataArr = Taro.getStorageSync(bookDataKey)
    if(!bookDataArr){
        bookDataArr = []
    }

    let index = bookDataArr.indexOf(bookKey)
    if(index > -1) { //存在则删除
        bookDataArr.splice(index, 1)
    }

    bookDataArr.unshift(bookKey) //在头部插入索引数据

    //最多缓存的书籍数量
    if(bookDataArr.length > 10) {
        let delBookKey = bookDataArr.pop() //删除数组中的索引
        Taro.removeStorageSync(delBookKey) //删除实际数据
    }

    if(index == -1) //不存在才写入
    {
        //必须留出2M的空间，保证必要的缓存空间以便支持软件运行
        let cacheInfo
        let cacheSpace = 2 //留出的缓存空间大小，单位为Mb
        while (true) {
            cacheInfo = Taro.getStorageInfoSync()
            if(cacheInfo.currentSize > cacheInfo.limitSize - 1024*cacheSpace) {
                //所有元素均删除了就退出，留出头部的元素（既下一个要插入的数据）
                if(bookDataArr.length <= 1) {
                    break
                }
                let delBookKey = bookDataArr.pop() //删除数组中的索引
                Taro.removeStorageSync(delBookKey) //删除实际数据
            } else {
                break
            }
        }

        Taro.setStorageSync(bookKey, bookInfoData) //写入实际数据（先删除后写入）
    }

    Taro.setStorageSync(bookDataKey, bookDataArr) //更新索引数据
}

/**
 * 获取内容信息
 * @param {*} contentKey
 */
export function getContentCache() {
    let contentDataKey = 'contentDataArr'
    return Taro.getStorageSync(contentDataKey)

}

/**
 * 设置内容信息
 * @param {*} contentKey
 * @param {*} contentData
 */
export function setContentCache(contentKey, contentData) {
    let contentDataKey = 'contentDataArr'

    let contentDataArr = Taro.getStorageSync(contentDataKey)
    if(!contentDataArr){
        contentDataArr = []
    }

    let index = contentDataArr.indexOf(contentKey)
    if(index > -1) { //存在则删除
        contentDataArr.splice(index, 1)
    }

    contentDataArr.unshift(contentKey) //在头部插入索引数据

    const maxContentNum = 200
    //最多缓存的内容数量
    if(contentDataArr.length >= maxContentNum) {
        let delContentKey = contentDataArr.pop() //删除数组中的索引
        Taro.removeStorageSync(delContentKey) //删除实际数据
    }

    if(index == -1) //不存在才写入
    {
        //必须留出2M的空间，保证必要的缓存空间以便支持软件运行
        let cacheInfo
        let cacheSpace = 2 //留出的缓存空间大小，单位为Mb
        while (true) {
            cacheInfo = Taro.getStorageInfoSync()
            if(cacheInfo.currentSize > cacheInfo.limitSize - 1024*cacheSpace) {
                //所有元素均删除了就退出，留出头部的元素（既下一个要插入的数据）
                if(contentDataArr.length <= 1) {
                    break
                }
                let delContentKey = contentDataArr.pop() //删除数组中的索引
                Taro.removeStorageSync(delContentKey) //删除实际数据
            } else {
                break
            }
        }

        Taro.setStorageSync(contentKey, contentData) //写入实际数据（先删除后写入）
    }

    Taro.setStorageSync(contentDataKey, contentDataArr) //更新索引数据
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

/**
 * 获取app设置
 * @param {*} optionsKey
 */
export function getAppOptionCache(optionKey) {
    return Taro.getStorageSync(optionKey)
}

/**
 * app设置
 * @param {*} optionsKey
 * @param {*} data
 */
export function setAppOptionCache(optionKey, data) {
    return Taro.setStorageSync(optionKey, data)
}