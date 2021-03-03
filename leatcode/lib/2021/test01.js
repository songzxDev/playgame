//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目编号：200 岛屿数量
 * @param {string[][]} grid
 * @return {number}
 */
const numIslands = function (grid) {
   let dx = [-1, 1, 0, 0], dy = [0, 0, -1, 1], m = grid.length, n = grid[0].length, count = 0;
   const dfsFill = (i, j) => {
       if (grid[i][j] === '0') return 0;
       grid[i][j] = '0';
       for (let k = 0; k < dx.length; k++) {
           let x = i + dx[k], y = j + dy[k];
           if (x < 0 || y < 0 || x >= m || y >= n) continue;
           dfsFill(x, y);
       }
       return 1;
   };
   for (let i = 0; i < m; i++) {
       for (let j = 0; j < n; j++) {
           if (grid[i][j] === '1') {
               count += dfsFill(i, j);
           }
       }
   }
   return count;
};
//leetcode submit region end(Prohibit modification and deletion)
