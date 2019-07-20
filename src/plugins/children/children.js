// Get the direct children of all of the _ with an optional filter
u.prototype.children = function (selector) {
  return this.map(function (node) {
    return this.slice(node.children);
  }).filter(selector);
};
