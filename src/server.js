// let express = require('express')

// let app = express();

// app.get('/app/user',(req,res)=>{
//     res.json({name:'aa'})
// })
// app.listen(3000)
let express = require('express')
let webpack = require('webpack')// 需要中间件， webpack-dev-middleware(作用在服务端启动webpack)
let middle = require('webpack-dev-middleware')
let config = require('./webpack.config.js')//先取得webapck的配置文件，然后交给webpack处理
let compile = webpack(config)
let app = express();



app.use(middle(compile));// 此时不管启动了一个服务还启动了webpack（此时前端和后端在一起开发）

app.get('/app/user',(req,res)=>{
    res.json({name:'aa'})
})
app.listen(3000)