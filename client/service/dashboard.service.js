angular.module('dashboard.app').factory('dashboardService', ['$rootScope', '$http', function($rootScope, $http) {

  var dashboardService = {};
  dashboardService.records = [];
  
  Meteor.subscribe("records",{
    onReady: function(){
      Tracker.autorun(function () {
        dashboardService.records = Records.find().fetch();
        $rootScope.$emit("dashboardService.records.changed", dashboardService.records);
      });
    }
  });

  return dashboardService;

}]);