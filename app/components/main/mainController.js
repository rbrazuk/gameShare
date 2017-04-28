angular.module("gameShareApp").controller("mainController", function($scope, $http, $location) {

  $scope.username = "";
  $scope.collection;
  $scope.showCollection = false;

  $scope.getCollectionForUser = function() {
    // method to get collection from json api
    // should probably move into a service
  };

  $scope.goToCollection = function() {
    $location.path("/collection/" + $scope.username);
  };


});
