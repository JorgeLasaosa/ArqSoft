angular.module('animeFfinityAPP', ['ngCookies']).controller('SearchController', function($scope, $http) {
      console.log("Controller");
      $scope.search = function() {
         $http.post("/search", $scope.search_text)
         .success(function() {
            console.log("Post /search successful");
         })
         .error(function() {
            console.log("Error on post /search");
         })
      }
   });