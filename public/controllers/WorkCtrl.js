app.controller('WorkCtrl', function($scope, $http, $routeParams) {

  getWork = function(){
    $http.get("/work/" + $routeParams.workId)
    .then(
      function(res){
        console.log(res);
        $scope.work = res.data;
      },
      function(res){
        console.log("Work not works");
      }
    );
  }

  getReviewsOfWork = function(){
    $http.get("/workReviews/" + $routeParams.workId)
    .then(
      function(res){
        console.log(res);
        $scope.reviews = res.data;
      },
      function(res){
        console.log("WorkReviews not works");
      }
    );
  }

  getWork();
  getReviewsOfWork();

});
