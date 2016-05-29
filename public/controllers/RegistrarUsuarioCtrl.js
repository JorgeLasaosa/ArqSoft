app.controller('RegistrarUsuarioCtrl', function($scope, $http, $location) {
    $scope.register = function() {
  		$http.post("/api/user", $scope.formData)
    		.success(function() {
          $location.path("/");
    			console.log("POST /api/user Successful");
    		})
    		.error(function() {
    			console.log("Error on POST /api/user");
    		})
	  }
});
