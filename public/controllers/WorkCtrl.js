app.controller('WorkCtrl', function($scope, $rootScope, $http, $routeParams, $timeout) {

  getWork = function(){
    $http.get("/api/work/" + $routeParams.workId)
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
    $http.get("/api/workReviews/" + $routeParams.workId)
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

  getMyReview = function(){
    $http.get("/api/review/" + $routeParams.workId + "/" + $rootScope.myUser.usuarioID)
    .then(
      function(res){
        console.log(res);
        $scope.myReview = res.data;
      },
      function(res){
        console.log("WorkReviews not works");
      }
    );
  }

  $scope.punctuateWork = function(){
    $http.put("/api/punctuateWork/",{usuarioID: $rootScope.myUser.usuarioID,
      workID: $routeParams.workId, punctuation: $scope.punctuation})
    .success(function(){
      $timeout(getMyReview, 0);
      console.log("Post /punctuateWork Successful");
    })
    .error(function(){
      console.log("Error on post /punctuateWork");
    });
  }

  $scope.setWorkAs = function(){

  }

  $scope.writeReview = function(){
    $http.post("/api/writeReview", {userID: $rootScope.myUser.usuarioID,
      workID: $routeParams.workId, textReview: $scope.textReview, punctuation: null}) //TODO modificar para no necesitar el punctuation
    .success(function(myReview){
      //$scope.myReview = myReview;
      $timeout(getReviewsOfWork,0);
      $timeout(getMyReview,0);
      console.log($scope.textReview);
      console.log("Post /writeReview successful");
    })
    .error(function(){
      console.log("Error on post /writeReview");
    });
  }

  getWork();
  getReviewsOfWork();

  if($rootScope.isLogged){
    getMyReview();
  }

});
