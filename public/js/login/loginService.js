angular.module('myApp')
.service('loginService', function($http, $state) {

	this.getCurrentUser = function() {
		return $http ({
			method: 'GET',
			url: '/auth/current'
		}).then(function(response) {
			console.log('Yooo', response)
			return response.data;
		}).catch(function(err) {
			console.log('auth err', err);
			if (err.status === 401) {
				$state.go('Login');
			}
		})
	};

});