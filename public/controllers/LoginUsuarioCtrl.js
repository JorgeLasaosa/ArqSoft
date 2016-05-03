app.controller('LoginUsuarioCtrl', function($scope, $http, LoggedUser) {
      $scope.login = function() {
		$http.post("/login", $scope.formData)
		.success(function(data) {
			LoggedUser.setLoggedUser(data);
			console.log(data);
			console.log("Logged User: " + data.nombre_usuario);
			console.log("Post /login Successful");
		})
		.error(function() {
			console.log("Error on post /login");
		})
	}
});
