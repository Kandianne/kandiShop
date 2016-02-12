(function() {
	'use strict';
	angular.module('app')
	.factory('GlobalFactory', GlobalFactory);

	function GlobalFactory($http, $q) {
		var o = {};

		o.submitCandy = function(candy) {
			console.log(candy)
			var q = $q.defer();
			$http.post('/api/candy', candy).success(function(res) {
				q.resolve();
			});
			return q.promise;
		}

		o.getCandies = function() {
			var q = $q.defer();
			$http.get('/api/candy').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		}

		o.addToBasket = function(amountDesired, idOfCandy) {
			var candyRequest = {amountDesired, idOfCandy};
			console.log(candyRequest);
			var q = $q.defer();
			$http.post('/api/candy/addToBasket', candyRequest).success(function(res) {
				q.resolve();
			})
			return q.promise;
		}

		o.deleteFromBasket = function(candyInfo) {
			console.log(candyInfo);
			var q = $q.defer();
			$http.post('/api/candy/deleteFromBasket', candyInfo).success(function(res) {
				q.resolve();
			})
			return q.promise;
		}

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
