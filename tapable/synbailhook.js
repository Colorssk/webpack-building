class SyncBailHook{
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
        let ret;// 当前函数的返回值
        let index = 0;
        do{
            ret = this.tasks[index++](...args)
        }while(ret==undefined && index<this.tasks.length);
    }
}

let hook = new SyncBailHook(['name'])
hook.tap('name01',function(...args){
    return 'aaa'// 这return之后下面的方法就不会执行了 return undefined就可以
})
hook.tap('name02',function(...args){
    
})
hook.call('colorssk')