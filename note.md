webpack默认打包查找node_modules中的服务bin下面webpack-cli再转到webpack中的bin下面的webapck.js
执行npx webpack
支持模块化
加入自定义webpack.config.js文件，则启动时候需要指定其配置文件
npx webpack --config webpack.config.ym.js
或者直接在package.json中配置脚本
输入webpack会自动去node_module中找这个命令
终端运行中 -- 后面表示参数，可以被认作字符串可以是npm run build -- --config webpack.config.ym.js
本地静态服务
npx webpack-dev-server
开发环境用了htmlwebpack之后自动把打包之后的文件放进目标模版中
生产环境中是npm run  build 仅仅是打包文件
开发环境无需babel-loader和#babel-core和@babel/preset-env把es6转化为es5
然后为了兼容类的写法安装插件： @babel/plugin-proposal-class-properties
有些高级语法比如generate或者promise这些语法需要安装  -
 -save-dev @babel/plugin-transform-runtime
 上线的时候也需要这个补丁所以需要安装 --save @babel/runtime
 比如用es7的语法比如： 'asbdasd'.includes('a')需要用补丁:install  @babel/polyfill 用： require('@babel/polyfill')  然后使用语法
 eslint用法，安装(install  eslint eslint-loader)；加入loader;
 在网址eslint.org/demo/下载配置，然后放在项目根目录下，文件名师.eslintrc.json

expose-loader -d暴露全局的loader比如 import $ from 'jquery'  console.log(window.$),用了以后就不会undefine了
普及知识点：上面的属于内联loader；
pre: 前面执行的loader  normal: 普通的loader   内联loader：后置postloader
内联loader可以在代码中引用loader，把loader暴露出去  例如： import $ from expose-loader?$!jquery（$表示暴露给的对象）
此时就可以在直接访问到window.$
上面的写法是卸载js中的，也可以写在webpack中作为loader加载


知识点：简单的说, 在 Node.js 中使用 fs 读取文件的时候, 经常碰到要拼一个文件的绝对路径的问题 (fs 处理相对路径均以进程执行目录为准). 之前一直的方法都是, 使用 path 模块以及 __dirname 变量 :

fs.readFileSync(path.join(__dirname, './assets/some-file.txt'));
使用 require.resolve 

可以简化这一过程:(__diename就是具体项目之前的完整路径)

fs.readFileSync(require.resolve('./assets/some-file.txt'));
此外, require.resolve 还会在拼接好路径之后检查该路径是否存在, 如果 resolve 的目标路径不存在, 就会抛出 Cannot find module './some-file.txt' 的异常. 省略了一道检查文件是否存在的工序 (fs.exists).

之前的内联loader的webpack配置支持访问可以用window.$
如果想要在每个模块都引入$(代表jquery,此时就不需要expose-loader),就要配置webpack  先require('webpack')


webpack打包图片
1：在js中创建图片来引用
import logo from './logo.png'
let image = new Image()
image.src=logo
document.body.appendchild('image')// 这里需要加载loader才能识别成地址
// 把图片引入，返回的结果是一个新的图片地址 但是也需要file-loader 默认会生成一张图片到build的目录下，在 webpack中配置
2: 在css中引入 backgroud('')  css-loader会直接把地址转化为require引入
3: html中直接<img src="">因为打包到build之后是找不到图片的所以需要 html-withimg-loader -d(可以帮助我们解析html), 需要在webpack中配置loader

知识点: 比如在js中引入了css文件，就相当于添加了样式(前提js被引入到了html中)

小插件：
1: cleanWebpackPlugin插件
2：copyWebpackPlugin
3: bannerPlugin内置插件(需要reqiure webpack)


配置webpack.base/prod/dev文件的时候需要下载webpack-merge插件
执行 npm run build -- --config webpack.dev.js  配置环境，打包的时候就可以区分了

webpack内置插件省略不需要的插件webpack.IgnorePlugin


多线程打包happypack


import require的用法差异

导出的是export default{

}
正常是直接import调用
例子： import test from './test.js'

 直接电泳test.sum()方法

但是也可以用require，因为es6打包的时候会默认放入default中
let test = require('./test.js')
test.default.sum() 
知识点： require进来的模块会对象内部的所有方法都打包，import只会帮你打包你用到的方法


js模块抽离，需要改动webpack.config.js中的entry

//es6中jsonp实现动态加载文件 需要插件：@babel/plugin/-syntax-dynamic-import,需要在webpack中配置
位置：在module加载loader中js模块中的一个小插件
import('./source.js').then(data=>{
   //获得data.default
})


可以检测热更新
if(module.hot){
    module.hot.accept('./source',()=>{
        .......
    })
}