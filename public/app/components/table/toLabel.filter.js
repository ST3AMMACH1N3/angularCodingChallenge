table.filter("toLabel", function() {
  return function(input, sortingBy, reverse) {
    if (!input) return;
    let symbol = "";
    if (sortingBy === input) {
      symbol = reverse ? "\u2bc5" : "\u2bc6";
    }
    return (
      input[0].toUpperCase() +
      input.slice(1).replace(/[A-Z]/, char => ` ${char}`) +
      symbol
    );
  };
});
