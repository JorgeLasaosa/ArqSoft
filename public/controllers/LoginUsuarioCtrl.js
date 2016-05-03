app.controller('LoginUsuarioCtrl', function($rootScope, $scope, $http, LoggedUser, $location) {
      $scope.login = function() {
		$http.post("/login", $scope.formData)
		.success(function(data) {
			LoggedUser.setLoggedUser(data);
      $location.path("/");
			console.log("Logged User: " + $scope.formData);
			console.log("Post /login Successful");
		})
		.error(function() {
			console.log("Error on post /login");
		})
	}
});
