angular.module('myApp')
.controller('profileController', function($scope, profileService) {

   	$scope.openModalBaptism = function(user) {
       $('#modalBaptism').openModal();
       $scope.modal = user
   };

    $scope.openModalInitiatory = function(user) {
       $('#modalInitiatory').openModal();
       $scope.modal = user
   };

    $scope.openModalEndowment = function(user) {
       $('#modalEndowment').openModal();
       $scope.modal = user
   };

    $scope.openModalSealing = function(user) {
       $('#modalSealing').openModal();
       $scope.modal = user
   };

    $scope.openModalProfileJournal = function(user) {
       $('#modalProfileJournal').openModal();
       $scope.modal = user
   };


	profileService.getTemples().then(function (response) {
		$scope.temples = response;
	})

  profileService.getUsers().then(function (response) {
    var sessionUser = response;
    profileService.getUserById(sessionUser._id).then(function(res){
      $scope.user = res
    })
  })

  $scope.editUser = function(user) {
    profileService.editUser(user)
    .then(function (user) {
        $scope.user = user
      })
}

});