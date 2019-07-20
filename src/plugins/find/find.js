// Find all the _ children of the current ones matched by a selector
u.prototype.find = function (selector) {
  return this.map(function (node) {
    return u(selector || '*', node);
  });
};
