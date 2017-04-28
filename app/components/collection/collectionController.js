angular.module("gameShareApp").controller("collectionController", function($scope, $http, $routeParams) {
  $scope.username = $routeParams.username;
  $scope.collection = [];

  $scope.getExampleCollection = function() {
    $http.get("assets/js/exampleCollection.json")
    .then(function(response) {
      $scope.collection = response.data;
      console.log($scope.collection);
    });
  };

  //getExampleCollection();
});
