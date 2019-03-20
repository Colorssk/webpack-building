// import { setTimeout } from "timers";

// class AsyncParralleHook{
//     constructor(args){
//         this.tasks = []
//     }
//     tapAsync(name,task){
//         this.tasks.push(task)
//     }
//     callAsync(...args){
//         let finalCallback = args.pop();// 然后让每个人物都执行
//         let index = 0
//         let done = ()=>{// 类似promise.all
//             index++
//             if(index==this.tasks.length){
//                 finalCallback()
//             }
//         }
//         this.tasks.forEach(task=>{
//             task(...args,done)
//         })
//     }
// }

// let hook = new AsyncParralleHook(['name'])
// hook.tapAsync('name01',function(name,cb){
//    setTimeout(()=>{
//     cb()
//    },1000)
   
// })
// hook.tapAsync('name02',function(name,cb){
//     setTimeout(()=>{
//         cb()
//     },1000)
   
// })
// hook.callAsync('colorssk',()=>{
//     //注册事件都执行完之后会执行这里的事件
//     console.log('end')
// })



//promise
import { setTimeout } from "timers";

class AsyncParralleHook{// 异步并发钩子
    constructor(args){
        this.tasks = []
    }
    tapPromise(name,task){
        this.tasks.push(task)
    }
    promise(...args){
        
        let promiseTasksArr = this.tasks.map(task=>{
            task(...args)
        })
        return Promise.all(promiseTasksArr)
    }
}

let hook = new AsyncParralleHook(['name'])
hook.tapPromise('name01',function(name){
  return new promise((resolve,reject)=>{
    setTimeout(()=>{
        cb()
    },1000)
    resolve()
  })
   
})
hook.tapPromise('name02',function(name){
    return new promise((resolve,reject)=>{
        setTimeout(()=>{
            cb()
        },1000)
        resolve(name)
      })
   
})
hook.promise('colorssk'.then(()=>{
    //注册事件都执行完之后会执行这里的事件
    console.log('end')
}))