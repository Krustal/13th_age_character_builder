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
        controller: 'CharacterCtrl'
      })
      .when('/races/:raceId', {
        templateUrl: 'views/race-detail.html',
        controller: 'RaceDetailCtrl'
      })
      .otherwise({
        redirectTo: '/character'
      });
  });
