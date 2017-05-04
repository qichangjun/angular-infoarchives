(function() {
  'use strict';
  angular.module("myApp").factory('MockRestangular', [
    'Restangular', function(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        return RestangularConfigurer.setBaseUrl('http://mvn.docworks.cn:9092/mockjsdata/5');
      });
    }
  ]);

  'use strict';

  angular.module("myApp").factory('templateRestangular', [
    'Restangular', function(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(window.hsConfig.baseUrl);
        RestangularConfigurer.setJsonp(true);
        return RestangularConfigurer.setDefaultRequestParams('jsonp', {
          callback: 'JSON_CALLBACK'
        });
      });
    }
  ]);

}).call(this);
