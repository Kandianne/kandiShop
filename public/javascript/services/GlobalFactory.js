(function() {
	'use strict';
	angular.module('app')
	.factory('GlobalFactory', GlobalFactory);

	function GlobalFactory($http, $q) {
		var o = {};

		//===================ADDING CANDY TO DATABASE===============================================	
		o.submitCandy = function(candy) {
			var q = $q.defer();
			$http.post('/api/candy', candy).success(function(res) {
				q.resolve();
			});
			return q.promise;
		}


		//===================GETTING CANDIES FROM DATABASE===============================================	
		o.getCandies = function() {
			var q = $q.defer();
			$http.get('/api/candy').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		
		//===================ADDING CANDIES TO SHOPPING BASKET===============================================	
		o.addToBasket = function(amountDesired, idOfCandy) {
			var candyRequest = {amountDesired, idOfCandy};
			var q = $q.defer();
			$http.post('/api/candy/addToBasket', candyRequest).success(function(res) {
				q.resolve();
			})
			return q.promise;
		}

		//===================REMOVING CANDY FROM SHOPPING BASKET SHOPPING BASKET===============================================	
		o.deleteFromBasket = function(candyInfo) {
			var q = $q.defer();
			$http.post('/api/candy/deleteFromBasket', candyInfo).success(function(res) {
				q.resolve();
			})
			return q.promise;
		}

		//===================GETTING ALL CANDIES IN SHOPPING BASKET===============================================	
		o.getCandiesInShoppingBasket = function() {
			var q = $q.defer();
			$http.get('/api/candy/shoppingBasket').success(function(res) {
				q.resolve(res);
			})
			return q.promise;
		}

		return o;
	}
})();
