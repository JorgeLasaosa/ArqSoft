'use strict';

var app = angular.module('animeffinity', ['ngRoute']);

/*app.service('SearchResult', function () {
  var result = [];

  var setResult = function(newResult) {
      result = newResult;
  };

  var getResult = function(){
      return result;
  };

  return {
    setResult: setResult,
    getResult: getResult
  };
});*/

app.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/views/principal.html',
          controller: 'PaginaPrincipalCtrl'
        })

        .when('/register', {
          templateUrl: '/views/register.html',
          controller: 'RegistrarUsuarioCtrl'
       })

        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginUsuarioCtrl'
        })

        .when('/searchResult', {
          templateUrl: 'views/searchResult.html',
          controller: 'SearchResultCtrl'
        })

        .when('/user/:userId', {
          templateUrl: 'views/profile.html',
          controller: 'PerfilUsuarioCtrl'
        })

        .when('/work/:workId', {
          templateUrl: 'views/work.html',
          controller: 'WorkCtrl'
        })

        .otherwise({ redirectTo: '/' });
    }]
);
