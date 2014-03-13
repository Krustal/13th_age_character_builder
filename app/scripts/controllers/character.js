'use strict';

angular.module('13thAgeCharacterBuilderApp')
  .controller('CharacterCtrl', function ($scope) {

    $scope.attributes = ['str', 'con', 'dex', 'int', 'wis', 'cha'];

    $scope.races = [
      {
        name: 'Human',
        bonuses: $scope.attributes,
        powers: {},
        feats: {},
        abilities: {}
      },
      {
        name: 'Dwarf',
        bonuses: ['con', 'wis'],
        powers: {},
        feats: {},
        abilities: {}
      },
      {
        name: 'Dark Elf',
        bonuses: ['dex', 'cha'],
        powers: {},
        feats: {},
        abilities: {}
      },
      {
        name: 'High Elf',
        bonuses: ['int', 'cha'],
        powers: {},
        feats: {},
        abilities: {}
      },
      {
        name: 'Wood Elf',
        bonuses: ['dex', 'wis'],
        powers: {},
        feats: {},
        abilities: {}
      },
      {
        name: 'Gnome',
        bonuses: ['dex', 'int'],
        powers: {},
        feats: {},
        abilities: {}
      },
      {
        name: 'Half-elf',
        bonuses: ['con', 'cha'],
        powers: {},
        feats: {},
        abilities: {}
      },
      {
        name: 'Halfling',
        bonuses: ['con', 'dex'],
        powers: {},
        feats: {},
        abilities: {}
      },
      {
        name: 'Half-orc',
        bonuses: ['str', 'dex'],
        powers: {},
        feats: {},
        abilities: {}
      }
    ];

    $scope.classes = [
      { name: 'Barbarian', bonuses: ['str', 'con'], talents: {}, spells: {}, powers: {}, feats: {} },
      { name: 'Bard', bonuses: ['dex', 'cha'], talents: {}, spells: {}, powers: {}, feats: {}      },
      { name: 'Cleric', bonuses: ['str', 'wis'], talents: {}, spells: {}, powers: {}, feats: {}    },
      { name: 'Fighter', bonuses: ['str', 'con'], talents: {}, spells: {}, powers: {}, feats: {}   },
      { name: 'Paladin', bonuses: ['str', 'cha'], talents: {}, spells: {}, powers: {}, feats: {}   },
      { name: 'Ranger', bonuses: ['str', 'dex', 'wis'], talents: {}, spells: {}, powers: {}, feats: {}    },
      { name: 'Rogue', bonuses: ['dex', 'cha'], talents: {}, spells: {}, powers: {}, feats: {}     },
      { name: 'Sorcerer', bonuses: ['cha', 'con'], talents: {}, spells: {}, powers: {}, feats: {}  },
      { name: 'Wizard', bonuses: ['int', 'wis'], talents: {}, spells: {}, powers: {}, feats: {}    }
    ];

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
      race: $scope.races[0],
      racialAbilityBonus: null,
      class: $scope.classes[0],
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

