app.controller('SearchResultCtrl', function($scope, $http, $timeout) {

  $scope.predicate = 'fecha_inicio';
    $scope.reverse = true;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };
});
