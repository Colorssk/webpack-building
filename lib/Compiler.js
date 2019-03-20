// 实现自己的webpack
let fs = require('fs')
let path = require('path')
let babylon = require('babylon');
let traverse = require('@babel/traverse').default
let t = require('@babel/types')
let generator = require('@babel/generator').default
let ejs = require('ejs')
// 增添一些钩子
// let tapable = require('tapable')
let {SyncHook} = require('tapable')
class Compiler{
    constructor(config){
        // config就是配置文件包含entry output
        this.config = config
        // 需要保存入口文件的路径
        this.entryId // './src/index.js'
        // 需要保存所有的模块依赖
        this.modules = {}
        this.entry = config.entry //入口路径
        // 工作路径
        this.root = process.cwd()
        // 钩子(申明周期)
        this.hooks = {
            entryOptions: new SyncHook(),
            compile: new SyncHook(),
            afterCompile:new SyncHook(),
            afterPlugins:new SyncHook(),
            run:new SyncHook(),
            emit:new SyncHook(),
            done:new SyncHook()
        }
        // 如果传递了plugins参数(webpack中的插件)
        let plugins = this.config.plugins
        if(Array.isArray(plugins)){
            plugins.forEach(plugin => {
                plugin.apply(this)// 把compile放入
            });
        }
        this.hooks.afterPlugins.call()
    }
    parse(source,parentPath){// ast解析语法树
        babylon.parse(source)
        let dependencies = []// 依赖的数组
        traverse(ast,{
            CallExpression(p){ // require('./a') 改成了 __webpack_require__(./src/a.js)
                let node =  p.node
                if(node.callee.name == 'require'){
                    node.callee.name = '__webpack_require__'
                    let moduleName = node.arguments[0].value// 模块名字 ./a
                    moduleName = moduleName + (path.extname(moduleName)?'':'.js')
                    moduleName = './'+path.join(parentPath,moduleName)// 加上父路径  ./src/a.js
                    dependencies.push(moduleName)// 在解析一个源文件的时候，碰到require就解析之后在放进依赖里面
                    node.arguments = [t.stringLiteral(moduleName)]// types生成stringLiteral
                }
            }
        });
        let sourceCode = generator(ast).code
        return {sourceCode,dependencies}// 源码发生了改变，require('./a') 改成了 __webpack_require__(./src/a.js)
    }
    getSource(modulePath){
        // 读取的源码
        let content = fs.readFileSync(modulePath,'utf-8')
        //当路径(moudlePath)是./index.less的时候需要调用loader去处理
        let rules = this.config.module.rules
        for(let i= 0; i<rules.length;i++){
            let rule = reules[i]
            let {test,use} = rule;
            let  len = use.length -1
            if(test.test(modulePath)){
                // 获取对应的loader函数
                function normalLoader(){
                    let loader = require(use[len--])//导入第几条规则的文件
                    content = loader(content)
                    if(len>=0){
                        normalLoader()
                    }
                }
                normalLoader()
            }
        }
        return content
    }
    // 构建模块
    buildMoudule(modulePath,isEntry){
        // 拿到模块的内容
        let source = getSource(modulePath)
        // 模块id 因为需要相对路径，所以：modulePath(总路径) -  this.root（工作路径/相对路径）
        let moduleName = './'+path.relative( this.root,modulePath)// 取出来后是：./src/index.js
        
        if(isEntry){
            this.entryId = moduleName
        }
        // 解析需要把sourse源码进行改造， 返回一个依赖列表
        let{sourceCode,dependencies} = this.parse(source,path.dirname(moduleName))// 第二个参数取到的是./src
        // 把相对路径和模块中的内容对应起来
        this.modules[moduleName] = sourceCode
        
        dependencies.forEach(dep => {// 递归去下一个文件中
            this.buildMoudule(path.join(this.root,dep).false)// 通过路径获取的源码
        });
    }
    emitFile(){
        // 用数据渲染我们的模版
        // 拿到输出目录的路径
        let main = path.join(this.config.output.path,this.config.output.filename);
        let templateStr = this.getSource(path.join(__dirname,'main.ejs'));
        let code = ejs.render(templateStr,{entryId:this.entryId,modules:this.modules})
        this.assets = {}
        // 路径对应的代码
        this.assets[main] = code
        // 写到（打包）目标目录下面
        fs.writeFileSync(main,this.assets[main])
    }
    run(){
        this.hooks.run.call()
        //编译时候执行的钩子
        this.hooks.compile.call()
        //执行并创建模块的依赖关系
        this.buildMoudule(path.resolve(this.root,this.entry),true)// true表示主模块
        this.hooks.afterCompile.call()
        //发射文件 打包后的文件
        this.emitFile()
        this.hooks.emit.call()
        this.hooks.done.call()
    }
}
module.exports = Compiler