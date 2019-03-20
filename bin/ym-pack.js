#! /user/bin/env/ node
// 表示当前代码需要node环境
//然后执行npm link就是根据package.json的配置把这个包设置在全局上（(npm init)单独建一个bin然后在里面写个pack.js并且在根目录写个package.json配置bin）
// console.log('1123')
// 然后在另一个项目里面就可以npm link ym-pack就可以就可以使用ym-pack这个包了,然后就可以npx ym-pack
//作用一边写，一边在其他项目中可以测试这个ym-pack.js模块
// 可以找到当前执行名的路径， 拿到webpack.config.js(比如说其他项目在测试这个模块的时候，路径一些信息这里是可以获取的)
let path  = require('path')
// config配置文件
let config  = require(path.resolve('webpack.config.js'))// 获取当前运行目录
let Compiler = require('../lib/Compiler.js')// 新建lib文件夹专门存储源码
let compiler = new Compiler(config);
compiler.hooks.entryOptions.call()//入口选项插件，执行插件(webpack.config.js中注册的插件)中注册的事件
// 运行编译
compiler.run()