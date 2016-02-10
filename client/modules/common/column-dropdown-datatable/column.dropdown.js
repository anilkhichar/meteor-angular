(function ( window, angular, undefined ) {
/*jshint globalstrict:true*/
'use strict';
var column_mod = angular.module('column-dropdown', []);

column_mod.directive('columnDropdown', ['$filter', function ($filter) {
  return {
    restrict: 'AE',
    scope: {
      columns    : '=filterColumns'      
    },
    templateUrl: 'client/modules/common/column-dropdown-datatable/column.dropdown.ng.html',
    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
      $scope.c_dropdown_settings = {
         displayProp: $attrs.displayProp
        ,idProp: $attrs.idProp
        ,enableSearch: true
        ,scrollableHeight: '400px'
        ,scrollable: true
      };
      $scope.c_dropdown_translation_texts = {
        buttonDefaultText: 'Select Columns',
        dynamicButtonTextSuffix:'columns selected'
      };
      
      $scope.columns = $filter('filter')($scope.columns, {filter: true});
      $scope.col_init = function(){
        $scope.c_dropdown_model=[];      
        $filter('filter')($scope.columns, {datatable_visible: true}).map(function(item){
          $scope.c_dropdown_model.push({"id": item.id});
        });
      };
      $scope.col_select = function(item){
        $filter('filter')($scope.columns, item)[0].datatable_visible = true;
      };
      $scope.col_deselect = function(item){
        $filter('filter')($scope.columns, item)[0].datatable_visible = false;
      };
      $scope.col_unchk_all = function(){
        angular.forEach($scope.columns, function(col, index){
          col.datatable_visible = false;
        });
      };
    }]
  }
}]);

})( window, window.angular );