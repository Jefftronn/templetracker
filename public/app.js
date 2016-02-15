angular.module('myApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider

    .state('About', {
      url: '/about',
      templateUrl: 'js/about/about.html',
      controller: 'aboutController'
    })

    .state('Login', {
    	url: '/login',
    	templateUrl: 'js/login/login.html',
      controller: 'loginController'
    })

    .state('Register', {
      url: '/register',
      templateUrl: 'js/register/register.html'
    })

    .state('Contact', {
      url: '/contact',
      templateUrl: 'js/contact/contact.html'
    })

    .state('Dashboard', {
      url: '/dashboard',
      templateUrl: 'js/dashboard/dashboard.html',
      controller: 'dashboardController'
    })

    .state('Visit', {
      url: '/visit/:id',
      templateUrl: 'js/visit/visit.html',
      controller: 'visitController',
      resolve: {
        // VISIT #2
        visits: function(visitService, $stateParams) {
          console.log("Work")
          return visitService.getVisits($stateParams.id);
          }
        }
    })

    .state('Create', {
      url: '/create',
      templateUrl: 'js/create/create.html',
      controller: 'createController'
    })

    .state('Profile', {
      url: '/profile',
      templateUrl: 'js/profile/profile.html',
      controller: 'profileController'
    })

    .state('Charts', {
      url: '/charts',
      templateUrl: 'js/charts/charts.html'
    })

    .state('Map', {
      url: '/map',
      templateUrl: 'js/map/map.html',
      controller: 'mapController'
      // resolve: {
      //   visits: function(dashboardService) {
      //     return dashboardService.getVisits();
      //   }
      // }
    })

    $urlRouterProvider.otherwise('/about');

});