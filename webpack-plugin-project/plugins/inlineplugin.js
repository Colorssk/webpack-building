// 例子：内联插件(作用把外链的标签 变成内联的标签)
const HtmlWebpackPlugin = require('html-webpack-plugin')
class Inlineplugin{
    constructor(match){
        this.reg = match
    }
    processTags(tag,compilation){
        let newTag,url
        if(tag.tagName == 'link' && this.reg.test(tag.attributes.href)){
            newTag = {
                tagName:'style',
                //自己加点属性
                attributes:{type:'text/css'}
            }
            url = tag.attributes.href// 比如 : main.css
        }
        if(tag.tagName == 'script' && this.reg.test(tag.attributes.src)){
            newTag = {
                tagName:'script',
                attributes:{type:'application/javascript'}
            }
            url = tag.attributes.src
        }
        if(url){
            newTag.innerHTML = compilation.assets[url].source()// 把内容放入标签中
            // 此时仅仅是串改了index.html,但是最后的打包文件也就是compilation资源中还是有main.css和index.js文件
            delete compilation.assets[url]//删除资源
            return newTag
        }
        return tag
        
    }
    processTags(data,compilation){// 处理引入标签的数据
        let headTags = []
        let bodyTags = []
        data.headTags.forEach(headTag=>{
            headTags.push(this.processTags(headTag,compilation))
        })
        data.bodyTags.forEach(bodyTag=>{
            bodyTags.push(this.processTags(bodyTag,compilation))
        })
        return {...data,headTags,bodyTags}
    }
    apply(compiler){
        //通过webpackPlugin来实现这个功能
        compiler.hooks.compilation.tap('Inlineplugin',compilation=>{
            // 基于compilation获取html-webpack的钩子
            //在发射之前
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterPlugin',(data,cb)=>{
                //html插件获取了发射前index.html有关资源
                // compilation.assets是发射之前的资源 data放入的是一个一个标签
                data = this.processTags(data,compilation)//目的:获取compilation.assets
                cb(null,data)
            })

        })
    }
}
module.exports = Inlineplugin