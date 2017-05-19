angular.module("gameShareApp").service("collectionService", function($http, $q) {

  const JSON_COLLECTION_ENDPOINT = "https://bgg-json.azurewebsites.net/collection/";

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
