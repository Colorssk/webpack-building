let a =  {x:1}


let b  = Object.assign({},a)
let c = {...a}

a.x = 2
console.log(b)
console.log(c)