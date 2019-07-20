// Merge all of the _ that the callback return into a simple array
u.prototype.array = function (callback) {
  callback = callback;
  var self = this;
  return this._.reduce(function (list, node, i) {
    var val;
    if (callback) {
      val = callback.call(self, node, i);
      if (!val) val = false;
      if (typeof val === 'string') val = u(val);
      if (val instanceof u) val = val._;
    } else {
      val = node.innerHTML;
    }
    return list.concat(val !== false ? val : []);
  }, []);
};
