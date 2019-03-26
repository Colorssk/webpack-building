function loader(source){
    // 导出一个js合法脚本才会被执行
    let str =`
        let style = document.createElement('style');
        style.innerHtml = ${JSON.stringify(source)};
    `
    return str
}
module.exports = loader

// stringify之后相当于
// style.innerHtml = "body{\r\n background:red; }"