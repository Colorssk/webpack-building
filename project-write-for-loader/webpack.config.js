let path = require('path')
module.exports={
    mode:'development',
    entry:'./src/index.js',
    output:{
        filname:'build.js',
        path:path.resolve(__dirname,'dist')
    },
    watch:true,
    resolveLoader:{
        // 配置别名下面直接写'loader1'
        // alias:{
        //     loader1:path.resolve(__dirname,'loaders','loader1.js')
        // }
        modules:['node_modules',path.resolve(__dirname,'loaders')]// 此时下面加载的模块就会自己根据这里的配置去相应的父目录查找
    },
    devtool:'source-map',
    module:{
        rules:[
            // loader默认的分类： pre在前面的，中间的normal,再是inline再是post 在后面的
            // {
            //     test:'/\.js$/',
            //     use:['loader3','loader2','loader1']// 用自己写的loader
            // }
            // {
            //     test:'/\.js$/',
            //     use:{
            //         loader:'loader1'
            //     },
            //     enforce: 'pre'
            // },
            // {
            //     test:'/\.js$/',
            //     use:{
            //         loader:'loader2'
            //     },
            //     enforce:'normal'
            // },
            // {
            //     test:'/\.js$/',
            //     use:{
            //         loader:'loader3'
            //     },
            //     enforce:'post'
            // },
            // {
            //     test:/\.js$/,
            //     user:{
            //         loader:'babel-loader',
            //         options:{
            //             presets:[// 使用loader之前先调用预设
            //                 '@babel/preset-env'
            //             ]
            //         }
            //     }
            // },
            // {
            //     test:/\.js$/,
            //     use:{// 注释loader
            //         loader:'banner-loader',
            //         options:{
            //             text:'Colorssk',
            //             filename:path.resolve(__dirname,'banner.js')
            //         }
            //     }
            // },
            // {
            //     test:/\.jpg$/,
            //     use:{
            //         // 目的： 根据图片生成一个md5.发射到dist目录，还会返回当前图片的图片路径
            //         // loader:'file-laoder'
            //         // url-loader
            //         use:{
            //             loader:'url-loader',
            //             options:{
            //                 limit:200*1024
            //             }

            //         },
            //     }
            // },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            }

        ]
    }
}