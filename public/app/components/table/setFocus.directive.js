table.directive("focus", function() {
  return function(scope, elem, attr) {
    elem[0].focus();
  };
});
