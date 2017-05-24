angular.module("gameShareApp").controller("collectionController", function($scope, $routeParams, $http, $sce, collectionService) {

  var loadingGifUrl = "assets/images/loading.gif";
  $scope.username = $routeParams.username;
  $scope.collection = [];
  $scope.counts = {};
  $scope.collectionLoaded = false;
  $scope.detailsLoaded = false;
  $scope.filter = {};
  $scope.orderBy = "name";
  $scope.selectedFilter = "owned";
  $scope.listMode = false;
  $scope.showModal = false;
  $scope.selectedGame = {};

  $scope.selectedGameImage = loadingGifUrl;



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

  $scope.showAsHtml = function(string) {
    return $sce.trustAsHtml(string.replace(/&#10;/g, "<br/>"));
  }

  $scope.init = function() {
    $scope.username = $routeParams.username;
    $scope.getCollection($scope.username);
  }

  $scope.init();

  $scope.showPopup = function(id) {
    var details = {};
    $scope.showModal = true;
    collectionService.getGameDetails(id)
    .then(function(result) {
      $scope.selectedGame = result;
      $scope.detailsLoaded = true;
      $scope.selectedGameImage = $scope.selectedGame.image;
      });
  }

  $scope.dismissPopup = function() {
    $scope.showModal = false;
    $scope.selectedGame = {};
    $scope.detailsLoaded = false;
    $scope.selectedGameImage = loadingGifUrl;
  }

  $scope.setSelectedGame = function(game) {
    $scope.setSelectedGame = game;
  }

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
