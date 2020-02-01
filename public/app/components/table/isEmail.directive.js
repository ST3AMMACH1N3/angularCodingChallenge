const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
table.directive("isEmail", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, elem, attrs, ctrl) {
      if (attrs.key !== "email") return;
      ctrl.$validators.isEmail = function(modelValue, viewValue) {
        const valid = EMAIL_REGEX.test(viewValue);
        const alertElement = angular.element(document.querySelector(".alert"));
        if (!valid && viewValue !== "") {
          alertElement
            .removeClass("hidden")
            .text(
              "Please enter a valid email address. Ex: example@example.com"
            );
        } else {
          alertElement.addClass("hidden");
        }
        return valid;
      };
    }
  };
});
