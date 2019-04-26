class DonePlugin {
    apply(compiler){//钩子  compiler.hooks, //同步插件
        compiler.hooks.done.tap('DonePlugin',(stats)=>{
            console.log('编译完成')
        })
    }
}
module.exports = DonePlugin