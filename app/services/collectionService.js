angular.module("gameShareApp").service("collectionService", function($http, $q) {

  const JSON_COLLECTION_ENDPOINT = "https://bgg-json.azurewebsites.net/collection/";
  const JSON_GAME_DETAILS_ENDPOINT = "https://bgg-json.azurewebsites.net/thing/";

  var collection = undefined;

  this.getFlatCollection = function(username) {

    var deferred = $q.defer();

    $http.get(JSON_COLLECTION_ENDPOINT + username)
      .then(function(result) {
        collection = result.data;
        deferred.resolve(collection);
        console.log("loaded from API");
        currentUsername = username;
      }, function(error) {
        collection = error;
        deferred.reject(error);
      });

    collection = deferred.promise;
    console.log("loaded from cache");
    return $q.when(collection);
  };

  this.getGameDetails = function(id) {

    var deferred = $q.defer();
    var details = {};

    $http.get(JSON_GAME_DETAILS_ENDPOINT + id)
      .then(function(result) {
        details = result.data;
        deferred.resolve(details);
      }, function(error) {
        details = error;
        deferred.reject(error);
      });

      details = deferred.promise;
      return $q.when(details);
  }

  this.getCounts = function(collection) {
    var wishlistCount = 0;
    var wantToPlayCount = 0;
    var ownedCount = 0;
    var counts = {};

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

    counts.wishList = wishlistCount;
    counts.wantToPlay = wantToPlayCount;
    counts.owned = ownedCount;

    return counts;
    }
});
