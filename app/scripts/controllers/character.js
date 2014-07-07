'use strict';

angular.module('13thAgeCharacterBuilderApp')
  .controller('CharacterCtrl', function ($scope, Race, Classes) {

    var abilityCosts = {
      8:  0,
      9:  1,
      10: 2,
      11: 3,
      12: 4,
      13: 5,
      14: 6,
      15: 8,
      16: 10,
      17: 13,
      18: 16
    };

    function getMod(){
      /*jshint validthis:true */
      var mod = parseInt(Math.floor((this.value() - 10) / 2), 10);
      return mod;
    }

    function getModLvl(){
      /*jshint validthis:true */
      return this.mod() + parseInt($scope.character.level, 10);
    }

    function getValue(){
      /*jshint validthis:true */
      if($scope.character && (this.name === $scope.character.racialAbilityBonus || this.name === $scope.character.classAbilityBonus)){
        return this.baseValue + 2;
      } else {
        return this.baseValue;
      }
    }

    function initializeAttrs(attributes, start) {
      var attributeObjects = {};
      for (var attribute in attributes) {
        attributeObjects[attributes[attribute]] = { name: attributes[attribute], baseValue: start, value: getValue, mod: getMod, modPlusLvl: getModLvl };
      }
      return attributeObjects;
    }

    $scope.decrementAttr = function(attr) { attr.baseValue -= 1; };
    $scope.incrementAttr = function(attr) { attr.baseValue += 1; };

    $scope.races = Race.query();
    $scope.classes = Classes.query();
    $scope.attributes = ['str', 'con', 'dex', 'int', 'wis', 'cha'];

    $scope.character = {
      name: '',
      race: $scope.races.human,
      racialAbilityBonus: null,
      class: $scope.classes.fighter,
      classAbilityBonus: null,
      level: 1,
      attributes: initializeAttrs($scope.attributes, 8),
      abilityPoints: function(){
        var points = 28;
        for(var attribute in this.attributes) {
          points -= abilityCosts[this.attributes[attribute].baseValue];
        }
        return points;
      }
    };
  });

