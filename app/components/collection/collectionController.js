angular.module("gameShareApp").controller("collectionController", function($scope, $routeParams, $http, apiService) {
  $scope.username = $routeParams.username;
  $scope.collection = [];

  $scope.collectionLoaded = false;

  $scope.filter = {};
  $scope.selectedFilter = "all";

  $scope.counts = {};

  $scope.listMode = true;

  $scope.showGridView = function() {
    $scope.listMode = false;
  }

  $scope.showListView = function() {
    $scope.listMode = true;
  }


  $scope.getCollection = function(username) {
    apiService.getFlatCollection(username)
      .then(function(posts) {
        $scope.collectionLoaded = true;
        $scope.collection = posts;
        $scope.getCounts(posts);

      });
  }

  $scope.getExampleCollection = function() {
    $http.get("assets/js/exampleCollection.json")
      .then(function(result) {
        $scope.collection = result.data;
      });
  }

  $scope.getCounts = function(collection) {
    var wishlistCount = 0;
    var wantToPlayCount = 0;
    var ownedCount = 0;

    for (var i = 0; i < collection.length; i++) {

      if (collection[i].owned) {
        ownedCount++;
      }
      if (collection[i].wishList) {
        wishlistCount++;
      }
      if (collection[i].wantToPlay) {
        wantToPlayCount++;
      }
    }


    $scope.counts.wishList = wishlistCount;
    $scope.counts.wantToPlay = wantToPlayCount;
    $scope.counts.owned = ownedCount;
    console.log($scope.counts);
  }

  $scope.init = function() {
    $scope.username = $routeParams.username;
    $scope.getCollection($scope.username);
    //$scope.getExampleCollection();
  }

  $scope.init();

  $scope.changeFilter = function(newValue, oldValue, scope) {
    switch (newValue) {
      case "all":
        $scope.filter = {};
        break;
      case "owned":
        $scope.filter = {};
        $scope.filter.owned = true;
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
