var app = angular.module('animeffinity');

app.controller('MostRatedCtrl', function($scope, $http) {
   $scope.works = [
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
});