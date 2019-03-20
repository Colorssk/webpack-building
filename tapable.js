let {SyncHook} = require('tapable')

class Test{
    constructor(){
        this.hooks = {// 自动定的钩子
            arch: new SyncHook(['name'])
        }
    }
    tap(){//注册监听函数
        this.hooks.arch.tap('name01',function(name){// 这个name就是下面call调用时候传的参数

        })
        this.hooks.arch.tap('name02',function(name){// 

        })
    }
    start(){
        this.hooks.arch.call('colorssk')
    }
}
let l = new Test()
l.tap()
l.start()