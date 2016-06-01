app.controller('NavBarCtrl', function($scope, $location) {
    $scope.search = function(text, field) {
      if (typeof(text) === "undefined") {
        text = "title"
      }else{
        $location.path("/searchResult/" + field + "/" + text);
      }
	  }
});
