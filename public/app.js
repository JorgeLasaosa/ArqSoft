'use strict';

var app = angular.module('animeffinity', ['ngRoute']);

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
});

app.service('LoggedUser', function () {

  var loggedUser = {
    nombre_usuario: 'root',
    usuarioID: '',
    contraseña: '',
    nombre: '',
    apellidos: '',
    correo_electronico: '',
    imagen: null
  };

  var isLogged = false;

  var setLoggedUser = function(user) {
      loggedUser = user;
      isLogged = true;
  };

  var getLoggedUser = function(){
      return loggedUser;
  };

  var isLogged = function(){
    return isLogged;
  }

  return {
    setLoggedUser: setLoggedUser,
    getLoggedUser: getLoggedUser,
    isLogged: isLogged
  };
});

app.config(['$routeProvider', function ($routeProvider) {
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
