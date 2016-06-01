app.controller('PaginaPrincipalCtrl', function($scope, $http) {

  mostRatedWorks = function(){
    $http.get("/api/mostRated")
    .then(
      function(res){
        console.log("GET /api/mostRated successful");
        $scope.mostRated = res.data;
        mostReviewedWorks();
      },
      function(res){
        console.log("Error on GET /api/mostRated");
        mostReviewedWorks();
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

});
