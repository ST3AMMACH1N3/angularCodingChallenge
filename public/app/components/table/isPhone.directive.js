const PHONE_REGEX = /\d{10}/;
table.directive("isPhone", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, elem, attrs, ctrl) {
      if (attrs.key !== "phone") return;
      ctrl.$validators.isPhone = function(modelValue, viewValue) {
        const valid = PHONE_REGEX.test(viewValue);
        const alertElement = angular.element(document.querySelector(".alert"));
        if (!valid && viewValue !== "") {
          alertElement
            .removeClass("hidden")
            .text(
              "Phone numbers must be 10 digits with no symbols. Ex: 4561234567"
            );
        } else {
          alertElement.addClass("hidden");
        }
        return valid;
      };
    }
  };
});
