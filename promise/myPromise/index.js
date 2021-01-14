const StatusMap = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}
const isFunc = val => typeof val === 'function'
class MyPromise {
    constructor(handle) {
        if (!isFunc(handle)) {
            throw new Error('this type of the param is not a function')
        }
        // 添加值
        this._value = undefined
        // 添加状态
        this._status = StatusMap.PENDING
        // 添加fulfilled队列
        this._fulfilledQueue = []
        // 添加rejected队列
        this._rejectedQueue = []
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            this._reject(error)
        }
    }
    _resolve(val) {
        if (this._status !== StatusMap.PENDING) return
        // 依次执行成功队列中的回调函数，并清空队列
        const run = () => {
            this._value = val
            console.log('_rejecyedQueue', this._rejectedQueue);
            this._status = StatusMap.FULFILLED
            let cb
            while (cb = this._fulfilledQueue.shift()) {
                cb(this._value)
            }
        }
        setTimeout(() => run(), 0)
    }
    _reject(err) {
        if (this._status !== StatusMap.PENDING) return
        // 执行失败队列中的函数，并清空队列
        const run = () => {
            this._value = err
            this._status = StatusMap.REJECTED
            let cb
            while (cb = this._rejectedQueue.shift()) {
                cb(this._value)
            }
        }
        setTimeout(() => run(), 0)
    }
    then(onFulfiled, onRejected) {
        const {
            _value,
            _status
        } = this

        // 返回一个新的promise对象
        return new Promise((onFulfiledNext, onRejectedNext) => {
            // 封装一个成功执行的函数
            let fulfilled = value => {
                try {
                    if (!isFunc(onFulfiled)) {
                        onFulfiledNext(value)
                    } else {
                        let res = onFulfiled(value)
                        if (res instanceof MyPromise) {
                            //如果当前回调函数返回promise，必须等待其状态改变后执行下一个回调
                            res.then(onFulfiledNext, onRejectedNext)
                        } else {
                            // 如果不是promise，则直接将返回值作为参数传给then的下一个回调函数
                            onFulfiledNext(res)
                        }
                    }
                } catch (error) {
                    // 如果函数执行出错，新的promise状态为失败
                    onRejectedNext(error)
                }
            }
            let rejected = err => {
                try {
                    if (!isFunc(onRejected)) {
                        onRejectedNext(err)
                    } else {
                        let res = onRejectedNext(err)
                        if (res instanceof MyPromise) {
                            res.then(onFulfiledNext, onRejectedNext)
                        } else {
                            onFulfiledNext(res)
                        }
                    }
                } catch (error) {
                    onRejectedNext(error)
                }
            }

            switch (_status) {
                // 当状态为pending时，将函数加入队列准备执行
                case StatusMap.PENDING:
                    this._fulfilledQueue.push(fulfilled)
                    this._rejectedQueue.push(rejected)
                    break;
                    // 当函数状态已经变化时，立即执行对应的回调函数
                case StatusMap.FULFILLED:
                    fulfilled(_value)
                    break;
                case StatusMap.REJECTED:
                    rejected(_value)
                    break;
            }
        })
    }
    catch (onRejected) {
        return this.then(undefined, onRejected)
    }
}

let p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
}).catch((err) => {
    console.log('err',err);
})

p.then(val => {
    return new MyPromise((resolve, reject) => {
        resolve(val)
    })
}, err => {
    console.log(err);
}).then(val => {
    console.log(val)
}, err => {
    console.log(err)
})


// reject 
// 