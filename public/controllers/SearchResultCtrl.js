app.controller('SearchResultCtrl', function($scope, $http, $routeParams) {

  $scope.predicate = 'fecha_inicio';
    $scope.reverse = true;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $http.get("/api/search/" + $routeParams.field + "/" + $routeParams.text)
      .then(
        function(res){
        	$scope.obras = res.data;
          console.log("GET /api/search successful");
        },
        function(res){
          console.log("Error on get /api/search");
        }
      );
});
