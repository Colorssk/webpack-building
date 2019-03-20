// 当遇到undefined的时候不执行，但是在重复执行这个方法之后再执行下一个
class SyncLoopHook{
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
        this.tasks.forEach(task=>{
            let ret
            do{
                task(...args)
            }while(let!==undefined);
            
        })
    }
}

let hook = new SyncLoopHook(['name'])
let total = 0
hook.tap('name01',function(name){

    return ++total == 3 ? undefined:'继续学习'// 所以undefiend是继续向下执行,return 'aa'会导致重复执行
})
hook.tap('name02',function(name){
    
})
hook.call('colorssk')