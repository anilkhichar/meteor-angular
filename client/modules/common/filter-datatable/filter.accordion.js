(function ( window, angular, undefined ) {
/*jshint globalstrict:true*/
'use strict';
var filter_accord = angular.module('filter-accordion', []);

filter_accord.service('filterAccordService', ['$filter', function($filter) {
  var filterAccordService = {};
  var $scope  = this;
  $scope.columns = [];
  $scope.items   = [];
  $scope.filterItems = [];
  
  filterAccordService.numeric_filter = function(item) {
    var found = 0;
    var found_1 = 1; // to skip angular forEach once a list don't have the item
    angular.forEach($scope.columns, function(col, index){
      if(found_1) // to skip the comparision once one nemeric criteria is not found
      if (col.filter_type == 'numeric' && col.filter_text && col.filter_text.length)
      {
        found = 0; // reset
        found_1 = 0; // reset
        
        if(col.filter_operator =='gt'){
          if (item[col.id] > col.filter_text){
           found = 1; found_1 = 1;
          }
        }
        else if(col.filter_operator =='lt'){
          if (item[col.id] < col.filter_text){
           found = 1; found_1 = 1;
          }
        }

      }else
        found = 1;
    });          
    if(found)
      return item;
  };
  
  filterAccordService.multi_filter = function(item) {
    var found = 0;
    var found_1 = 1; // to skip angular forEach once a list don't have the item
    angular.forEach($scope.columns, function(col, index){
      if(found_1)
      if (col.filter_type == 'list' && col.filter_text.length)
      {
        found = 0; // reset
        found_1 = 0; // reset
        angular.forEach(col.filter_text, function(value, index){
          if (value.id == item[col.id])
          {
             found = 1;
             found_1 = 1;
          }
        });
      }else
        found = 1;
    });          
    if(found)
      return item;
  };

  filterAccordService.text_filter = function(){
    var filter_dict = {};
    angular.forEach($scope.columns, function(col, index){
      if(col.filter_type == 'text')
        filter_dict[col.id] = col.filter_text;
    });
    $scope.filterItems.data = $filter('filter')($scope.items, filter_dict);     
  };

  filterAccordService.filter_apply = function(columns, items, filterItems){
    $scope.columns = columns;
    $scope.items   = items;
    $scope.filterItems = filterItems;
    filterAccordService.text_filter();
    $scope.filterItems.data = $filter('pick')($scope.filterItems.data, filterAccordService.multi_filter);
    $scope.filterItems.data = $filter('pick')($scope.filterItems.data, filterAccordService.numeric_filter);
  };
  
  filterAccordService.filter_reset = function(columns, items, filterItems){
    $scope.filterItems.data = items;
    angular.forEach($scope.columns, function(col, index){
      if (col.filter_type == 'text' || col.filter_type == 'numeric')
        col.filter_text = '';
      else if (col.filter_type == 'list')
        col.filter_text = [];
    });
  }
  
  return filterAccordService;
  
}]);

filter_accord.directive('filterAccordion', ['$filter', 'filterAccordService', function ($filter, filterAccordService) {
  return {
    restrict: 'AE',
    scope: {
      filterItems : '=',
      items       : '=',
      columns     : '=filterColumns',
      idProp      : '=',
      displayProp : '='      
    },
    templateUrl: 'client/modules/common/filter-datatable/filter.accordion.ng.html',
    controller: ['$scope', '$element', '$attrs',
      function ($scope, $element, $attrs) {
        $scope.idProp = $attrs.idProp;
        $scope.displayProp = $attrs.displayProp;
        
        $scope.filter_trigger = function(){
          filterAccordService.filter_apply($scope.columns, $scope.items, $scope.filterItems);
        };

        $scope.filter_clear = function(){
          filterAccordService.filter_reset($scope.columns, $scope.items, $scope.filterItems);
        }
        
        $scope.$watch('items', function(){
          $scope.filter_trigger();
        }, true);
    }]
  }
}]);

filter_accord.directive('filterDropdown', ['$filter', function ($filter) {
  return {
    restrict: 'AE',
    scope: {
      columns     : '=filterColumns',
      idProp      : '=',
      displayProp : '='      
    },
    templateUrl: 'client/modules/common/filter-datatable/filter.dropdown.ng.html',
    controller: ['$scope', '$element', '$attrs',
      function ($scope, $element, $attrs) {
      
      $scope.f_dropdown_settings = {
         idProp: $scope.idProp
        ,displayProp: $scope.displayProp        
        ,enableSearch: true
        ,scrollableHeight: '400px'
        ,scrollable: true
      };
      $scope.f_dropdown_translation_texts = {
        buttonDefaultText: 'Select Filters',
        dynamicButtonTextSuffix:'filters selected'
      };
      
      $scope.columns = $filter('filter')($scope.columns, {filter: true});
      $scope.fcol_init = function(){
        $scope.f_dropdown_model=[];      
        $filter('filter')($scope.columns, {filter_visible: true}).map(function(item){
          $scope.f_dropdown_model.push({"id": item.id});
        });
      };
      $scope.fcol_select = function(item){
        $filter('filter')($scope.columns, item)[0].filter_visible = true;
      };
      $scope.fcol_deselect = function(item){
        $filter('filter')($scope.columns, item)[0].filter_visible = false;
      };
      $scope.fcol_unchk_all = function(){
        angular.forEach($scope.columns, function(col, index){
          col.filter_visible = false;
        });
      };
    }]
  }
}]);

filter_accord.directive('filterMultiSelect', ['$filter', 'filterAccordService', function ($filter, filterAccordService) {
  return {
    restrict: 'AE',
    scope: {
      filterItems     : '=',
      items           : '=',
      columns         : '=filterColumns',
      listIdentifier  : '='
    },
    templateUrl: 'client/modules/common/filter-datatable/filter.multiselect.ng.html',
    controller: ['$scope', '$element', '$attrs',
      function ($scope, $element, $attrs) {
      
      $scope.multi_options = [];      
      $scope.list_dict = $filter('filter')($scope.columns, {id: $scope.listIdentifier})[0];
      $scope.$watch('columns', function () {
        if ($scope.list_dict)
          $scope.multi_options = $scope.list_dict.filter_list_arr;
      }, true);      
      $scope.list_dict.filter_text = [];
      
      $scope.multi_extra_settings = {
         idProp: $scope.list_dict.filter_list_id
        ,displayProp: $scope.list_dict.filter_list_display
        ,enableSearch: true
        ,smartButtonMaxItems: 1
        ,scrollable: true
        ,scrollableHeight: '400px'
        ,scrollableWidth: '50px'
        ,showCheckAll: false
        ,smartButtonTextConverter: function(itemText, originalItem) {
          if (itemText.length > 20) {
          return (itemText.substring(0,18));
          }
          return itemText;
        }
      };
      $scope.multi_translation_texts = {
        buttonDefaultText: 'All'
      };      

      $scope.is_all_checked = 0; // 'item_select' fired after 'item_chk_all'; heck for this bug
      $scope.item_select = function(item){
          if(!$scope.is_all_checked)
            filterAccordService.filter_apply($scope.columns, $scope.items, $scope.filterItems);
          else
            $scope.is_all_checked = 0;
      };
      $scope.item_deselect = function(item){
        $scope.is_all_checked = 0;
        if($scope.list_dict.filter_text.length)
          filterAccordService.filter_apply($scope.columns, $scope.items, $scope.filterItems);
        else
          $scope.item_unchk_all(); // means after $scope deselection, all items are deseleted
      };
      $scope.item_chk_all = function(){
        $scope.is_all_checked = 1;
        $scope.item_unchk_all();
      };
      $scope.item_unchk_all = function(){
        $scope.list_dict.filter_text.length = 0; // reset
        filterAccordService.filter_apply($scope.columns, $scope.items, $scope.filterItems);
      };
    }]
  }
}]);
  
})( window, window.angular );