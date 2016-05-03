var app = angular.module('animeffinity');

app.controller('SearchCtrl', function($scope, $http, SearchResult, $location) {
    $scope.search = function() {
		$http.post("/search", $scope.formData)
			.success(function(data) {
			    console.log(data);
          //$location.path("/searchResult");
	  	    SearchResult.setResult(data);
	        console.log("Post /search successful");
		  })
		  .error(function() {
		     	console.log("Error on post /search");
		  })
	  }
});
