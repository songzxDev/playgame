let getNumBinaryArray = (num) => {
    let array32 = new Array(32).fill(0), last = 31;
    while (num > 0 && num < 0x80000000) {
        array32[last--] = num % 2;
        num = num >> 1;
    }
    return array32;
};
let x = getNumBinaryArray(218), y = getNumBinaryArray(218);
let after = new Array(32).fill(0);
for (let i = 0; i < 32; i++) {
    after[i] = x[i] & y[i];
}
for (let i = 0; i < 10; i++) {
    console.log(getNumBinaryArray(2 ** i).join(''));
    console.log(getNumBinaryArray((2 ** i) - 1).join(''));
    console.log('='.padEnd(34, '='));
}