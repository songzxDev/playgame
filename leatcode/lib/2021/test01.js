//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目编号：200 岛屿数量
 * @param {string[][]} grid
 * @return {number}
 */
const numIslands = function(grid) {
    let m = grid.length, n = grid[0].length, count = 0;
    const dfsHelper = (grid, i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === '0') return;
        grid[i][j] = '0';
        dfsHelper(grid, i - 1, j);
        dfsHelper(grid, i + 1, j);
        dfsHelper(grid, i, j - 1);
        dfsHelper(grid, i, j + 1);
    };
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                dfsHelper(grid, i, j);
                count++;
            }
        }
    }
    return count;
};
//leetcode submit region end(Prohibit modification and deletion)
