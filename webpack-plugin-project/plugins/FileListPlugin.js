class FileListPlugin{
    constructor({filename}){
        this.filename = filename
    }
    apply(compiler){
        // 文件已经准备好了，要准备发射
        //emit
        compiler.hooks.emit.tap('FileListPlugin',(compilcation)=>{
            // compilcation.assets(存放打包之后的资源)
            let assets =compilcation.assets
            let content = `## 文件名      资源大小\r\n`
            // 对象变成数组循环
            //循环数组 [[bundle.js,{}],[index,html,{}]]
            Object.entries(assets).forEach(([filename,statobj])=>{
                content +=`-${filename}    ${statobj.size()}\r\n`
            })
            //资源对象
            assets[this.filename] = {//在打包之后直接创建文件
                source(){// 一个文件由source和size两个方法实现
                    return content
                },
                size(){
                    return content.length
                }
            }
        })
    }
}
module.exports = FileListPlugin