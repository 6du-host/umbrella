// Attach a callback to the specified events
u.prototype.on = function (events, cb, cb2) {
  if (typeof cb === 'string') {
    var sel = cb;
    cb = function (e) {
      var args = arguments;
      u(e.currentTarget).find(sel).each(function (target) {
        if (target === e.target || target.contains(e.target)) {
          try {
            Object.defineProperty(e, 'currentTarget', {
              get: function () {
                return target;
              }
            });
          } catch (err) {}
          if (cb2.apply(target, args) === false) {
            e.preventDefault();
          }
        }
      });
    };
  }

  // Add the custom data as arguments to the callback
  var callback = function (e) {
    if (cb.apply(this, [e].concat(e.detail || [])) === false) {
      e.preventDefault();
    }
  };

  return this.eacharg(events, function (node, event) {
    node.addEventListener(event, callback);

    // Store it so we can dereference it with `.off()` later on
    node._e = node._e || {};
    node._e[event] = node._e[event] || [];
    node._e[event].push(callback);
  });
};
