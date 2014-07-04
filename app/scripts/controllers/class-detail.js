'use strict';

angular.module('13thAgeCharacterBuilderApp')
  .controller('ClassDetailCtrl', ['$scope', '$routeParams', 'Classes',
    function($scope, $routeParams, Classes) {
      $scope.race = Classes.get({classId: $routeParams.classId}, function(playerClass) {
        $scope.className = $routeParams.classId;
        $scope.bonuses = playerClass.bonuses;
      });

      $scope.test = 'test';
    }]);