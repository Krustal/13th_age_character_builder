'use strict';

angular.module('13thAgeCharacterBuilderApp')
  .controller('CharacterCtrl', function ($scope, Race, Classes) {
    $scope.attributes = ['str', 'con', 'dex', 'int', 'wis', 'cha'];

    $scope.races = Race.query();

    $scope.classes = Classes.query();

    function getMod(){
      /*jshint validthis:true */
      var mod = parseInt(Math.floor((this.value - 10) / 2), 10);
      if(this.name === $scope.character.racialAbilityBonus || this.name === $scope.character.classAbilityBonus){
        mod += 2;
      }
      return mod;
    }

    function getModLvl(){
      /*jshint validthis:true */
      return this.mod() + parseInt($scope.character.level, 10);
    }

    $scope.character = {
      name: '',
      race: $scope.races.human,
      racialAbilityBonus: null,
      class: $scope.classes.fighter,
      classAbilityBonus: null,
      level: 1,
      attributes: [
        { name: 'str', value: 10, mod: getMod, modPlusLvl: getModLvl },
        { name: 'dex', value: 10, mod: getMod, modPlusLvl: getModLvl },
        { name: 'con', value: 10, mod: getMod, modPlusLvl: getModLvl },
        { name: 'int', value: 10, mod: getMod, modPlusLvl: getModLvl },
        { name: 'wis', value: 10, mod: getMod, modPlusLvl: getModLvl },
        { name: 'cha', value: 10, mod: getMod, modPlusLvl: getModLvl }
      ]
    };
  });

