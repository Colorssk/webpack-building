 let path  = require('path')
 let DonePlugin = require('./plugins/DonePlugin')
 let HtmlPlugin = require('html-webpack-plugin')
 let FileListPlugin = require('./plugins/FileListPlugin')
module.exports = {
    // mode:'development',
    entry: './src/index.js',
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlPlugin({
            template: './src/index.html'
        }),
        new DonePlugin(),
        new FileListPlugin({
            filename:'list.md'
        })
    ]
}