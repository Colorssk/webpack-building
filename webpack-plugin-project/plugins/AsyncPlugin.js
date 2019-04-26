import { Module } from "module";

// 异步插件
class AsyncPlugin{
    apply(compiler){
        compiler.hooks.emit.tapAsync('AsyncPlugin',(compliation,cb)=>{
            setTimeout(()=>{
                cb()
            },1000)
        })
        compiler.hooks.emit.tapPromise('AsyncPlugin',(compliation)=>{
           return new Promise((resolve,reject)=>{
               setTimeout(()=>{
                resolve()
               },1000)
           })
        })
    }
}
module.exports = AsyncPlugin