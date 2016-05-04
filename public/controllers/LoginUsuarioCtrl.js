app.controller('LoginUsuarioCtrl', function($rootScope, $scope, $http, $location) {
  
    $scope.login = function() {
		$http.post("/login", $scope.formData)
		.success(function(data) {
      console.log("Post /login Successful");
      if(data.length != 0){
        $rootScope.myUser = data;
        $rootScope.isLogged = true;
        $location.path("/");
  			console.log("User exists");
        $scope.error = {
          msg : '',
          isError : false
        }
      }else{
        console.log("User not exists");
        $scope.error = {
          msg : 'Usuario incorrecto',
          isError : true
        }
      }
		})
		.error(function() {
			console.log("Error on post /login");
		})
	}

  $scope.logout = function(){
    $rootScope.myUser = {};
    $rootScope.isLogged = false;
  }
});
