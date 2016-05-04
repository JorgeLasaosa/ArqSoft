app.controller('PerfilUsuarioCtrl', function($rootScope, $scope, $http, $location) {

    $scope.update = function() {
		$http.post("/update", {user: $rootScope.myUser, formData: $scope.formData})
		.success(function(data) {
      $rootScope.user=data;
			console.log("Post /update Successful");
		})
		.error(function() {
			console.log("Error on post /update");
		})
	}

	$scope.delete = function() {
		$http.post("/delete", {user: $rootScope.myUser})
		.success(function() {
      $rootScope.user = {};
      $rootScope.isLogged = false;
      $location.path("/");
			console.log("Post /delete Successful");
		})
		.error(function() {
			console.log("Error on post /delete");
		})
	}

	/*$http.post("/userReviews", {user: $rootScope.myUser})
	.success(function(data) {
		console.log(data);
		console.log("Post /userReviews Successful");
	})
	.error(function() {
		console.log("Error on post /userReviews");
	})*/
});
