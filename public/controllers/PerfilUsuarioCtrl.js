app.controller('PerfilUsuarioCtrl', function($rootScope, $scope, $http, $location) {

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
  $scope.userWorks = function(){
    $http.post("/userWorks", {usuarioID: $rootScope.myUser.usuarioID, state: $scope.selectUserWorks.state})
    .success(function(userWorks){
      $scope.works = userWorks;
      console.log("Post /userWorks Successful");
    })
    .error(function(){
      console.log("Error on post /userWorks");
    });
  }
	$http.post("/userReviews", {usuarioID: $rootScope.myUser.usuarioID})
	.success(function(userReviews) {
    	$scope.reviews = userReviews;
		console.log("Post /userReviews Successful");
	})
	.error(function() {
		console.log("Error on post /userReviews");
	});

	/*
	$http.post("/soulmates", {usuarioID: $rootScope.myUser.usuarioID})
	.success(function(soulmates) {
		console.log(soulmates);
    	$scope.almas = soulmates;
		console.log("Post /soulmates Successful");
	})
	.error(function() {
		console.log("Error on post /soulmates");
	});
	*/

});
