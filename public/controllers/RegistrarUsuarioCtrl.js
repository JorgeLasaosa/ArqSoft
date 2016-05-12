app.controller('RegistrarUsuarioCtrl', function($scope, $http, $location) {
    $scope.register = function() {
  		$http.post("/register", $scope.formData)
    		.success(function() {
          $location.path("/");
    			console.log("Post /register Successful");
    		})
    		.error(function() {
    			console.log("Error on post /register");
    		})
	  }
});
