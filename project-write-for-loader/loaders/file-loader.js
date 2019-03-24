let loaderUtils = require('loader-utils')
function loader(source){
    let filename = loaderUtils.interpolateName(this,'[hash].[ext]',{content:source})// 根据第三个参数，以第二个参数的格式生成图片路径
    this.emitFile(filename,source)// 发射文件，名字和具体文件
    return `module.exports="${filename}"`// 替代 import p from './img.jpg'后面的路径
}
loader.raw = true// 把源码改成二进制传进来
module.exports = loader
