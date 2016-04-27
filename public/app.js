'use strict';

var app = angular.module('animeFfinityAPP', ['ngRoute']);

app.service('SearchResult', function () {
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
})
.service('LoggedUser', function () {
  var loggedUser = {nombre_usuario: "ROOT", usuarioID: 0};

  var setLoggedUser = function(user) {
      loggedUser = user;
  };

  var getLoggedUser = function(){
      return loggedUser;
  };

  return {
    setLoggedUser: setLoggedUser,
    getLoggedUser: getLoggedUser
  };
})
.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/views/mostRated.html',
          controller: 'MostRatedCtrl'
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

        .when('/profile', {
          templateUrl: 'views/profile.html',
          controller: 'PerfilUsuarioCtrl'
        })
        .otherwise({ redirectTo: '/' });
    }]
);