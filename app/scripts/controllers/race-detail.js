'use strict';

angular.module('13thAgeCharacterBuilderApp')
  .controller('RaceDetailCtrl', ['$scope', '$routeParams', 'Race',
    function($scope, $routeParams, Race) {
      $scope.race = Race.get({raceId: $routeParams.raceId}, function(race) {
        $scope.raceName = $routeParams.raceId;
        $scope.bonuses = race.bonuses;
      });

      $scope.test = 'test';
    }]);