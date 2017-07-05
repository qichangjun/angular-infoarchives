(function() {
  'use strict';
  angular.module("myApp").factory('JobRestangular', [
    'Restangular', function(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        return RestangularConfigurer.setBaseUrl(window.hsConfig.jobBaseUrl);
      });
    }
  ]).factory('adminRestangular', [
    'Restangular', function(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        return RestangularConfigurer.setBaseUrl(window.hsConfig.adminBaseUrl);
      });
    }
  ]);

}).call(this);
