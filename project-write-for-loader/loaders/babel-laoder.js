let babel = require('@babel/core')
let loaderUtils = require('loader-utils')
function loader(source) {//首先要拿到预设然后先用预设转化代码
    // console.log(Object.keys(this))
    let options = loaderUtils.getOptions(this)// this -> loader的上下文,获取到了webpack中的options(arr)
    let cb = this.async()// 上下文自带的async方法，如果有异步，这里cb就会获取到
    babel.transform(source,{
        // presets:options.presets// 需要选择的参数
        ...options,
        sourceMap: true,
        filename:this.resourcePath.split('/').pop()//文件名 this.resourcePath,代表编译的文件的绝对路径
    },function(err,result){
        cb(err,result.code,result.map)//result.code表示编译出来的代码，比如这里的es6编译出来的es5,result.map表示sourceMap(同时webpack也要配置sourceMap)
    })
    return source
}
module.exports = loader