class Node {
    constructor(val, left, right) {
        this.val = val
        this.left = left
        this.right = right
    }
}

class Stack {
    list = []
    isEmpty() {
        return this.list.length === 0
    }
    push(elem) {
        this.list.push(elem)
    }
    pop() {
        if (this.isEmpty()) return
        return this.list.pop()
    }
}

let a = new Node('A')
let b = new Node('B')
let c = new Node('C')
let d = new Node('D')
let e = new Node('E')
let f = new Node('F')
let g = new Node('G')

a.left = b
b.left = d
b.right = e
a.right = c
c.left = f
c.right = g

const preorder_traversal = (root, callback, stack = new Stack()) => {
    if(!root) return
    if(typeof callback !== 'function') return
    stack.push(root)
    while(!stack.isEmpty()) {
        let temp = stack.pop()
        callback(temp)
        temp.right && stack.push(temp.right)
        temp.left && stack.push(temp.left)
    }
} 

const print = (ele) => {
    console.log(ele.val);
}

preorder_traversal(a, print)