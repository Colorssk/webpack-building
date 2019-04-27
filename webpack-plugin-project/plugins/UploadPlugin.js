let path = require('path')
let qiniu  = require('qiniu')
class UploadPlugin{
    constructor(options){
        // 七牛apiwebpack章节51章
    }
    upload(filename){
        return new Promise((resolve,reject)=>{
            let localFile = path.resolve(__dirname,'../dist',filename)
            //文件上传api
        })
    }
    apply(compiler){
        compiler.hooks.afterEmit.tapPromise('UploadPlugin',(compilation)=>{
            let assets = compilation.assets
            let promises = []
            Object.keys(assets).forEach(filename=>{
                promises.push(this.upload(filename))
            })
            return Promise.all(promises)
        })
    }
}
moudule.exports = UploadPlugin