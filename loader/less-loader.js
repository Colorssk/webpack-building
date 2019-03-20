// 开发loader先要安装loader
// 测试在webapck.config.js中可以看见
let less = require('less')// 安装less模块，用作转代码
function loader(source){
 let css = ''
 less.render(source,function(err,c){// 转成less代码
    css = c.css
 })
 // 需要把\n转义
 css = css.replace(/\n/g,'\\n')
 return css
}
module.exports = loader