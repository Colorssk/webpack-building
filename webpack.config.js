let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let auto//自动添加前缀,他的loader是postcss-loader->需要postcss config配置文件，加载时候的规则，所以放在规则中
// console.log(path.resolve('dist'))
let OptimizeCss = require('optimize-css-assets-webpack-plugin')// css压缩之后js就不会压缩了，需要用unglify插件压缩js
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let CleanWebpackPlugin = require('clean-Webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')
let Happypack = require('happypack');
// 假如这里有一个插件
class P{
    apply(compiler){// 插件有一个apply方法,能到到compiler中一些钩子
        compiler.hooks.afterPlugins.tap('emit',function(){//注册钩子，然后在ym-pack中需要执行（call）
            console.log('emit')
        })
    }
}
module.exports= {
    optimize:{//优化项
        minimize:[
            new UglifyJsPlugin({
                cache: true,
                parallel: true,// 是否是并发打包
                sourceMap: true// 当es6编程es5的需要这种源码映射
            }),
            new OptimizeCss()
        ],
        // 分割代码块  entry配置完后这里也要配置
        splitChunks:{
            cacheGroups:{//缓存
                common:{// 公共模块
                    chunks: 'initial',
                    minSize:0,//大小大于就要提取
                    mimChunks:1//大于使用次数提取
                },
                vendor:{// 第三方库的抽离
                    priority:1,//设置权重，理论上是从上往下执行的
                    test:/node_modules/,
                    chunks: 'initial',
                    minSize:0,//大小大于就要提取
                    mimChunks:1//大于使用次数提取
                }
            }
        }
            
       
    },
    devServer:{// 开发服务器的配置
        port:3000,
        hot:true,//热更新
        open:true,
        progress:true,
        contentBase: './build',// 指向那个目录作为静态服务
        compress:true,
        // proxy:{// 方法一
        //     '/api':{
        //         target:'http:/localhost:3000/',
        //         pathRewrite:{'/api':''}
        //     }
        // }，
        // 方法二，在启动服务之前的钩子函数中操作,适用前端模拟数据
        // before(app){// 所以可以直接拿server中的代码
        //     app.get('/user',(req,res)=>{// 此时前端也就只是/user
        //         res.json({name:'aa'})
        //     })
        // },
        //方法三： 有服务端，不用代理处理，在服务端启动webpack,端口用服务端端口，统一一个端口，server.js需要改动
    },
    mode:'production',
    // entry: './src/index.js',
    entry:{
        index:'./src/index.js',// 多入口，当在抽离模块的时候用到
        other:'./src/other.js'// 比如这两个入口中都用到a.js和b.js
    },
    watch:true,//监控代码是否发生变化
    watchOptions:{// 监控的选项
        pool:1000,// 每秒问我1000次
        aggregateTimeout: 500,//防抖，500ms在更新
        ignored:/node_modules/
    },
    output:{
        // filename: 'bundle.[hash:8]js',//加上hash防止缓存的问题，会有覆盖
        //多个入口所以输出名字要不同
        filename:'[name].js',//当在抽离模块的时候用到
        path: path.resolve(__dirname,'build')// 路径必须是个绝对路径,可以把相对路径写成绝对路径,表示以当前目录(__dirname)产生的dist目录的绝对路径
        //publicPath:'http://xxx.xxx.com/'// 加上这个以后会在有资源的时候给打包后的资源（js,img,css）统一加上路径(在index.html就可以查看到变化),适合当需要访问cdn的资源的时候统一加上cdn域名
        //弊端这个是统一加上地址的，假如只要设置图片，就需要在图片的加载器中单独加上publicPath
    },
    resolve:{// 解析第三方包
        modules:[// 指定在哪里查找
            path.resolve('node_modules'),
            path.resolve('dist')
        ],
        // alias:{// 设置别名，列入当要引入(index.js中)import 'bootstrao/dist/css/bootstrap.css'
        //     bootstrap: 'bootstrao/dist/css/bootstrap.css'
        // },
        // 或者指定查找的入口字段，比如上面默认查找的是第三方插件中main字段(package.json中)，而需要引入css的时候需要其他字段，比如bootstrap中的样式style字段
        // mainFields:[
        //     'style',// 找不到的话是下一个字段
        //     'main'
        // ],
        // 或者指定入口文件的名字
        // mainFiles:[
        // ]
        // 省略import的文件类型，这里申明一下查找的拓展名
        extensions:[
            '.js',// 找不到再找下一个拓展名
            '.css',
            '.json'
        ]
    },
    plugins: [
        // 自己写的插件
        new P(),
        // 热跟新的两个插件
        new webpack.NamedModulesPlugin(),//具体哪个模块更新
        new webpack.HotModuleReplacementPlugin(),
        new Happypack({
            id:'css',
            use:['style-loader','css-loader']
        }),
        new Happypack({
            id:'js',
            use:[{
                loader:'babel-loader',
                options:[
                    '@babel/preset-env',
                    '@babel/preset-react'
                ]
            }]
        }),
        // 引用动态链接库
        new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'dist','manifest.json')//指定查找清单
        }),
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),//表示当从moment中引入locale的时候就忽略掉，换成手动引入
        new webpack.DefinePlugin({// webpack自带插件
            DEV:"'dev'",// 等同于JSON.stringify('dev'),给dev字符串加上双引号，是字符串
            FLAG:'true'//此时flag就是boolean类型
        }),
        new webpack.BannerPlugin('colorssk'),// 打包的文件加上开头注释
        new CopyWebpackPlugin([{
            from:'./doc',
            to:'./'// 不需要指定，默认dist
        }]),
        new CleanWebpackPlugin('./dist'),// 清除文件夹
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename:'index.html',// 打包后的文件名字
            minify:{
                removeAttributeQuotes:true,
                collapseWhitespace:true//生成一行
            },//生产环境压缩html,删除双引号
            hash:true//打包之后插入html的脚本名字是个hash戳
        }),
        new MiniCssExtractPlugin({//抽离样式，根据依赖最后放在一个link中,这种抽离的样式也可以写多个
            filename: 'css/main.css'// 这个插件用在规则中，指定在加载css文件之后loader插件做抽离      
        }),// 上面filename特别指定加入的目录
        // new webpack.ProvidePlugin({// 在每个模块中都注入$
        //     '$': jquery//但此时window.$是undefined的
        // })// 方法三在页面中引入第三方的路径： 在index.html中导入标签<script>,可以拿到window下面的$
    ],
    // 比如引入jquery的三种方式用了其中一种，防止js脚本中import $ from 'jquery',造成二次打包，所以配置打包排除在外的模块
    externals:{
        jquery: "$"
    },
    module:{ //处理模块,可以在跑的时候自动打包到模块中，不需要手动写入html模版
        noParse: /jquery/,//不去解析jquery中依赖库
        //loder
        rules:[
            {// 解析html中图片的地址
                test: /\.html$/,
                use:'html-withimg-loader'
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use:'file-loader'// 一般不用这个，而是用url-loader,
              
            // },
            {
                test: /\.(png|jpg|gif)$/,
                use:{// 一般不用这个，而是用url-loader,当图片小于某个尺寸的时候用base64来转化,否则采用file-loader
                    loader: 'url-loader',
                    options:{
                        limit: 200*1024,// 当url小于200k的时候用url-loader否则用file-loader
                        outputPath: '/img/',// 想要输出的图片特别放在某个路径
                        publicPath: ''// 给这个资源单独加上了资源路径的前缀
                    }
                }
              
            },
            // {//配置内联loader
            //     test: require.resolve('jquery'),//表示脚本中引用到jquery中的文件
            //     use: 'expose-loader?$'// 此时js中不需要import $ from 'jquery'就可以访问到window.$
            // },
            {// eslit校验
                test: /\.js$/,
                use:{
                    loader: 'eslint-loader',
                    options: {
                        enforce: 'pre'// 强制使这个模块执行，其他没加这个参数的都是normal
                    }
                },
            },
            //多线程打包的时候用到happypack
            {
                test:/\.js$/,
                exclude:/node_modules/,
                include:path.resolve('src'),
                use:'Happypack/loader?id=js'// 标注使用做js打包的进程

            },
            // 分模块打包css
            {
                test:/\.css$/,
                exclude:/node_modules/,
                include:path.resolve('src'),
                use:'Happypack/loader?id=css'// 标注使用做css打包的进程

            },
            {
                test:/\.js$/,
                use:{
                    loader: 'babel-loader',
                    options:{//用babel-loader需要把es6转化为es5
                        presets:[//这是大插件的集合
                            'babel/preset-env'// 具体调用的转es5的模块
                        ],
                        plugins:[//小插件 run dev 没问题
                            // 装饰器 @
                            ["@babel/plugin-proposal-decorators",{"legacy":true}],
                            ["@babel/plugin-proposal-class-properties",{"loose":true}],
                            ["@babel/plugin-transform-runtime"]//适用转换es高级用法,听同事抽离公共的class
                            ['@babel/plugin/-syntax-dynamic-import']
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude:/node_modules///排除查找的范围
            },
            //规则，css-loader 解析 @import 这种语法的
            //style-loader是把css插入head中
            //执行顺序 ，从右到左，从下到上，单指一个插件
            // loader的特点 ，单一
            // loder 可以写成对象，可以传参数，比如指定插入head的位置
            // {test:/\.css$/,use:['style-loader','css-loader']}
            {
                test:/\.css$/,
                use:[
                    // {
                    //     loader:'style-loader',
                    //     options:{
                    //         insertAt: 'top'
                    //     }
                    // }
                    MiniCssExtractPlugin.loader
                ,'css-loader'
                ,'postcss-loader'
            ]},
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader
                ,'css-loader'
                ,'postcss-loader'
                ,'less-loader'
            ]},
            // 使用自己开发的loader
            {
                test:'/\.less$/',
                use:[
                    path.resolve(__dirname,'loader','style-loader'),
                    path.resolve(__dirname,'loader','less-loader')
                ]
            }
            
        ]

    }
}




// 多入口：
// let path  = require('path');
// let HtmlWebpackPlugin = require('html-webpack-plugin');
//  module.exports = {
//      mode:'development',
//      entry: {
//          home: './src/index.js',
//          other: './src.other.js'
//      },
//      output: {
//          //[name] 代表home ,或者other
//         filename: '[name].[hash]js',
//         path:path.resolve(__dirname,'dist')
//      },
//      plugins:[
//          new HtmlWebpackPlugin({
//              template: './index.html',// index.html需要自己新建一个，作为打包html的模版，生成以后会放到dist目录的
//              filename:'home.html',
//              chunks:['home']// 表示代码块这里放置home(html插入的打包生成的js)
//          }),
//          new HtmlWebpackPlugin({
//             template: './index.html',
//             filename:'other.html',
//             chunks:['other']//可以选定需要放置的代码块
//         })
//      ]
//  }