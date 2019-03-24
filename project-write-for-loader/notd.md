loader包含两个模块ptich loader和normal loader
 
module:[
    rules:[
        {
            test:/\.js$/
            use:['laoder3','loader2','loader1']
        }
    ]
]

正常流程(loader都有返回值)
pitch:  1:loader3->2:loader2->3:loader1
                                        传入资源
normal:  3:loader3<-2:loader2<-1:loader1       

如果写了pitch并且laoder2有返回值则会直接在pitch中跳过后面的在normal中直接跳过
pitch:  1:loader3->2:loader2
                                        传入资源
normal:  3:loader3<-    

(ptich中有返回值会阻断)（loader1）
校验获取到的参数（laoder开发中的校验）安装： schema-utils


编写babel:
准备：
install  @babel/core @babel/preset-env loader-utils（工具类获取webpack中options）

获取图片类型下载 mime