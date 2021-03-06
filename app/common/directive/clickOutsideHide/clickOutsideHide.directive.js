
/*
##  点击元素外部,隐藏该元素
##  '$scope.hideParameter' 为双向绑定控制元素的显示与隐藏
 */

(function() {
  'use strict';
  angular.module("myApp").directive('clickOutsideHide', [
    '$log', '$translate', '$rootScope', '$location', '$state', '$stateParams', '$document', '$timeout', function($log, $translate, $rootScope, $location, $state, $stateParams, $document, $timeout) {
      var ctrlFun, directive;
      ctrlFun = function($scope, $element, $attrs) {
        var init, vm;
        vm = this;
        $scope.$state = $state;
        init = function() {
          $document.bind('click', function() {
            return $timeout(function() {
              return $scope.hideParameter = false;
            });
          });
          $element.bind('click', function(e) {
            return e.stopPropagation();
          });
        };
        init();
      };
      return directive = {
        restrict: 'AE',
        scope: {
          hideParameter: '='
        },
        controller: ['$scope', '$element', '$attrs', ctrlFun],
        controllerAs: 'vm'
      };
    }
  ]);

}).call(this);
