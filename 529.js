/**
 * 递归处理, 深度优先
 */
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function (board, click) {
  // click一定是可点击的格子
  let [row, col] = click;

  if (board[row][col] === "M") {
    // 是地雷，直接结束
    board[row][col] = "X";
  } else {
    // 非地雷，执行深度遍历
    // dfs(board, click);
    bfs(board, click);
  }

  return board;
};

// 深度优先
function dfs(board, point) {
  let mineSum = 0; // 周围地雷数量
  let aroundList = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let [row, col] = point;

  if (row > board.length || col > board[0].length || row < 0 || col < 0) {
    return board;
  }

  // 查找周围地雷数量
  for (let around of aroundList) {
    let [offsetX, offsetY] = around;
    if (board[row + offsetX] && board[row + offsetX][col + offsetY] === "M") {
      mineSum++;
    }
  }

  if (mineSum) {
    board[row][col] = mineSum.toString();
  } else {
    board[row][col] = "B";
    // 继续遍历周围
    for (let around of aroundList) {
      let [offsetX, offsetY] = around;
      if (board[row + offsetX] && board[row + offsetX][col + offsetY] === "E") {
        dfs(board, [row + offsetX, col + offsetY]);
      }
    }
  }
}

// 广度优先
function bfs(board, point) {
  let aroundList = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let queue = new Queue([point]);
  let set = new Set(point.toString());

  // 查找周围地雷数量
  while (queue.len()) {
    let mineSum = 0; // 周围地雷数量
    let [row, col] = queue.out();

    for (let around of aroundList) {
      let [offsetX, offsetY] = around;
      if (board[row + offsetX] && board[row + offsetX][col + offsetY] === "M") {
        mineSum++;
      }
    }

    if (mineSum) {
      board[row][col] = mineSum.toString();
    } else {
      board[row][col] = "B";
      // 继续遍历周围,执行入队
      for (let around of aroundList) {
        let [offsetX, offsetY] = around;
        if (
          board[row + offsetX] &&
          board[row + offsetX][col + offsetY] === "E" &&
          !set.has([row + offsetX, col + offsetY].toString())
        ) {
          queue.in([row + offsetX, col + offsetY]); // 入队
          set.add([row + offsetX, col + offsetY].toString());
        }
      }
    }
  }
}

function Queue(list) {
  this._list = list || [];

  this.in = (el) => {
    this._list.push(el);
  };

  this.out = () => {
    if (!this._list.length) {
      return;
    }
    return this._list.shift();
  };

  this.front = () => {
    return this._list[0];
  };

  this.empty = () => {
    this._list = [];
  };

  this.len = () => {
    return this._list.length;
  };
}

console.log(
  updateBoard(
    [
      ["E", "E", "E", "E", "E"],
      ["E", "E", "M", "E", "E"],
      ["E", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E"],
    ],
    [3, 0]
  )
);
