// function a () {
//     for (var i = 0; i < 5; i++) {
        
//         (function(i){
//             setTimeout(function(){
//                 console.log(i)
//             }, 0);
//             console.log(i)
//         })(i)
//     }
// }
// a()
// function a () {
//     for (let i = 0; i < 5; i++) {
//         this.i = i
//         setTimeout(() => {
//             console.log(i)
//         }, 0)
//         console.log(this.i)
//     }
// }

// a()
// function a () {
//     for (let i = 0; i < 5; i++) {
//         (function (i) {
//             this.i = i
//             setTimeout(() => {
//                 console.log(i)
//             }, 0)
//             console.log(this.i)
//         })(i)
//     }
// }

// a()
// (function() {
//           var a = b = 5;
//        })();   
//      console.log(b);
    //  console.log(a);
    console.log(typeof NaN)