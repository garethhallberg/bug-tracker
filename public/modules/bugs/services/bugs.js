'use strict';

//Bugs service used to communicate Bugs REST endpoints
angular.module('bugs').factory('Bugs', ['$resource', function($resource) {
    return $resource('bugs/:bugId', {
        bugId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);