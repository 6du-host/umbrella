// Delete all of the _ that equals the filter
u.prototype.not = function (filter) {
  return this.filter(function (node) {
    return !u(node).is(filter || true);
  });
};
