angular.module('app').factory('itemService', ['$meteor', '$rootScope', function($meteor, $rootScope) {
  var itemService = {};
  itemService.items = [];
  
  $meteor.subscribe('items').then(function(subscriptionHandle){ 
    itemService.items = $meteor.collection(Items);
    $rootScope.$emit( "itemService.changed", itemService);
  });
  return itemService;
}]);