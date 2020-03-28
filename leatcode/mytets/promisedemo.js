/*function sleep(duration) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, duration);
    })
}

sleep(1000).then(() => console.log("finished"));*/


/*
const r = new Promise(function(resolve, reject){
    console.log("a");
    resolve();
});
r.then(() => console.log("c"));
console.log("b");*/


/*
const r = new Promise(function (resolve, reject) {
    console.log("a");
    resolve();
});
setTimeout(() => console.log("d"), 0);
r.then(() => console.log("c"));
console.log("b");*/


/*setTimeout(() => console.log("d"), 0);
const r = new Promise(function (resolve, reject) {
    resolve();
});
r.then(() => {
    const begin = Date.now();
    while (Date.now() - begin < 1000){}
    console.log("c1");
    new Promise(function (resolve, reject) {
        resolve();
    }).then(() => console.log("c2"));
});*/


/*
function sleep(duration) {
    return new Promise(function (resolve, reject) {
        console.log("b");
        setTimeout(resolve, duration);
    });
}

console.log("a");
sleep(5000).then(() => console.log("c"));*/


function sleep(duration) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, duration);
    })
}

async function foo() {
    console.log("a");
    await sleep(2000).then(() => console.log('over sleep'));
    console.log("b");
}

foo();