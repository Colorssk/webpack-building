let path = require('path')
module.exports={
    mode:'development',
    entry:'./src/index.js',
    output:{
        filname:'build.js',
        path:path.resolve(__dirname,'dist')
    },
    resolveLoader:{
        // 配置别名下面直接写'loader1'
        // alias:{
        //     loader1:path.resolve(__dirname,'loaders','loader1.js')
        // }
        modules:['node_modules',path.resolve(__dirname,'loaders')]// 此时下面加载的模块就会自己根据这里的配置去相应的父目录查找
    },
    module:{
        rules:[
            {
                test:'/\.js$/',
                use:'loader1'// 用自己写的loader
            }
        ]
    }
}