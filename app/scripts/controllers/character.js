'use strict';

angular.module('13thAgeCharacterBuilderApp')
  .service('characterService', function(){

    this.abilities = {
      strength:     8,
      dexterity:    8,
      wisdom:       8,
      intelligence: 8,
      charisma:     8,
      constitution: 8
    };

    this.race =           undefined;
    this.charClass =      undefined;
    this.oneUniqueThing = undefined;
    this.iconRelationships = {}; // how many points to distribute is provided by another service.
    this.backgrounds = {}; // how many per level is provided by another service
    this.feats = [];

    this.modifiers = {
      adders: [],
      multipliers: []
    };

    /**
     * Sets the character service ability scores either individually by passing
     * a string for the ability and a number for the score or passing an object
     * that sets multiple ability scores.
     *
     * characterService.setAbility({ strength: 10, dexterity: 10 });
     * characterService.setAbility('strength', 10);
     */
    this.setAbility = this.setAbilities = function(ability, score) {
      switch(typeof ability){
        case 'object':
          this.abilities = ability;
          break;
        case 'string':
          this.abilities[ability] = score;
          break;
      }
    };

    this.registerModifier = function(name, properties, type, modifier) {
      for(var property in properties) {
        this.modifiers[property] = this.modifiers[property] || {};
        this.modifiers[property][type] = this.modifiers[property][type] || {};
        this.modifiers[property][type][name] = modifier;
      }
    };

    // Example concept of implementation
    // character.registerModifier(['attack'], 'adder', function(){
    //   return score + 2;
    // });

    this.getAbility = function(ability) {
      var score = this[ability];
      if(this.modifiers[ability]){
        if(this.modifiers[ability].multipliers) {
          score = _.reduce(this.modifiers[ability].multipliers, function(scoreMemo, modifier){
            return modifier.call(this, scoreMemo);
          }, score);
        }
        if(this.modifiers[ability].adders) {
          score = _.reduce(this.modifiers[ability].adders, function(scoreMemo, modifier){
            return modifier.call(this, scoreMemo);
          }, score);
        }
      }
      return score;
    };
  })
  .controller('CharacterCtrl', function ($scope, races, classes, characterService) {
    (function(){
      characterService.setAbility({
        strength: 10,
        dexterity: 10,
        wisdom: 10,
        charisma: 10,
        constitution: 10,
        intelligence: 10
      });
      console.log(characterService);
      console.log(characterService.abilities.strength);
    })();

    function abilityCost(abilityScore) {
      var cost = 0;
      if (abilityScore > 7) {
        cost = abilityScore - 8;
      }
      if (abilityScore > 14) {
        cost += abilityScore % 14;
      }
      if (abilityScore > 16) {
        cost += abilityScore % 16;
      }
      return cost;
    }

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

    function findMiddleMod(attributes, sigAttrs) {
      var first = 'unknown',
          second = 'unknown',
          sigMod = 0;

      for (var sigAttr in sigAttrs) {
        sigMod = attributes[sigAttrs[sigAttr]].mod();
        if(first === 'unknown' || sigMod < attributes[first].mod()) {
          second = first;
          first = sigAttrs[sigAttr];
        } else if (second === 'unknown' || sigMod < attributes[second].mod()) {
          second = sigAttrs[sigAttr];
        }
      }

      return attributes[second].mod();
    }

    function getBaseAC(character) {
      return character.class.gear.armor[character.gear.armor].AC;
    }

    function getACMod(character) {
      return findMiddleMod(character.attributes, angular.copy(character.class.ACAttributes));
    }

    function getPDMod(character) {
      return findMiddleMod(character.attributes, angular.copy(character.class.physicalDefense.attributes));
    }

    function getMDMod(character) {
      return findMiddleMod(character.attributes, angular.copy(character.class.mentalDefense.attributes));
    }

    function shieldBonus(character) {
      if (character.gear.shield) {
        return character.class.gear.armor.shield.AC;
      } else {
        return 0;
      }
    }

    $scope.decrementAttr = function(attr) { attr.baseValue -= 1; };
    $scope.incrementAttr = function(attr) { attr.baseValue += 1; };

    $scope.races = races;
    $scope.classes = classes;
    $scope.attributes = ['str', 'con', 'dex', 'int', 'wis', 'cha'];
    $scope.gear = {
      armor: ['none', 'light', 'heavy']
    };

    $scope.character = {
      name: '',
      race: races.human,
      racialAbilityBonus: null,
      class: classes.fighter,
      classAbilityBonus: null,
      level: 1,
      attributes: initializeAttrs($scope.attributes, 8),
      abilityPoints: function(){
        var points = 28;
        for(var attribute in this.attributes) {
          points -= abilityCost(this.attributes[attribute].baseValue);
        }
        return points;
      },
      gear: {
        armor: 'none',
        shield: false
      },
      initiative: function() {
        return this.attributes.dex.mod() + this.level;
      },
      AC: function() {
        if(typeof this.class !== 'undefined') {
          // AC equation is base armor (from gear) + 2nd best of class
          // attributes for AC. For all initial classes this is con/dex/wis
          var ac = getBaseAC(this);
          ac += getACMod(this);
          ac += shieldBonus(this);
          ac += this.level;
          return ac;
        } else {
          return 0;
        }
      },
      PD: function() {
        if(typeof this.class !== 'undefined') {
          // PD equation is base PD (from class) + 2nd best of class attributes
          // for AC. For all initial classes this is con/dex/wis
          var pd = this.class.physicalDefense.base;
          pd += getPDMod(this);
          pd += this.level;
          return pd;
        } else {
          return 0;
        }
      },
      MD: function() {
        if(typeof this.class !== 'undefined') {
          // MD equation is based on MD base (from class) + 2nd best of class
          // attributes for MD. For all initial classes this is int/wis/cha
          var md = this.class.mentalDefense.base;
          md += getMDMod(this);
          md += this.level;
          return md;
        } else {
          return 0;
        }
      },
      uniqueThing: ''
    };
  });

