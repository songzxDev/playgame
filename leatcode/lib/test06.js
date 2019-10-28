// =========== 动态规划 ===========
/**
 * 1143.最长公共子序列（动态规划）
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = function (text1, text2) {
    let dp = Array.from({length: text1.length + 1}, () => (
        Array.from({length: text2.length + 1}, () => (0)))
    );
    for (let i = 1; i < text1.length + 1; i++) {
        for (let j = 1; j < text2.length + 1; j++) {
            if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[text1.length][text2.length];
};

/**
 * 64.最小路径和（数组、动态规划）
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) {
    let dp = Array.from({length: grid.length}, () => (
        Array.from({length: grid[0].length}, () => (0)))
    );
    for (let i = grid.length - 1; i >= 0; i--) {
        for (let j = grid[0].length - 1; j >= 0; j--) {
            if (i === grid.length - 1 && j !== grid[0].length - 1) {
                dp[i][j] = grid[i][j] + dp[i][j + 1];
            } else if (j === grid[0].length - 1 && i !== grid.length - 1) {
                dp[i][j] = grid[i][j] + dp[i + 1][j];
            } else if (j !== grid[0].length - 1 && i !== grid.length - 1) {
                dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
            } else {
                dp[i][j] = grid[i][j];
            }
        }
    }
    return dp[0][0];
};