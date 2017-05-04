angular.module("gameShareApp").controller("collectionController", function($scope, $routeParams, $http, apiService) {
  $scope.username = $routeParams.username;
  $scope.collection = [];

  $scope.collectionLoaded = false;

  $scope.filter = {};
  $scope.selectedFilter = "all";

  $scope.getCollection = function(username) {
    apiService.getFlatCollection(username)
      .then(function(posts) {
        $scope.collectionLoaded = true;
        $scope.collection = posts;
        console.log("getCollection called");

      });
  }

  $scope.init = function() {
    $scope.username = $routeParams.username;
    $scope.getCollection($scope.username);
  }

  $scope.init();

  $scope.changeFilter = function(newValue, oldValue, scope) {
    switch (newValue) {
      case "all":
        $scope.filter = {};
        break;
      case "owned":
        $cope.filter = {};
        $scope.filter.owned = true;
      case "wantToBuy":
        $scope.filter = {};
        $scope.filter.wantToBuy = true;
        break;
      case "wantToPlay":
        $scope.filter = {};
        $scope.filter.wantToPlay = true;
        break;
      default:
        $scope.filter = {};
        break;
    }
  };

  $scope.$watch('selectedFilter', $scope.changeFilter);

  $scope.playersDisplay = function(minPlayers, maxPlayers) {
    if (maxPlayers == 1) {
      return "1 Player";
    } else if (minPlayers === maxPlayers) {
      return minPlayers + " players";
    } else {
      return minPlayers + " to " + maxPlayers + " players";
    }
  };

});
