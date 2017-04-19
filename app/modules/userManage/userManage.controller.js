(function() {
  'use strict';
  angular.module("myApp").controller("userManageController", [
    '$scope', '$log', '$state', 'userManageService', 'mdDialogService', '$timeout', '$mdToast', 'Upload', 'hsAuth', function($scope, $log, $state, systemSetService, mdDialogService, $timeout, $mdToast, Upload, hsAuth) {
      var init, listenEvent, vm;
      vm = this;
      init = function() {
        return listenEvent();
      };
      listenEvent = function() {};
      init();
    }
  ]);

}).call(this);
