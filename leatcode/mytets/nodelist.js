class NodeList {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let node1 = new NodeList(array[0]);
let next = node1;
for (let i = 1; i < array.length; i++) {
    let curr = new NodeList(array[i]);
    next.next = curr;
    next = curr;
}
console.log(JSON.stringify(node1, null, 4));