let less =require('less')
function loader(source){
    let css;
    less.render(source,function(err,r){
        css = r.css
    })// 异步
    return css
}
module.exports = loader