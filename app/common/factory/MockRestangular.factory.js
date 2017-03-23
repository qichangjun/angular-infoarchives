(function() {
  'use strict';
  angular.module("myApp").factory('MockRestangular', [
    'Restangular', function(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        return RestangularConfigurer.setBaseUrl('http://mvn.docworks.cn:9092/mockjsdata/5');
      });
    }
  ]);

}).call(this);
