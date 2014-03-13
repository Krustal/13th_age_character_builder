'use strict';

angular.module('13thAgeCharacterBuilderApp')
  .controller('CharacterCtrl', function ($scope) {

    $scope.races = [
      { name: 'Human'     },
      { name: 'Dwarf'     },
      { name: 'Dark Elf'  },
      { name: 'High Elf'  },
      { name: 'Wood Elf'  },
      { name: 'Gnome'     },
      { name: 'Half-elf'  },
      { name: 'Halfling'  },
      { name: 'Half-orc'  }
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
      return parseInt(Math.floor((this.value - 10) / 2), 10);
    }

    function getModLvl(){
      /*jshint validthis:true */
      return this.mod() + $scope.character.level;
    }

    $scope.character = {
      name: '',
      race: '',
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

