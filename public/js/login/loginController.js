angular.module('myApp')
.controller('loginController', function($scope, loginService) {

	loginService.getCurrentUser().then(function(user) {
		$scope.user = user;
	});


});