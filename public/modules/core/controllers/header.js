'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;

//		$scope.menu = [{
//			title: 'Articles',
//			link: 'articles',
//			uiRoute: '/articles'
//		}, {
//			title: 'New Article',
//			link: 'articles/create',
//			uiRoute: '/articles/create'
//		}, {
//            title: 'Bugs',
//            link: 'bugs',
//            uiRoute: '/bugs'
//        }, {
//            title: 'New Bug',
//            link: 'bugs/create',
//            uiRoute: '/bugs/create'
//        }];

        $scope.menu = [{
            title: 'Bugs',
            link: 'bugs',
            uiRoute: '/bugs'
        }, {
            title: 'New Bug',
            link: 'bugs/create',
            uiRoute: '/bugs/create'
        }];

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
	}
]);