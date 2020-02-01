table.filter("toArray", function() {
  return function(input) {
    if (!input) return input;
    return Object.values(input);
  };
});
