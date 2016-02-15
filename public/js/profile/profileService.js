angular.module('myApp')
.service('profileService', function($http) {

	this.getTemples = function() {
		return $http({
  			method: 'GET',
  			url: '/api/temple'
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

	this.editUser = function(user) {
		return $http({
			method: 'PUT',
			url:'/api/user/' + user._id, 
			data: user
		}).then(function (response) {
			return response.data
		});
	}


})