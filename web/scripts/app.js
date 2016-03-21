/* global angular */

(function()
{
   var app = angular.module('animeFfinityAPP', ['ngCookies']);

   // Version 1.3.20
   app.controller("CookieHandler" , function($scope , $cookies)
   {
      $scope.formName = "";
      $scope.loggedName = $cookies.loginName || "";

      $scope.setCookieValue = function()
      {
         $cookies.loginName = $scope.formName;
      };

      $scope.clearCookieValue = function()
      {
         $cookies.loginName = "";
      };
   });

   // Version 1.5.0
   app.controller('LoginCookieHandler', ['$cookies', function($cookies)
   {
      this.loginName = "";
      this.loggedName = $cookies.get('loginName') || "Tomas";

      this.setCookieValue = function()
      {
         $cookies.put('loginName', this.loginName);
      };

      this.clearCookieValue = function()
      {
         $cookies.remove('loginName');
      };
   }]);

   app.controller('FrameSelector', function()
   {
      this.frameSelected = 'start.html';

      this.selectFrame = function(frame)
      {
         this.frameSelected = frame;
      };

      this.selectedFrame = function()
      {
         return this.frameSelected;
      };
   });

   app.controller('PanelSelector', function()
   {
      this.panelSelected = 1;

      this.selectPanel = function(panel)
      {
         this.panelSelected = panel;
      };

      this.selectedPanel = function(panel)
      {
         return this.panelSelected === panel;
      };
   });

   app.controller('WorksTemplate', function()
   {
      this.data = works;
   });

   app.controller('UserTemplate', function()
   {
      this.data = user;
   });

   app.directive('searchThumbnail', function()
   {
      return {
         templateUrl: "search-thumbnail.html"
      };
   });

   app.directive('mostRatedThumbnail', function()
   {
      return {
         templateUrl: "most-rated-thumbnail.html"
      };
   });

   app.directive('mostReviewedThumbnail', function()
   {
      return {
         templateUrl: "most-reviewed-thumbnail.html"
      };
   });

   app.directive('newArrivalsThumbnail', function()
   {
      return {
         templateUrl: "new-arrivals-thumbnail.html"
      };
   });

   var user =
   [
      {
         "name": "Tomas",
         "surname": "Doe",
         "email": "amanterechoncho@aol.es",
         "username": "neo_homero"
      }
   ];

   var works =
   [
      {
         "title": "Sen to Chihiro no kamikakushi",
         "directors":
         [
            {"name": "Hayao Miyazaki"}
         ],
         "casts":
         [
            {"name": "Chihiro Ogino"},
            {"name": "Haku"},
            {"name": "Akio Ogino"}
         ]
      },
      {
         "title": "Naruto",
         "start_year": 2002,
         "end_year": 2007,
         "directors":
         [
            {"name": "Masashi Kishimoto"},
            {"name": "Mary Elizabeth"}
         ],
         "casts":
         [
            {"name": "Naruto Uzumaki"},
            {"name": "Sakura Haruno"},
            {"name": "Kakashi Hatake"},
            {"name": "Ino Yamanaka"},
            {"name": "Shikamaru Nara"}
         ],
         "categories":
         [
            {"name": "anime"}
         ]
      },
      {
         "title": "Dragon Ball Z",
         "start_year": 1996,
         "end_year": 2003,
         "directors":
         [
            {"name": "Daisuke Nishio"}
         ],
         "casts":
         [
            {"name": "Goku"},
            {"name": "Vegeta"}
         ],
         "categories":
         [
            {"name": "anime"}
         ]
      },
      {
         "title": "Hotaru no haka",
         "start_year": 1988,
         "directors":
         [
            {"name": "Isao Takahata"}
         ],
         "casts":
         [
            {"name": "Seita"},
            {"name": "Setsuko"},
            {"name": "Mother"},
            {"name": "Aunt"}
         ],
         "categories":
         [
            {"name": "anime"}
         ]
      },
      {
         "title": "Tonari no Totoro",
         "start_year": 1988,
         "directors":
         [
            {"name": "Hayao Miyazaki"}
         ],
         "casts":
         [
            {"name": "Mei"},
            {"name": "Totoro"},
            {"name": "Satsuki"}
         ],
         "categories":
         [
            {"name": "anime"}
         ]
      },
      {
         "title": "Hauru no ugoku shiro",
         "start_year": 2004,
         "directors":
         [
            {"name": "Hayao Miyazaki"},
            {"name": "Diana Wynne Jones"}
         ],
         "casts":
         [
            {"name": "Sofî"}
         ],
         "categories":
         [
            {"name": "anime"}
         ]
      }
   ];
})();
