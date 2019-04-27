 let path  = require('path')
 let DonePlugin = require('./plugins/DonePlugin')
 let HtmlPlugin = require('html-webpack-plugin')
 let FileListPlugin = require('./plugins/FileListPlugin')
 let Inlineplugin = require('./plugins/inlineplugin')
 let UploadPlugin = require('./plugins/UploadPlugin')
module.exports = {
    // mode:'development',
    entry: './src/index.js',
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist'),
        //不设置publickpath就在index.html中只显示bundle.js，为了是直接用的线上js资源
        publicPath:''//七牛云域名（domain）
    },
    plugins:[
        new HtmlPlugin({
            template: './src/index.html'
        }),
        new DonePlugin(),
        new FileListPlugin({
            filename:'list.md'
        }),
        // new Inlineplugin({
        //     match:/\.(js|css)/
        // }),
        new UploadPlugin({
            bucket:'',// 七牛存储空间
            domain:'',// 七牛内容管理中的域名
            accessKey:'',// 个人面板中的秘钥管理
            secretKey:''
        })
    ]
}