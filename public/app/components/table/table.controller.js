table.controller("tableCtrl", [
  "$scope",
  "$http",
  "$timeout",
  function($scope, $http, $timeout) {
    $scope.headings;
    $scope.data;
    $scope.selected;
    $scope.selectRow;
    $scope.sortBy = "firstName";
    $scope.reverse = false;
    $scope.isLoading = true;

    $scope.changeOrder = function(property) {
      if ($scope.isLoading) return;
      if ($scope.sortBy === property) {
        $scope.reverse = !$scope.reverse;
      } else {
        $scope.sortBy = property;
        $scope.reverse = false;
      }
    };

    $scope.selectField = function(id, property) {
      if (
        $scope.isLoading ||
        ($scope.selected &&
          $scope.selected.id === id &&
          $scope.selected.property === property)
      )
        return;
      $scope.selected = { id, property };
      $scope.sortBy = null;
      $scope.$broadcast("propSelected");
    };

    $scope.deselectField = function(event) {
      $timeout(() => {
        $scope.selected = null;
      }, 10);
    };

    $scope.selectRow = function(id) {
      if ($scope.isLoading) return;
      $scope.selectedRow = id;
    };

    $scope.createRow = function() {
      const uniqueId = "f" + Date.now();
      $scope.data[uniqueId] = $scope.headings.reduce((acc, key) => {
        if (key === "id") {
          acc[key] = uniqueId;
        } else {
          acc[key] = "";
        }
        return acc;
      }, {});
      $scope.selectedRow = uniqueId;
    };

    $scope.save = function() {
      if ($scope.selected) {
        $scope.selected = null;
      }
      const updated = Object.values($scope.data);
      $scope.isLoading = true;
      $http
        .put("/api/user", updated)
        .then(response => {
          getData();
        })
        .catch(err => console.log(err));
    };

    $scope.deleteRow = function() {
      if (!$scope.selectedRow) return;
      if ($scope.selectedRow[0] !== "f") {
        $scope.isLoading = true;
        $http
          .delete(`/api/user/${$scope.selectedRow}`)
          .then(affectedRows => {
            getData();
          })
          .catch(err => console.log(err));
      } else {
        delete $scope.data[$scope.selectedRow];
      }
    };

    $scope.$watch("isLoading", function() {
      if ($scope.selected) {
        $scope.selected = null;
      }
      if ($scope.isLoading) {
        angular
          .element(document.querySelector("#loader"))
          .removeClass("hidden");
        angular
          .element(document.querySelector("#data-table"))
          .addClass("grayed");
      } else {
        angular.element(document.querySelector("#loader")).addClass("hidden");
        angular
          .element(document.querySelector("#data-table"))
          .removeClass("grayed");
      }
    });

    function getData() {
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
            $scope.isLoading = false;
          }
        })
        .catch(err => console.log(err));
    }

    getData();
  }
]);
