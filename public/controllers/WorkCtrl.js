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
        console.log("GET /api/workReviews not works");
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
        console.log("GET /api/review not works");
      }
    );
  }

  getMyState = function(){
    $http.get("/api/state/" + $rootScope.myUser.usuarioID + "/" + $routeParams.workId)
    .then(
      function(res){
        console.log(res);
        $scope.myState = res.data;
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

  $scope.setStateWorkAs = function(){
    $http.put("/api/setStateWork", {userID: $rootScope.myUser.usuarioID,
      workID: $routeParams.workId, state: $scope.state})
    .success(function(myReview){
      //Actualizar mi review
      $timeout(getMyState,0);
      console.log("PUT /api/setStateWork successful");
    })
    .error(function(){
      console.log("Error on PUT /api/setStateWork");
    });
  }

  $scope.predicate = 'fecha';
  $scope.reverse = true;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

  $scope.voteReview = function(reviewID, voto){
    console.log(voto);
    $http.put("/api/voteReview", {userID: $rootScope.myUser.usuarioID,
      reviewID: reviewID, vote: voto})
    .success(function(myReview){
      console.log("PUT /api/voteReview successful");
    })
    .error(function(){
      console.log("Error on PUT /api/voteReview");
    });
  }

  getWork();
  $timeout(getReviewsOfWork,0);

  if($rootScope.isLogged){
    $timeout(getMyReview,0);
    getMyState();
  }

});
