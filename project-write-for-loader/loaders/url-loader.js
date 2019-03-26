let loaderUtils = require('loader-utils')
let mime = require('mime')
function loader(source){
    let {limit} = loaderUtils.getOptions(this)
    if(limit&&limit> source.length){
        return `moudle.exports="data:${mime.getType(this.resourcePath)};// 返回base64路径
        base64,${source.toString('base64')}"`
    } else {// 如果不需要转成base64
        return require('./file-loader').call(this,source)
    }

}   
module.exports = loader