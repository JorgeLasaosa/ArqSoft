(function()
{
   var app = angular.module('anime', ['ngCookies']);

   app.controller('LoginCookiePutter', function()
   {
      var name;
      this.putName = function()
      {
         $cookies.put('name', this.name);
      };
   });

   app.controller('CookieCtrl', function ($scope, $rootScope, $cookieStore)
   {
      $scope.bump = function ()
      {
         var lastVal = $cookieStore.get('lastValue');
         if (!lastVal)
         {
            $rootScope.lastVal = 1;
         }
         else
         {
            $rootScope.lastVal = lastVal + 1;
         }

         $cookieStore.put('lastValue', $rootScope.lastVal);
      }
   });

   app.controller('LoginCookieGetter', ['$cookies', function($cookies)
   {
      var name = $cookies.get('name');
   }]);

   app.controller('AudiovisualInformation', function($scope, $http)
   {
      $http.get("obras.json").successs(function(data)
      {
         $scope.AVInformation = data;
      });
   });
})();
