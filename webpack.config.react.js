// 单独打包第三方库react
// 此时html中<script>要写
let path = require('path')
let webpack = require('webpack')
module.exports = {
    mode:'development',
    entry:{
        react:['react','react-dom']
    },
    output:{
        filename:'_dll__[name].js',
        path:path.resolve(__dirname,'dist'),
        library:'_dll_[name]',// 指定打包之后的js模块赋值给一个对象ab
        // libraryTarget:'var'// umd/commonjs（nodejs），指定打包之后成什么格式
    },
    plugins:[
        new webpack.DllPlugin(// 用webpack内置插件生成清单// name==library
        {
            name:'_dll_[name]',
            path:path.resolve(__dirname,'dist','manifest.json')// 去manifest里面查找
        }
            )
    ]
}