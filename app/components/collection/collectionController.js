angular.module("gameShareApp").controller("collectionController", function($scope, $routeParams, $http, collectionService) {
  $scope.username = $routeParams.username;
  $scope.collection = [];
  $scope.counts = {};
  $scope.collectionLoaded = false;
  $scope.filter = {};
  $scope.orderBy = "name";
  $scope.selectedFilter = "owned";
  $scope.listMode = false;

  $scope.showGridView = function() {
    $scope.listMode = false;
  }

  $scope.showListView = function() {
    $scope.listMode = true;
  }

  $scope.getCollection = function(username) {
    collectionService.getFlatCollection(username)
      .then(function(posts) {
        $scope.collectionLoaded = true;
        $scope.collection = posts;
        $scope.counts = collectionService.getCounts(posts);
      });
  }

  $scope.init = function() {
    $scope.username = $routeParams.username;
    $scope.getCollection($scope.username);
  }

  $scope.init();

  $scope.changeFilter = function(newValue) {
    switch (newValue) {
      case "all":
        $scope.filter = {};
        break;
      case "owned":
        $scope.filter = {};
        $scope.filter.owned = true;
        break;
      case "wishList":
        $scope.filter = {};
        $scope.filter.wishList = true;
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

  $scope.changeOrderBy = function(newValue) {
      $scope.orderBy = $scope.orderBy === newValue ? "-" + newValue : newValue;
  }

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

})
.directive('gridThumbnail', function() {
  return {
    templateUrl: 'app/components/gridThumbnail/gridThumbnail.html'
  }
});
