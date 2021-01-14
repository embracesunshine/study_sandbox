
let arr = [1,2,3,4,5]
// 累加
let sum = arr.reduce((initValue, cur, index, array) => {
    return initValue + cur
}, 0)

console.log(sum)
// 计数
let arr_1 = ['a', 'b', 'c', 'b', 'c' , 'a', 'd', 'c']

let obj = arr_1.reduce((initValue, cur, index, array) => {
    if(initValue[cur]) {
        initValue[cur] += 1
    }else {
        initValue[cur] = 1
    }
    return initValue
} , {})

console.log('obj', obj);