'use strict';

angular.module('13thAgeCharacterBuilderApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/character', {
        templateUrl: 'views/character.html',
        controller: 'CharacterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
