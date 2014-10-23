'use strict';

describe('Controller: CharacterCtrl', function() {
  // load the controller's module
  beforeEach(module('13thAgeCharacterBuilderApp'));

  var CharacterCtrl, scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    CharacterCtrl = $controller('CharacterCtrl', {
      '$scope': scope,
      'races': {},
      'classes': {}
    });
  }));

  it('should create a character in the scope', function() {
    expect(typeof scope.character).toNotBe('undefined');
  });
});