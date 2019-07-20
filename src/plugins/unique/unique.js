// [INTERNAL USE ONLY]

// Removed duplicated _, used for some specific methods
u.prototype.unique = function () {
  return u(this._.reduce(function (clean, node) {
    var istruthy = node !== null && node !== undefined && node !== false;
    return (istruthy && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
  }, []));
};
