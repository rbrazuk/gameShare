angular.module("gameShareApp").controller("collectionController", function($scope, $http, $routeParams) {
  $scope.username = $routeParams.username;
  $scope.collection = [];

  $scope.filter = {};
  $scope.selectedFilter = "all";



  $scope.changeFilter = function(newValue, oldValue, scope) {
    switch (newValue) {
      case "all":
        $scope.filter = {};
        break;
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

  $scope.getExampleCollection = function() {
    $http.get("assets/js/exampleCollection.json")
      .then(function(response) {
        $scope.collection = response.data;
        console.log($scope.collection);
      });
  };

  $scope.playersDisplay = function(minPlayers, maxPlayers) {
    if (maxPlayers == 1) {
      return "1 Player";
    } else if (minPlayers === maxPlayers) {
      return minPlayers + " players";
    } else {
      return minPlayers + " to " + maxPlayers + " players";
    }
  };



  //getExampleCollection();
});
