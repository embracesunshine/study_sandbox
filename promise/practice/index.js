// let obj = {
//     then(resolve, reject) {
//         resolve(10)
//     },
//     a: 1,
// }

// let p = Promise.resolve(obj)
// console.log(p);
// p.then(res => {
//     console.log(res);
// })

// reject 也是完成的一种
let p = new Promise((reslove, reject) => {
    setTimeout(() => {
        reject(11)
    }, 1000);
})

p.then(val => {
    console.log(val)
}, err => {
    console.log(err);
})