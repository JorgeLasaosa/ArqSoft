app.controller('PerfilUsuarioCtrl', function($rootScope, $scope, $http, $location, $timeout) {

    $scope.update = function() {
		$http.post("/update", {user: $rootScope.myUser, formData: $scope.formData})
		.success(function(data) {
      		$rootScope.myUser=data;
			console.log("Post /update Successful");
		})
		.error(function() {
			console.log("Error on post /update");
		})
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
		})
	}

  $scope.userWorks = function() {
    $http.post("/userWorks", {usuarioID: $rootScope.myUser.usuarioID, state: $scope.selectUserWorks.state})
    .success(function(data){
      console.log("Post /userWorks Successful");
      $timeout(function(){
        $scope.works = data;
      },0);
    })
    .error(function(){
      console.log("Error on post /userWorks");
    })
  }
	$http.post("/userReviews", {usuarioID: $rootScope.myUser.usuarioID})
	.success(function(data) {
		console.log(data);
    $scope.reviews = data;
		console.log("Post /userReviews Successful");
	})
	.error(function() {
		console.log("Error on post /userReviews");
	})

});
