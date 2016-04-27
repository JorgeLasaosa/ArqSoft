app.controller('PerfilUsuarioCtrl', function($scope, $http, LoggedUser) {
    $scope.update = function() {
		$http.post("/update", {user: LoggedUser.getLoggedUser(), formData: $scope.formData})
		.success(function(data) {
			console.log(data);
			console.log("User updated");
			console.log("Post /update Successful");
		})
		.error(function() {
			console.log("Error on post /update");
		})
	}

	$scope.delete = function() {
		$http.post("/delete", {user: LoggedUser.getLoggedUser()})
		.success(function() {
			console.log("Post /delete Successful");
		})
		.error(function() {
			console.log("Error on post /delete");
		})
	}
	
	$http.post("/userReviews", {user: LoggedUser.getLoggedUser()})
	.success(function(data) {
		console.log(data);
		console.log("Post /userReviews Successful");
	})
	.error(function() {
		console.log("Error on post /userReviews");
	})
});