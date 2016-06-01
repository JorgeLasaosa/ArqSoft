app.controller('PerfilUsuarioCtrl', function($rootScope, $scope, $routeParams, $http) {

  userReviews = function(){
    $http.get("/api/userReviews/" + $routeParams.userId)
    .then(
      function(res){
        console.log(res);
        $scope.reviews = res.data;
        soulMates();
      },
      function(res){
        console.log("Error on GET /api/userReviews");
        soulMates();
      }
    );
  }

  soulMates = function(){
    $http.get("/api/soulmates/" + $routeParams.userId)
    .then(
      function(res){
        console.log(res);
        $scope.soulmates = res.data;
        getPublicInfoUser();
      },
      function(res){
        console.log("Error on GET /api/soulmates");
        getPublicInfoUser();
      }
    );
  }

  getPublicInfoUser = function(){
    $http.get("/api/user/" + $routeParams.userId)
    .then(
      function(res){
        console.log(res);
        $scope.theUser = res.data;
      },
      function(res){
        console.log("Error on GET /api/soulmates");
      }
    );
  }

  $scope.update = function(nombre, apellidos, email, imagen, password) {
    var a,b,c,d,e,f;
    try{
      b = password;
    }catch(ex){
      b = $rootScope.myUser.contraseña;
    }
    try{
      c = nombre;
    }catch(ex){
      c = $rootScope.myUser.nombre;
    }
    try{
      d = apellidos;
    }catch(ex){
      d = $rootScope.myUser.apellidos;
    }
    try{
      e = email;
    }
    catch(ex){
      e = $rootScope.myUser.correo_electronico;
    }
    try{
      f = imagen;
    }catch(ex){
      f = $rootScope.myUser.imagen;
    }
		$http.put("/api/user", {usuarioID: $rootScope.myUser.usuarioID, username: $rootScope.myUser.username,
      password: b, nombre: c, apellidos: d, email: e, imagen: f})
		.success(function(loggedUser) {
      		getPublicInfoUser();
			console.log("Post /update Successful");
		})
		.error(function() {
			console.log("Error on post /update");
		});
	}

	$scope.delete = function() {
		$http.delete("/api/user", {user: $rootScope.myUser})
		.success(function() {
      		$rootScope.myUser = {};
      		$rootScope.isLogged = false;
      		$location.path("/");
			console.log("Post /delete Successful");
		})
		.error(function() {
			console.log("Error on post /delete");
		});
	}

  $scope.userWorks = function() {
    $http.get("/api/userWorks/" + $routeParams.userId + "/" +$scope.selectUserWorks.state)
    .then(
      function(res){
          $scope.works = res.data;
        console.log("GET /api/userWorks Successful");
      },
      function(res){
        console.log("Error on GET /api/userWorks");
      }
    );
  }

  userReviews();


});
