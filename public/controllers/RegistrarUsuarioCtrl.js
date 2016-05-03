app.controller('RegistrarUsuarioCtrl', function($scope, $http) {
    $scope.register = function() {
  		$http.post("/register", $scope.formData)
    		.success(function() {
    			console.log("Post /register Successful");
    		})
    		.error(function() {
    			console.log("Error on post /register");
    		})
	  }
});
