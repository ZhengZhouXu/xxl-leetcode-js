/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) return 0;

  // return bfs(root);
  return dfs(root);
};

// 深度优先
function dfs(root, depth = 1) {
  if (root.left && !root.right) {
    return dfs(root.left, depth + 1);
  } else if (!root.left && root.right) {
    return dfs(root.right, depth + 1);
  } else if (root.left && root.right) {
    return Math.min(dfs(root.left, depth + 1), dfs(root.right, depth + 1));
  } else {
    return depth;
  }
}

// 广度优先
function bfs(root) {
  root.depth = 1;
  let queue = new Queue([root]);

  while (queue.len()) {
    let current = queue.out();

    if (!current) {
      continue;
    }

    if (current.left || current.right) {
      if (current.left) {
        current.left.depth = current.depth + 1;
        queue.in(current.left);
      }
      if (current.right) {
        current.right.depth = current.depth + 1;
        queue.in(current.right);
      }
    } else {
      return current.depth;
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
