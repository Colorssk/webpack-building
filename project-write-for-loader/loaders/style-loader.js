let loaderUtils = require('loader-utils');
function loader(source){
    // 导出一个js合法脚本才会被执行
    let str =`
        let style = document.createElement('style');
        style.innerHtml = ${JSON.stringify(source)};
        document.head.appendChild(style)
    `
    return str
}
//  在style.loader上写了pitch
// style-loader less-loader css-loader
loader.pitch =  function(remainingRequest){  // 剩余的请求(请求的路径是绝对路径包含项目地址)
   // 让style-loader 去处理css-loader !less-loader!./index.less(看index.js)->导入行内loader
   //stringifyRequest 把路径转化为相对路径
   // 这里style-loader用了pitch所以 normal中require返回的是less-loader,css-loader返回的结果:
   // require('!!css-loader!less-loader!index-loader')// 此时只调用了style-loader的pitch
   let str =`
        let style = document.createElement('style');
        style.innerHtml = require(${loaderUtils.stringifyRequest(this,'!!'+remainingRequest)})
        document.head.appendChild(style)
    `
    return str
    // 此时build.js打包之后是js脚本：
    // let list = [] list.push('.....')... module.exports = list.join('')

}
// 注意:
// 如果定义的某个pitch有返回值则会跳过读取资源和自己的loader，上面的pitch-loader直接试用了行内loader指明loader执行方向
module.exports = loader

// stringify之后相当于
// style.innerHtml = "body{\r\n background:red; }"