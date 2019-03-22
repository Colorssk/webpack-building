function loader(source){// 参数就是源代码
    console.log('loader3~~')// 下面写了pitch这里就表示normal
    return source// 最后一个loader需要返回一个js脚本
}
module.exports = laoder