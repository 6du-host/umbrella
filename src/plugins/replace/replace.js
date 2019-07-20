// Replace the matched elements with the passed argument.
u.prototype.replace = function (html, data) {
  var _ = [];
  this.adjacent(html, data, function (node, fragment) {
    _ = _.concat(this.slice(fragment.children));
    node.parentNode.replaceChild(fragment, node);
  });
  return u(_);
};
