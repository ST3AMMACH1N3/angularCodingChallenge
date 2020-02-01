table.controller("tableCtrl", [
  "$scope",
  "$http",
  "$timeout",
  function($scope, $http, $timeout) {
    $scope.headings;
    $scope.data;
    $scope.selected;
    $scope.sortBy = "firstName";
    $scope.reverse = false;
    $http
      .get("/api/user")
      .then(response => {
        const { data } = response;
        if (data && data.length) {
          $scope.headings = Object.keys(data[0]);
          $scope.data = data.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {});
        }
      })
      .catch(err => console.log(err));

    $scope.changeOrder = function(property) {
      if ($scope.sortBy === property) {
        $scope.reverse = !$scope.reverse;
      } else {
        $scope.sortBy = property;
        $scope.reverse = false;
      }
    };

    $scope.select = function(id, property) {
      if (
        $scope.selected &&
        $scope.selected.id === id &&
        $scope.selected.property === property
      )
        return;
      $scope.selected = { id, property };
      $scope.$broadcast("propSelected");
    };

    $scope.deselect = function(event) {
      $timeout(() => {
        $scope.selected = null;
      }, 10);
    };

    $scope.save = function() {
      const updated = Object.values($scope.data);
      // console.log(updated);
      $http
        .put("/api/user", updated)
        .then(response => console.log(response))
        .catch(err => console.log(err));
    };
  }
]);
