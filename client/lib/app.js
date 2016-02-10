angular.module('web.app',
  [ 'common.app',
    'dashboard.app',
    'contactus.app'
  ]);

angular.module('web.app').config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);

angular.element(document).ready(function () {
  $.get('/json/dashboard.columns.json', function(response){
    angular.module('web.app').value('dashboardCols',response.columns);
    
    // manual bootstrap
    angular.bootstrap( $("div[id='web.app']"), ['web.app'] );
    
  });
});