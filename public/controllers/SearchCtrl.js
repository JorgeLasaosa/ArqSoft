app.controller('SearchCtrl', function($scope, $http, SearchResult) {
    $scope.search = function() {
		$http.post("/search", $scope.formData)
			.success(function(data) {
			    console.log(data);
          //$location.path("/searchResult"); add location to app.controller later
	  	    SearchResult.setResult(data);
	        console.log("Post /search successful");
		  })
		  .error(function() {
		     	console.log("Error on post /search");
		  })
	  }
});
