app.controller('WorkCtrl', function($scope, $rootScope, $http, $routeParams, $timeout) {

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

  $scope.punctuateWork = function(){
    $http.post("/punctuateWork/",{usuarioID: $rootScope.myUser.usuarioID, workID: $routeParams.workId, textReview: null, punctuation: $scope.punctuation})
    .success(function(myPunctuation){
      $scope.myPunctuation = myPunctuation;
      console.log("Post /punctuateWork Successful");
    })
    .error(function(){
      console.log("Error on post /punctuateWork");
    });
  }

  $scope.setWorkAs = function(){

  }

  $scope.writeReview = function(){
    $http.post("/writeReview", {userID: $rootScope.myUser.usuarioID, workID: $routeParams.workId, textReview: $scope.textReview, punctuation: null})
    .success(function(myReview){
      //$scope.myReview = myReview;
      $timeout(getReviewsOfWork,0);
      console.log("Post /writeReview successful");
    })
    .error(function(){
      console.log("Error on post /writeReview");
    });
  }

  getWork();
  getReviewsOfWork();

});
