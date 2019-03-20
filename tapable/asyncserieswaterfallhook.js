import { promised } from "q";
import { resolve, resolveCname } from "dns";

class AsyncSeriesWaterfallHook{// 异步并发钩子
    constructor(args){
        this.tasks = []
    }
    tapAsyn(name,task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let finalCallback = args.pop()
        let index = 0
        let next =(error,data)=>{
           let task =  this.tasks[index]
           if(!task) return finalCallback()
           if(index===0){
            task(...args,next)
           }else{
               task(data,next)
           }
           index++
         
        }
        next()
    }
}

let hook = new AsyncSeriesWaterfallHook(['name'])
hook.tapAsync('name01',function(data,cb){
   setTimeout(() => {
       console.log('name01')
       cb(null,'结果')
   }, 1000);
})
hook.tapAsync('name02',function(data,cb){
    setTimeout(() => {
        console.log('name02')
        cb(null)
    }, 1000);
   
})
hook.callAsync('name02',function(){
   
})

//promise形式：
// class AsyncSeries{// 异步并发钩子
//     constructor(args){
//         this.tasks = []
//     }
//     tapPromise(name,task){
//         this.tasks.push(task)
//     }
//     Promise(...args){
//         let [first,...others] = this.tasks
//         return others.reduce((p,n)=>{//redux源码
//            return p.then(()=>n(...args))
//         },first(...args))
//     }
// }

// let hook = new AsyncSeries(['name'])
// hook.tapPromise('name01',function(name){
//    return new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         console.log('name01')
//        resolve()
//     }, 1000);
//    })
// })
// hook.tapPromise('name02',function(name){
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             console.log('name02')
//            resolve()
//         }, 1000);
//        })
   
// })
// hook.promise('name02',function(){
   
// })