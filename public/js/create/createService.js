angular.module('myApp')
.service('createService', function($http) {

	this.addVisits = function(visit) {
		return $http({
			method: 'POST',
			data: visit,
			url: '/api/visit'
		}).then(function (response) {
			return response.data
		});
	}


	this.getTemples = function() {
		return $http({
  			method: 'GET',
  			url: '/api/temple'
		}).then(function (response) {
    		return response.data
  		});
	}


});