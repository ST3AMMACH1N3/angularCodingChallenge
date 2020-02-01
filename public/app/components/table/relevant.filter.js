table.filter("relevant", function() {
  return function(input) {
    if (!input) return;
    const relevantFields = ["firstName", "lastName", "email", "phone"];

    if (Array.isArray(input)) {
      return relevantFields;
    }

    return relevantFields.reduce((acc, key) => {
      acc[key] = input[key];
      return acc;
    }, {});
  };
});
