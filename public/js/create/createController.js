angular.module('myApp')
.controller('createController', function($scope, createService) {

	$scope.visits = [];

	$scope.visit = {};

	$scope.visit.grounds = false;

	$scope.visit.openHouse = false;

	$scope.visit.baptisms = 0;

	$scope.visit.initiatories = 0;

	$scope.visit.endowments = 0;

	$scope.visit.sealings = 0;

	$scope.visit.images = [];

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
        
	$scope.addVisit = function(visit) {

		console.log('info', visit)

		createService.addVisits(visit)
		.then(function (response) {
			$scope.visits.push(response);
		})
	}

	createService.getTemples().then(function (response) {
		$scope.temples = response;
	})





});