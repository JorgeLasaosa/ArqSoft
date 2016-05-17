app.controller('MostRatedCtrl', function($scope, $http) {
  mostRatedWorks = function(){
    $http.post("/mostRated")
      .success(function(data) {
          console.log(data);
          $scope.mostRated = data;
          console.log("Post /mostRated successful");
      })
      .error(function() {
          console.log("Error on post /mostRated");
      })
  }

mostRatedWorks();

     /*$http.post("/mostReviewed")
     .success(function(data) {
         console.log(data);
         $scope.mostReviewed = data;
         console.log("Post /mostReviewed successful");
     })
     .error(function() {
         console.log("Error on post /mostReviewed");
     })*/
});
