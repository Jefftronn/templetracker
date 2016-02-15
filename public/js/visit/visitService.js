angular.module('myApp')
.service('visitService', function($http) {

	// VISIT #3
	this.getVisits = function(visitId) {
		return $http({
  			method: 'GET',
  			url: '/api/visit/' +visitId
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

	this.editVisit = function(visit) {
		return $http({
			method: 'PUT',
			url:'/api/visit/' + visit._id, 
			data: visit
		}).then(function (response) {
			return response.data
		});
	}

});