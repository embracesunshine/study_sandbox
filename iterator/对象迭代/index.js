let obj = {
    a: 1,
    b: 2,
    c: 3,
}

Object.prototype.iterator_self = function () {
    const keys = Object.keys(this)
    let index = 0
    let self = this
    return {
        next() {
            if(index < keys.length) {
                return {
                    value: [keys[index],self[keys[index++]]],
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

const iter = obj.iterator_self()
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());