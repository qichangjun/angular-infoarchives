(function() {
  angular.module("myApp").factory('hsTranslateService', [
    '$translate', '$timeout', function($translate, $timeout) {
      return {
        translate: function(key) {
          if (key) {
            return $translate.instant(key);
          } else {
            return key;
          }
        }
      };
    }
  ]);

}).call(this);
