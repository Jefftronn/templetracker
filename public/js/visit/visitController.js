var app = angular.module('myApp')
app.controller('visitController', function($scope, visitService, visits) {

  window.scrollTo(0, 0);

	console.log(visits)
	$scope.visit = visits[0];

	visitService.getTemples().then(function (response) {
		$scope.temples = response;
	})


	$scope.openModalEditVisit = function(visit) {
      $('#modalEditVisit').openModal();
      $scope.modal = visit
  	};

  	$scope.editVisit = function(visit) {
  		
    visitService.editVisit(visit)
    .then(function (response) {
        $scope.visit = visit
      })
	}



});

app.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    }
})



