app.controller('NavBarCtrl', function($rootScope, $scope, $http, $location, $timeout) {
    $scope.search = function() {
		$http.get("/api/search/" + $scope.formData.search_field + "/" + $scope.formData.search_text)
      .then(
        function(res){
          console.log(res);
          $location.path("/searchResult");
          $timeout(function(){
        		$rootScope.obras = res.data;
        	}, 0);
          console.log("GET /api/search successful");
        },
        function(res){
          console.log("Error on get /api/search");
        }
      );
	  }
});
