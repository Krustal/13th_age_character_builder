'use strict';

angular.module('13thAgeCharacterBuilderApp')
  .controller('CharacterCtrl', function ($scope) {

    $scope.attributes = ['str', 'con', 'dex', 'int', 'wis', 'cha'];

    $scope.races = [
      { name: 'Human',    bonuses: $scope.attributes },
      { name: 'Dwarf',    bonuses: ['con', 'wis'] },
      { name: 'Dark Elf', bonuses: ['dex', 'cha'] },
      { name: 'High Elf', bonuses: ['int', 'cha'] },
      { name: 'Wood Elf', bonuses: ['dex', 'wis'] },
      { name: 'Gnome',    bonuses: ['dex', 'int'] },
      { name: 'Half-elf', bonuses: ['con', 'cha'] },
      { name: 'Halfling', bonuses: ['con', 'dex'] },
      { name: 'Half-orc', bonuses: ['str', 'dex'] }
    ];

    $scope.classes = [
      { name: 'Barbarian' },
      { name: 'Bard'      },
      { name: 'Cleric'    },
      { name: 'Fighter'   },
      { name: 'Paladin'   },
      { name: 'Ranger'    },
      { name: 'Rogue'     },
      { name: 'Sorcerer'  },
      { name: 'Wizard'    }
    ];

    function getMod(){
      /*jshint validthis:true */
      var mod = parseInt(Math.floor((this.value - 10) / 2), 10);
      if(this.name === $scope.character.racialAbilityBonus){
        mod += 2;
      }
      return mod;
    }

    function getModLvl(){
      /*jshint validthis:true */
      return this.mod() + $scope.character.level;
    }

    $scope.character = {
      name: '',
      race: $scope.races[0],
      racialAbilityBonus: '',
      class: '',
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

