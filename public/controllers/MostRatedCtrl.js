app.controller('MostRatedCtrl', function($scope, $http) {
  var formData = { search_text: 'he', search_field: 'all'};
   $http.post("/search", formData)
     .success(function(data) {
         console.log(data);
         $scope.works = data;
         console.log("Post /search successful");
     })
     .error(function() {
         console.log("Error on post /search");
     })
});
