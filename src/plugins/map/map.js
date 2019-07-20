// Merge all of the _ that the callback returns
u.prototype.map = function (callback) {
  return callback ? u(this.array(callback)).unique() : this;
};
