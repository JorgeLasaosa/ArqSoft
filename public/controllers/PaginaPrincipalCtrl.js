var app = angular.module('animeffinity');

app.controller('PaginaPrincipalCtrl', function($scope, $http, SearchResult, LoggedUser) {
	$scope.loggedUser = LoggedUser.getLoggedUser();
    $scope.search = function() {
		$http.post("/search", $scope.formData)
			.success(function(data) {
		  	 	SearchResult.setResult(data);
		     	console.log("Post /search successful");
		  	})
		  	.error(function() {
		     	console.log("Error on post /search");
		  	})
	}
});
