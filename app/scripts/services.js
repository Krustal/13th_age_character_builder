'use strict';

var thirteenthAgeServices = angular.module('thirteenthAgeServices', ['ngResource']);

thirteenthAgeServices.factory('Race', ['$resource',
    function($resource){
      // local resource
      // return $resource('races/:raceId.json', {}, {
      //   // Default behavior for a query call on Race service
      //   query: {method: 'GET', params:{raceId:'races'}, isArray: true}
      // });

      return $resource('https://shining-fire-1240.firebaseio.com/races/:raceId.json', {}, {
        query: { method: 'GET', params: {}, isArray: false }
      });
    }]);

thirteenthAgeServices.factory('Classes', ['$resource',
    function($resource){
      return $resource('https://shining-fire-1240.firebaseio.com/classes/:classId.json', {}, {
        query: { method: 'GET', params: {}, isArray: false }
      });
    }]);