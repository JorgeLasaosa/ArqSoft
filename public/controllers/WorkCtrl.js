app.controller('WorkCtrl', function($scope, $rootScope, $http, $routeParams) {

  getWork = function(){
    $http.get("/api/work/" + $routeParams.workId)
    .then(
      function(res){
        console.log(res);
        $scope.work = res.data;
        getCharacters();
      },
      function(res){
        console.log("Error on GET /api/work");
        getCharacters();
      }
    );
  }

  getCharacters = function(){
    $http.get("/api/work/characters/" + $routeParams.workId)
    .then(
      function(res){
        console.log(res);
        $scope.characters = res.data;
        getAuthors();
      },
      function(res){
        console.log("Error on GET /api/work");
        getAuthors();
      }
    );
  }

  getAuthors = function(){
    $http.get("/api/work/authors/" + $routeParams.workId)
    .then(
      function(res){
        console.log(res);
        $scope.authors = res.data;
        getGenres();
      },
      function(res){
        console.log("Error on GET /api/work");
        getGenres();
      }
    );
  }

  getGenres = function(){
    $http.get("/api/work/genres/" + $routeParams.workId)
    .then(
      function(res){
        console.log(res);
        $scope.genres = res.data;
        getReviewsOfWork();
      },
      function(res){
        console.log("Error on GET /api/work");
        getReviewsOfWork();
      }
    );
  }

  getReviewsOfWork = function(){
    $http.get("/api/workReviews/" + $routeParams.workId)
    .then(
      function(res){
        console.log(res);
        $scope.reviews = res.data;
        if($scope.isLogged){
          getMyReview();
        }
      },
      function(res){
        console.log("Error on GET /api/workReviews");
        if($scope.isLogged){
          getMyReview();
        }
      }
    );
  }

  getMyReview = function(){
    $http.get("/api/review/" + $routeParams.workId + "/" + $rootScope.myUser.usuarioID)
    .then(
      function(res){
        console.log(res);
        $scope.myReview = res.data;
        if($scope.isLogged){
          getMyState();
        }
      },
      function(res){
        console.log("Error on GET /api/review");
        if($scope.isLogged){
          getMyState();
        }
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
        console.log("Error on GET /api/state");
      }
    );
  }

  $scope.comments = new Array();
  $scope.showComments = function(reviewID){
    $http.get("/api/comment/" + reviewID)
    .then(
      function(res){
        console.log(res);
        $scope.comments[reviewID] = res.data;
      },
      function(res){
        console.log("Error on GET /api/comment");
      }
    );
  }

  $scope.hideComments = function(reviewID){
    $scope.comments[reviewID] = null;
  }

  $scope.writeComment = function(reviewID){
    $http.post("/api/comment", {userID: $rootScope.myUser.usuarioID,
      reviewID: reviewID, text: $scope.textComment})
    .success(function(myComment){
      console.log("POST /api/writeComment successful");
    })
    .error(function(){
      console.log("Error on POST /api/writeComment");
    });
  }

  $scope.punctuateWork = function(){
    $http.put("/api/punctuateWork/",{userID: $rootScope.myUser.usuarioID,
      workID: $routeParams.workId, punctuation: $scope.punctuation})
    .success(function(){
      getMyReview();
      console.log("PUT /api/punctuateWork Successful");
    })
    .error(function(){
      console.log("Error on PUT /api/punctuateWork");
    });
  }

  $scope.writeReview = function(){
    $http.post("/api/writeReview", {userID: $rootScope.myUser.usuarioID,
      workID: $routeParams.workId, textReview: $scope.textReview, punctuation: $scope.punctuation}) //TODO modificar para no necesitar el punctuation
    .success(function(myReview){
      //$scope.myReview = myReview;
      getReviewsOfWork();
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
      getMyState();
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
      //getReviewsOfWork();
    })
    .error(function(){
      console.log("Error on PUT /api/voteReview");
    });
  }

  getWork();


});
