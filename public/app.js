var module = angular.module('animeffinity', []);
function appCtrl($scope, $http){

  $scope.formSearch = {};

  // Buscar
  $scope.search = function (){
    $http.post('/search', $scope.formSearch)
          .success(function(data) {
              $scope.formSearch = {};
              $scope.animes = data;
              console.log(data)
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
  }

}
