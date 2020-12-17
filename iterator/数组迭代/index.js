
let arr = [1,2,3,4]
// 数组自带迭代器方法
// let iter = arr[Symbol.iterator]()
// console.log(iter)
// console.log(iter.next())

// 实现一个数组迭代器

Array.prototype.iterator_self = function() {
    let index = 0;
    let self = this
    return {
        next() {
            if(index < self.length) {
                return {
                    value: arr[index++],
                    done: false
                }
            }else {
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}
const iter = arr.iterator_self()

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
