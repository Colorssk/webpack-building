function loader(source){
    let reg = /url\((.+?)\)/g
    let pos = 0;
    let current;
    let arr = ['let list = []']
    while (current = reg.exec(source)){  // current 匹配到的两个值[matchurl,g]第二个是分组
        let [matchUrl,g] = current//matchUrl是url('./public.jpg'); g是./public/jpg
        // 获取到截取字符串之前的索引
        let last  = reg.lastIndex - matchUrl.length
        arr.push(`list.push(${JSON.stringify(source.slice(pos,list))})`)
        let pos = lastIndex
        // 把g替换车成require的写法
        arr.push(`list.push('url('+require(${g})+')')`)
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)
    arr.push(`module.exports = list.join('')`)
    return arr.join('\r\n')// 然后交给style.loader处理
}
module.exports = loader