console.log(hello)
//-! 不会让文件再去通过pre+normal loader来处理，跳过前两个步骤直接指定inline-loader,前面只有一个!表示没有normal
// !!表示什么都不要只要使用行内loader
let str  = require('-！inline-loader!./a.js')// 表示把a.js导入到前面的inline-loader中去(行内loader)

//图片的应用 url-loader/file-loader
import p from './img.jpg'
let img = document.createElement('img')
img.src = p
document.body.appendChild(img)