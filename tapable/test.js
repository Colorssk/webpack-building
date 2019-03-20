function kk(arr){
    for(let i=0;i<arr.length-3;i++){
        if(arr[i]==arr[i+1]){
            if(arr[i]==arr[i+2]){
                arr.splice(i,1)
                kk(arr)
            }
            if(arr[i+2]==arr[i+3]&&arr[i]!=arr[i+2]){
                arr.splice(i+2,1)
                kk(arr)
            }
        }
    }
}
// let result = ['w','o','o','o','o','o','o','o','w']
let result = [ 'h', 'e', 'l', 'l', 'o','o' ]
kk(result)
console.log(result)