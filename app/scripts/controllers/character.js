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

    $scope.character = {
      name: '',
      race: '',
      class: '',
      level: 1,
      attributes: [
        { name: 'str', value: 10 },
        { name: 'dex', value: 10 },
        { name: 'con', value: 10 },
        { name: 'int', value: 10 },
        { name: 'wis', value: 10 },
        { name: 'cha', value: 10 }
      ]
    };

    // Determine the attribute modifier
    $scope.attrMod = function(attr) {
      return parseInt(Math.floor((attr - 10) / 2), 10);
    };

    // Determine the attribute modifier + level
    $scope.attrModLvl = function(attr) {
      return $scope.attrMod(attr) + $scope.character.level;
    };
  });

