(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('InventoryList',{
			url: '/',
			templateUrl: '/templates/list.html',
		})
		.state('ShoppingBasket',{
			url: '/',
			templateUrl: '/templates/shoppingBasket.html',
		}).state('AddCandy',{
			url: '/',
			templateUrl: '/templates/addCandyToInv.html',
		});
		$urlRouterProvider.otherwise('/');
		
	}
})();
