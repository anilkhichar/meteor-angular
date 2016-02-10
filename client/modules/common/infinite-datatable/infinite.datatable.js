(function ( window, angular, undefined ) {
/*jshint globalstrict:true*/
'use strict';
var infinite_dt = angular.module('infinite-datatable', []);

infinite_dt.directive('infiniteDatatable', ['$filter', function($filter) {
  return {
    restrict: 'AE',
    scope: {
      filterItems     : '=',
      items           : '=',
      columns         : '=tableColumns',
      defaultOrderBy  : '=' 
    },
    templateUrl: 'client/modules/common/infinite-datatable/infinite.datatable.ng.html',
    controller: ['$scope', '$element', '$attrs',
      function ($scope, $element, $attrs) {
        //$scope.idProp = $attrs.idProp;        
        $scope.endLimit = 30;
        $scope.order_by = $scope.defaultOrderBy;
        $scope.reverse = false;
        $scope.isBusy = false;
        $scope.tasksLoaded = $scope.filterItems.data.length>0?true:false;
        $scope.no_record_message = 'No record found.'
        angular.forEach($scope.columns, function(col, indx){
          col.datatable_class = 'fa-sort';
          if(col.id=='id')
            col.datatable_class = 'fa-sort-up';
        });
        
        $scope.handleScroll = function(){
          $scope.isBusy = true;
          $scope.endLimit = $scope.endLimit + 30;
          $scope.isBusy = false;
        }        
        $scope.sorting = function (col){
          $scope.endLimit = 30;
          angular.forEach($scope.columns, function(column, indx){
            if(column.id!=col.id)
              column.datatable_class = 'fa-sort';
          });

          if(col.datatable_class =='fa-sort' || col.datatable_class =='fa-sort-down')
          {
            col.datatable_class = 'fa-sort-up'; // fa-sort  ==> fa-sort-up || // fa-sort-down  ==> fa-sort-up
            $scope.reverse = false;
          }
          else if(col.datatable_class =='fa-sort-up')
          {
            col.datatable_class = 'fa-sort-down'; // fa-sort-up  ==> fa-sort-down
            $scope.reverse = true;
          }
          $scope.order_by = col.id;
        }
        
        var default_sorting = function(column){
          var col = $filter('filter')($scope.columns, {id: col})[0];
          $scope.sorting(col);
        }
        default_sorting($scope.order_by); // default sorting
        
        $scope.order_by_column = function () {
          var column = {};
          angular.forEach($scope.columns, function(col , key) {
            if(col.id === $scope.order_by)
              column = col;
          });
          return column;
        }
        
        $scope.$watch('items', function(){
          if(!$scope.filterItems.data)
            $scope.filterItems.data = [];
          $scope.tasksLoaded = $scope.filterItems.data.length>0?true:false;
        }, true);
    }]
  }
}]);
  
})( window, window.angular );