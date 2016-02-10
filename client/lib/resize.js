angular.module('mc.resizer', []).directive('resize', ['$window', function ($window) {
  return function (scope, element) {
    var w = angular.element($window);
    scope.getWindowDimensions = function () {
      return {
        'h': ((w.height())*63/100),
        'w': w.width()
      };
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
      scope.windowHeight = newValue.h;
      scope.windowWidth = newValue.w;

      scope.style = function () {
        return {
          'height': ((newValue.h)*63/100),
          'width': (newValue.w - 100)
        };
      };

    }, true);

    w.bind('resize', function () {
      scope.$apply();
    });
  }
}]);