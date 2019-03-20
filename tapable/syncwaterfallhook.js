class SyncWaterFallHook{// 先求出第一个任务再把第一个任务传给下一个
    constructor(args){
        this.tasks = []
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...args){
        // this.tasks.forEach((task)=>{
        //     task(...args)
        // })
        // let ret;// 当前函数的返回值
        // let index = 0;
        // do{
        //     ret = this.tasks[index++](...args)
        // }while(ret==undefined && index<this.tasks.length);
        let [first,...others] = this.tasks;
        let ret = first(...args)
        others.reduce((a,b)=>{
           return  b(a);
        },ret)
    }
}

let hook = new SyncWaterFallHook(['name'])
hook.tap('name01',function(name){
    return 'aaa'// 这return之后下面的方法就不会执行了 return undefined就可以
})
hook.tap('name02',function(data){
    return 'name02'
})
hook.tap('name03',function(data){
    return 'name03'
})
hook.call('colorssk')