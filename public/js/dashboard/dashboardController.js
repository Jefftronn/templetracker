angular.module('myApp')
.controller('dashboardController', function($scope, dashboardService) {

  dashboardService.getUsers().then(function (response) {
    var sessionUser = response;
    dashboardService.getUserById(sessionUser._id).then(function(res){
      $scope.user = res
    })
  })


	dashboardService.getVisits().then(function (response) {
		$scope.visits = response;
	})

$scope.tryDelete = function(id) {
  if ( window.confirm('Are you sure you want to delete this item?')) {
    	$scope.removeVisit(id);
	}
}

	$scope.removeVisit = function(id) {
		dashboardService.removeVisits(id)
		.then(function () {
			dashboardService.getVisits().then(function (response) {
				$scope.visits= response;
			})
		})
	}

});