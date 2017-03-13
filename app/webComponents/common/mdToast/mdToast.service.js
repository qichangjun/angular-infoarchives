(function() {
  'use strict';
  angular.module("myApp").service("mdToastService", [
    '$log', '$mdToast', function($log, $mdToast) {
      var showToast;
      showToast = function(message) {
        return $mdToast.show($mdToast.simple().textContent(message).position('top right').hideDelay(3000));
      };
      this.showToast = showToast;
    }
  ]);

}).call(this);
