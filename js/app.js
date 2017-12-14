/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */

angular.module('sixt', ['ngRoute'])
.config(function ($routeProvider) {
	'use strict';

	var routeConfig = {
		controller: 'AppCtrl',
		templateUrl: 'partials/app.html',
		controllerAs: 'vm'
	};

	$routeProvider
		.when('/app', routeConfig)
		.otherwise({
			redirectTo: '/app'
		});
});
