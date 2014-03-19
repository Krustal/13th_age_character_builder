'use strict';

var thirteenthAgeServices = angular.module('thirteenthAgeServices', ['ngResource'])

thirteenthAgeServices.factory('Race', ['$resource',
    function($resource){
      return $resource('races/:raceId.json', {}, {
        // Default behavior for a query call on Race service
        query: {method: 'GET', params:{raceId:'races'}, isArray: true}
      });
    }]);