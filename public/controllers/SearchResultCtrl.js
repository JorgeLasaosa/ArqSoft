app.controller('SearchResultCtrl', function($scope, SearchResult) {
	$scope.obras = SearchResult.getResult();
});