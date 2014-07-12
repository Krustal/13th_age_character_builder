'use strict';

angular.module('13thAgeCharacterBuilderApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'thirteenthAgeServices'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/character', {
        templateUrl: 'views/character.html',
        controller: 'CharacterCtrl',
        resolve: {
          races: function(Race) {
            return Race.query();
          },
          classes: function(Classes) {
            return Classes.query();
          }
        }
      })
      .when('/races/:raceId', {
        templateUrl: 'views/race-detail.html',
        controller: 'RaceDetailCtrl'
      })
      .when('/classes/:classId', {
        templateUrl: 'views/class-detail.html',
        controller: 'ClassDetailCtrl'
      })
      .otherwise({
        redirectTo: '/character'
      });
  });
