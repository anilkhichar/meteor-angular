angular.module('dashboard.app')
  .controller('DashboardCtrl', ['$scope', '$rootScope', '$filter', 'dashboardService', 'dashboardCols', function ($scope, $rootScope, $filter, dashboardService, dashboardCols) {
    
    $scope.dt_filter_cols = dashboardCols;
    $scope.dt_filter_cols_arr = $filter('orderBy')($scope.dt_filter_cols, 'datatable_position', false);
    
    $scope.records = dashboardService.records;
    $scope.filteredItems = {data: dashboardService.records};
    
    $scope.tasksLoaded = false;
    $scope.order_by = 'col1';
    $scope.reverse = false;
    
    // add listener and hold on to deregister function
    var deregister_records = $rootScope.$on(
      "dashboardService.records.changed", function() {
      $scope.tasksLoaded = false;
      $scope.$apply(function(){
        $scope.records = dashboardService.records;
      });
      
      var column = $filter('filter')($scope.dt_filter_cols_arr, {id: 'col2'})[0];
      column.filter_list_arr = $scope.records.map(function(q){return {'id': q.col2}});
      $scope.tasksLoaded = true;
    });
    
    // clean up listener when directive's scope is destroyed
    // if not destoyrd, it will lead to memory leak
    $scope.$on('$destroy', function(){
      deregister_records;
    });

    

}]);