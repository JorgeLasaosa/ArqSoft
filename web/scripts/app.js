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

   app.controller('AudiovisualInformation', ['$http', function($http)
   {
      var anime = this;
      this.works = 
      [
         {
            "title": "Sen to Chihiro no kamikakushi",
            "start_year": 2001,
            "directors": 
            [
               {"name": "Hayao Miyazaki"}
            ],
            "casts":
            [
               {"name": "Chihiro Ogino"},
               {"name": "Haku"},
               {"name": "Akio Ogino"}
            ],
            "categories":
            [
               {"name": "anime"}
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

      $http.get('obras.json').success(function(data)
      {
         anime.works = data;
      });
   }]);

   app.controller("CookieHandler" , function($scope , $cookies)
   {
      $scope.formName = "";

      $scope.setCookieValue = function()
      {
         $cookies.loginName = $scope.formName;
      };

      $scope.getCookieValue = function()
      {
         return $cookies.loginName;
      };
   });

   app.controller("CookieGetter" , function($scope , $cookies)
   {
      $scope.loggedName = $cookies.loginName || "";

      $scope.clearCookieValue = function()
      {
         $cookies.loginName = "";
      };
   });
   
   app.directive("workThumbnail", function()
   {
      return {
         restrict: 'E',
         templateUrl: 'work-thumbnail.html',
         controller: function()
         {
            this.works = 
            [
               {
                  "title": "Sen to Chihiro no kamikakushi",
                  "start_year": 2001,
                  "directors": 
                  [
                     {"name": "Hayao Miyazaki"}
                  ],
                  "casts":
                  [
                     {"name": "Chihiro Ogino"},
                     {"name": "Haku"},
                     {"name": "Akio Ogino"}
                  ],
                  "categories":
                  [
                     {"name": "anime"}
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
         },
         controllerAs: 'work'
      };
   });
})();
