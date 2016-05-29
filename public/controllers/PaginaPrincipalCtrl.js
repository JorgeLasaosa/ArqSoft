app.controller('PaginaPrincipalCtrl', function($scope, $http, $timeout) {

  mostRatedWorks = function(){
    $http.get("/api/mostRated")
    .then(
      function(res){
        console.log("GET /api/mostRated successful");
        $scope.mostRated = res.data;
      },
      function(res){
        console.log("Error on GET /api/mostRated");
      }
    );
  }

  mostReviewedWorks = function(){
    $http.get("/api/mostReviewed")
    .then(
      function(res){
        console.log("GET /api/mostReviewed successful");
        $scope.mostReviewed = res.data;
      },
      function(res){
        console.log("Error on GET /api/mostReviewed");
      }
    );
  }

  mostRatedWorks();
  $timeout(mostReviewedWorks,0);
});
