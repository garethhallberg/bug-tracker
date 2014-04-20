'use strict';

//Setting up route
angular.module('bugs').config(['$stateProvider',
	function($stateProvider) {
		// Bugs state routing
		$stateProvider.
		state('listBugs', {
			url: '/bugs',
			templateUrl: 'modules/bugs/views/list.html'
		}).
		state('createBug', {
			url: '/bugs/create',
			templateUrl: 'modules/bugs/views/create.html'
		}).
		state('viewBug', {
			url: '/bugs/:bugId',
			templateUrl: 'modules/bugs/views/view.html'
		}).
		state('editBug', {
			url: '/bugs/:bugId/edit',
			templateUrl: 'modules/bugs/views/edit.html'
		});
	}
]);