class SyncHook{
    constructor(args){
        this.tasks = []
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...args){
        this.tasks.forEach((task)=>{
            task(...args)
        })
    }
}

let hook = new SyncHook(['name'])
hook.tap('name01',function(...args){
    
})
hook.tap('name02',function(...args){
    
})
hook.call('colorssk')