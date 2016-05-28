app.controller('NavBarCtrl', function($rootScope, $scope, $http, $location, $timeout) {
    $scope.search = function() {
		$http.post("/search", $scope.formData)
			.success(function(data) {
			    console.log(data);
          $location.path("/searchResult");
          $timeout(function(){
        		$rootScope.obras = data;
        	}, 0);
	        console.log("Post /search successful");
		  })
		  .error(function() {
		     	console.log("Error on post /search");
		  })
	  }
});
