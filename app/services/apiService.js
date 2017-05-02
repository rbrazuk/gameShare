angular.module("gameShareApp").service("apiService", function($http) {
  this.getXmlTest = function() {
    // temporary function to test getting xml from api
    $http.get("https://bgg-json.azurewebsites.net/collection/recreationMyth")
    .success(function(response) {
      console.log(response);
    })
    .error(function(response, status) {
      console.log(reponse);
    });
  }

  this.getCollectionForUser = function(userName) {
    // get collection from api using username
  }

  this.getGameById = function(gameId) {
    // get game from api by gameId
  }
});
