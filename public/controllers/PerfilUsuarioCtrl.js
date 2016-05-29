app.controller('PerfilUsuarioCtrl', function($rootScope, $scope, $routeParams, $http, $location, $timeout) {

  userReviews = function(){
    $http.get("/api/userReviews/" + $routeParams.userId)
    .then(
      function(res){
        console.log(res);
        $scope.reviews = res.data;
      },
      function(res){
        console.log("Error on GET /api/userReviews");
      }
    );
  }

  soulMates = function(){
    $http.get("/api/soulmates/" + $routeParams.userId)
    .then(
      function(res){
        console.log(res);
        $scope.soulmates = res.data;
      },
      function(res){
        console.log("Error on GET /api/soulmates");
      }
    );
  }

  getPublicInfoUser = function(){
    $http.get("/api/user/" + $routeParams.userId)
    .then(
      function(res){
        console.log(res);
        $scope.theUser = res.data;
      },
      function(res){
        console.log("Error on GET /api/soulmates");
      }
    );
  }

  $scope.update = function() {
		$http.put("/api/user", {user: $rootScope.myUser, formData: $scope.formData})
		.success(function(loggedUser) {
      		$rootScope.myUser=loggedUser;
			console.log("Post /update Successful");
		})
		.error(function() {
			console.log("Error on post /update");
		});
	}

	$scope.delete = function() {
		$http.delete("/api/user", {user: $rootScope.myUser})
		.success(function() {
      		$rootScope.myUser = {};
      		$rootScope.isLogged = false;
      		$location.path("/");
			console.log("Post /delete Successful");
		})
		.error(function() {
			console.log("Error on post /delete");
		});
	}

  $scope.userWorks = function() {
    $http.get("/api/userWorks/" + $routeParams.userId + "/" +$scope.selectUserWorks.state)
    .then(
      function(res){
        $timeout(function(){
          $scope.reviews = res.data;
        },0);
        console.log("GET /api/userWorks Successful");
      },
      function(res){
        console.log("Error on GET /api/userWorks");
      }
    );
  }


  soulMates();
  userReviews();
  getPublicInfoUser();


});
