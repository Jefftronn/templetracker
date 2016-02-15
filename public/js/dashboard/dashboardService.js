angular.module('myApp')
.service('dashboardService', function($http) {

	this.getCurrentUser = function() {
		return $http({
  			method: 'GET',
  			url: '/auth/current'
		}).then(function (response) {
    		return response.data
  		});
	}
	
	this.getUserById = function(userId) {
		return $http({
  			method: 'GET',
  			url: '/api/user/'+userId
		}).then(function (response) {
    		return response.data
  		});
	}

	this.getUsers = function() {
		return $http({
  			method: 'GET',
  			url: '/auth/current'
		}).then(function (response) {
    		return response.data
  		});
	}

	this.getVisits = function() {
		return $http({
  			method: 'GET',
  			url: '/api/visit'
		}).then(function (response) {
    		return response.data
  		});
	}

	this.removeVisits = function(id) {
		return $http({
			method: 'DELETE',
			url: '/api/visit/' + id
		}).then(function (response) {
			return response.data
		});
	}

});