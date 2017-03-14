(function() {
  'use strict';
  angular.module("myApp").directive('systemSideBar', [
    '$log', '$translate', '$rootScope', '$location', '$state', '$stateParams', function($log, $translate, $rootScope, $location, $state, $stateParams) {
      var ctrlFun, directive;
      ctrlFun = function($scope, $element, $attrs) {
        var init, vm;
        vm = this;
        $scope.$state = $state;
        init = function() {};
        init();
      };
      return directive = {
        restrict: 'AE',
        templateUrl: 'webComponents/common/directive/systemSideBar/systemSideBar.html?' + window.hsConfig.bust,
        controller: ['$scope', '$element', '$attrs', ctrlFun],
        controllerAs: 'vm'
      };
    }
  ]);

}).call(this);
