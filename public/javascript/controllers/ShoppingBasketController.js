(function() {
	'use strict';
	angular.module('app')
	.controller('ShoppingBasketController', ShoppingBasketController);

	function ShoppingBasketController(GlobalFactory) {
		var vm = this;
		vm.candiesInBasket = [];

			//===================GETTING CANDIES THAT ARE IN SHOPPING BASKET====================================	
			vm.getCandiesInShoppingBasket = function() {
				GlobalFactory.getCandiesInShoppingBasket().then(function(res) {
					vm.candiesInBasket = res;
				})
			}
			vm.getCandiesInShoppingBasket(); 


			//===================REMOVING FROM SHOPPING BASKET====================================	
			vm.deleteFromBasket = function(indexOfCandy, idOfCandy, amountDesired) {
				var candyInfo = {id: idOfCandy, amt: amountDesired};
				GlobalFactory.deleteFromBasket(candyInfo).then(function(res) {
					vm.candiesInBasket.splice(indexOfCandy, 1);//splicing spefici candy from array to immediately show stock change
				})
			}

	}
})();
