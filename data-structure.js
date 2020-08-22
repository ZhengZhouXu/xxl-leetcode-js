// 简单的数据结构
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
