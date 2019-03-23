let loaderUtils = require('loader-utils')
let validateOptions = require('schema-utils')
let fs = require('fs')
function loader(source){
    // this.cacheable(false)//打包的时候关掉缓存，表示每次都会重新打包
    this.cacheable && this.cacheable()// 不穿参数表示默认打包
    let options = loaderUtils.getOptions(this)
    let cb = this.async()
    let schema = {// 设置校验标准
        type:'object',
        properties:{
           text:{
                 type:'string'// 对应的text
           } ,
           filename:{
               type: 'string'
           }
        }
    }
    validateOptions(schema,options,'banner-loader')//到报错的时候会抛出最后一个参数字符串
    if(options.filename){
        this.addDependency(options.filename)// 加进依赖当这个loader依赖的文件变化的时候能够监听到实时打包
        fs.readFile(options.filename,'utf8',function(err,data){// 异步调用所以下面不能用return要用cb
            cb(err,`/**${data}**/${source}`)
        })
    }else{
        //cb也是一个异步所以可以并列调用
        cb(null,`/**${options.text}**/${source}`)

    }
    // return source
}
module.exports = loader