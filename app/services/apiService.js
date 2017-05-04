angular.module("gameShareApp").service("apiService", function($http, $q) {

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

});
