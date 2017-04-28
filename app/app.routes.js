angular.module('gameShareApp').config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "app/components/main/main.htm",
    controller: "mainController"
  })
  .when("/collection/:username", {
    templateUrl: "app/components/collection/collection.htm",
    controller: "collectionController"
  });
});
