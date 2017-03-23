(function() {
  'use strict';
  angular.module("myApp").controller("projectEditController", [
    '$scope', '$log', '$state', '$timeout', '$stateParams', '$rootScope', function($scope, $log, $state, $timeout, $stateParams, $rootScope) {
      var init, serfTo, vm;
      vm = this;
      $rootScope.$on('$stateChangeStart', function(evt, next, curr) {
        return vm.currentState = next.name;
      });
      init = function() {
        vm.objectId = $state.params.objectId;
        vm.currentState = $state.current.name;
      };
      serfTo = function(url) {
        return $state.go(url, {
          objectId: vm.objectId
        });
      };
      vm.serfTo = serfTo;
      init();
    }
  ]);

}).call(this);
