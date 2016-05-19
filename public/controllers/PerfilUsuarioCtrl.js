app.controller('PerfilUsuarioCtrl', function($rootScope, $scope, $http, $location, $timeout) {

    $scope.update = function() {
		$http.post("/update", {user: $rootScope.myUser, formData: $scope.formData})
		.success(function(loggedUser) {
      		$rootScope.myUser=loggedUser;
			console.log("Post /update Successful");
		})
		.error(function() {
			console.log("Error on post /update");
		});
	}

	$scope.delete = function() {
		$http.post("/delete", {user: $rootScope.myUser})
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
    $http.post("/userWorks", {usuarioID: $rootScope.myUser.usuarioID, state: $scope.selectUserWorks.state})
    .success(function(userWorks){
      $scope.works = userWorks;
      console.log("Post /userWorks Successful");
      $timeout(function(){
        $scope.works = userWorks;
      },0);
    })
    .error(function(){
      console.log("Error on post /userWorks");
    });
  }

  function userReviews(){
    $http.post("/userReviews", {usuarioID: $rootScope.myUser.usuarioID})
  	.success(function(data) {
  		console.log(data);
      $scope.reviews = data;
  		console.log("Post /userReviews Successful");
  	})
  	.error(function() {
  		console.log("Error on post /userReviews");
  	});
  }

  function soulMates(){
    $http.post("/soulmates", {usuarioID: $rootScope.myUser.usuarioID})
  	.success(function(soulmates) {
      console.log(soulmates);
      $scope.soulmates = soulmates;
  		console.log("Post /soulmates Successful");
      $timeout(function(){
        $scope.soulmates = soulmates;
      },0);
  	})
  	.error(function() {
  		console.log("Error on post /soulmates");
  	});
  }

  soulMates();
  userReviews();



});
