const hit = (num) => {
    if (num <= 0) {
        return 0;
    }
    let cur = hit(num - 1);
    console.log(cur, num);
    return cur;
};
hit(10);