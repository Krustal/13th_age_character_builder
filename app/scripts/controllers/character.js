'use strict';

angular.module('13thAgeCharacterBuilderApp')
  .controller('CharacterCtrl', function ($scope) {
    function modifierFunc(baseAttr){
      return function(){
        $scope.updateAttribute(baseAttr);
      };
    }

    $scope.updateAttribute = function(attribute) {
      var base = parseInt(attribute.value, 10),
        level = parseInt($scope.level, 10),
        mod;
      // update attribute modifier
      attribute.mod = Math.floor((base - 10) / 2);
      mod = parseInt(attribute.mod, 10);
      // update attribute modifier + level
      attribute.modLvl = mod + level;
    };

    $scope.level = 1;
    $scope.attributes = {};
    $scope.attributeOrder = ['str', 'con', 'dex', 'int', 'wis', 'cha'];
    for(var i in $scope.attributeOrder) {
      var attribute = $scope.attributeOrder[i];
      $scope.attributes[attribute] = {};
      var attr = $scope.attributes[attribute];
      attr.value = 10;

      // When the value of an attribute changes, update its modifier
      $scope.$watch('attributes.' + attribute + '.value',
        modifierFunc(attr));
    }

    $scope.$watch('level', function(){
      for(var i in $scope.attributeOrder){
        var attribute = $scope.attributeOrder[i];

        var mod = parseInt($scope.attributes[attribute].mod, 10);
        $scope.attributes[attribute].modLvl = mod + parseInt($scope.level, 10);
      }
    });
  });

