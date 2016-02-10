angular.module('web.app').directive('layout', function(){
  return {
    scope: {
      tabs: '='
    },
    templateUrl: 'client/lib/layout.ng.html'
  };
})