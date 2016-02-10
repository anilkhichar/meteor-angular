angular.module('web.app').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
   function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider      
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'client/modules/dashboard/view/dashboard.ng.html',
        controller: 'DashboardCtrl'
      })

      .state('contactus', {
        url: '/contactus',
        templateUrl: 'client/modules/contactus/view/contactus.ng.html',
        controller: 'ContactusCtrl'
      })

}]);