(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(GlobalFactory, $mdToast) {
		var vm = this;
		vm.candy = {};
		vm.candies = [];



		//===================GETTING CANDIES FROM DATABASE===============================================	
		vm.getCandies = function() {
			GlobalFactory.getCandies().then(function(res) {
				vm.candies = res;
			})
		}
		vm.getCandies();

		//===================ADDING CANDIES TO DATABASE===============================================	
		vm.submitCandy = function() {
			GlobalFactory.submitCandy(vm.candy).then(function(res) {
				vm.candy = '';
				$mdToast.show( //notifying user that item has been added to inventory
					$mdToast.simple()
					.content('Candy added!')
					.position(vm.getToastPosition())
					.hideDelay(5000)
				);
			})
			vm.getCandies();
		}

		//===================ADDING CANDIES TO BASKET===============================================	
		vm.addToBasket = function(amountDesired, idOfCandy) {
			if(amountDesired == undefined || amountDesired === 0) { //checking if amount chosen is 0 and if so notify
				$mdToast.show(//showing notification to add amount before adding to basket
					$mdToast.simple()
					.content('Please add a desired amount before adding to Basket')
					.position(vm.getToastPosition())
					.hideDelay(5000)
				);
				return;
			}
			GlobalFactory.addToBasket(amountDesired, idOfCandy).then(function(res) {
				$mdToast.show( //notifying user that item has been added to basket
					$mdToast.simple()
					.content('Added to Basket!')
					.position(vm.getToastPosition())
					.hideDelay(5000)
				);
			})
			vm.getCandies();
		} 

		//===================PURCHASE ATTEMPT====================================	
		vm.purchase = function() {
			$mdToast.show( //notifying user of feature coming soon
				$mdToast.simple()
				.content('Puchase feature coming soon')
				.position(vm.getToastPosition())
				.hideDelay(5000)
			);
		}

		//===================TOAST (NOTIFICATION) POSITIONING===============================================	
		vm.toastPosition = {
			bottom: true,
			top: false,
			left: false,
			right: true
		};
		vm.getToastPosition = function () {// functionality to know where to position toast
			return Object.keys(vm.toastPosition)
			.filter(function (pos) {
				return vm.toastPosition[pos];
			})
			.join(' ');
		};

	}
})();
