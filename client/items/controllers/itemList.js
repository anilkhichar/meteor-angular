angular.module('app').controller('ItemCtrl', ['$scope', '$meteor', function($scope, $meteor){
  $scope.columns = [
    { 
      name: '_id',
      sort: true
      ,filter: true
      ,cls: 'fa-sort'
      ,text: ''
    },
    { 
      name: 'datetime',
      sort: true
      ,filter: false
      ,cls: 'fa-sort-up'
      ,text: ''
    },
    { 
      name: 'col_3',
      sort: true
      ,filter: true
      ,cls: 'fa-sort'
      ,text: ''
    },
    { 
      name: 'col_4',
      sort: true
      ,filter: true
      ,cls: 'fa-sort'
      ,text: ''
    },
    { 
      name: 'col_5',
      sort: true
      ,filter: true
      ,cls: 'fa-sort'
      ,text: ''
    },
    { 
      name: 'col_6',
      sort: true
      ,filter: true
      ,cls: 'fa-sort'
      ,text: ''
    },
    { 
      name: 'col_7',
      sort: true
      ,filter: true
      ,cls: 'fa-sort'
      ,text: ''
    },
    { 
      name: 'col_8',
      sort: true
      ,filter: true
      ,cls: 'fa-sort'
      ,text: ''
    },
    { 
      name: 'col_9',
      sort: true
      ,filter: true
      ,cls: 'fa-sort'
      ,text: ''
    }
  ];
  
  $scope.isBusy = true;
  $scope.tasksLoaded = false;
  
  $meteor.subscribe('items').then(function(subscriptionHandle){ 
    $scope.items = $meteor.collection(Items);
    $scope.tasksLoaded = true;
  });
      
  $scope.endLimit = 0;
  $scope.order_by = 'datetime';
  $scope.reverse = false;
  $scope.isBusy = false;
  
  $scope.handleScroll = function(){
    $scope.isBusy = true;
    $scope.endLimit = $scope.endLimit + 30;
    $scope.isBusy = false;
  }
  
  $scope.resetScroll = function(){
    $scope.endLimit = 30;      
    angular.forEach($scope.columns, function(column, indx){
      column.cls = 'fa-sort';
      if(column.name=='datetime')
        column.cls = 'fa-sort-up';
      column.text = '';
      $scope.order_by = 'datetime';
      $scope.reverse = false;
    });
  }
  
  $scope.sorting = function (col){
    $scope.endLimit = 30;
    angular.forEach($scope.columns, function(column, indx){
      if(column.name!=col.name)
        column.cls = 'fa-sort';
    });

    if(col.cls =='fa-sort' || col.cls =='fa-sort-down')
    {
      col.cls = 'fa-sort-up'; // fa-sort  ==> fa-sort-up || // fa-sort-down  ==> fa-sort-up
      $scope.reverse = false;
    }
    else if(col.cls =='fa-sort-up')
    {
      col.cls = 'fa-sort-down'; // fa-sort-up  ==> fa-sort-down
      $scope.reverse = true;
    }
    $scope.order_by = col.name;
  }
  
}]);