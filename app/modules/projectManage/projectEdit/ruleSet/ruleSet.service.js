(function() {
  'use strict';
  angular.module("myApp").service("ruleSetService", [
    '$log', '$q', '$timeout', '$mdToast', 'MockRestangular', 'hsAPI', 'mdToastService', 'hsAuth', function($log, $q, $timeout, $mdToast, MockRestangular, hsAPI, mdToastService, hsAuth) {
      var getProperty, getRule, saveRule;
      getRule = function(id) {
        var deferred;
        deferred = $q.defer();
        MockRestangular.one(hsAPI['getRule']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          objectId: id
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
          } else {
            deferred.reject(res);
            return mdToastService.showToast(res.message);
          }
        }, function(res) {
          deferred.reject(res);
          return mdToastService.showToast('服务器内部出错');
        });
        return deferred.promise;
      };
      getProperty = function(id) {
        var deferred;
        deferred = $q.defer();
        MockRestangular.one(hsAPI['getProperty']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          objectId: id
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
          } else {
            deferred.reject(res);
            return mdToastService.showToast(res.message);
          }
        }, function(res) {
          deferred.reject(res);
          return mdToastService.showToast('服务器内部出错');
        });
        return deferred.promise;
      };
      saveRule = function(fileds) {
        var deferred;
        deferred = $q.defer();
        MockRestangular.one(hsAPI['saveRule']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          fileds: fileds
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
          } else {
            deferred.reject(res);
            return mdToastService.showToast(res.message);
          }
        }, function(res) {
          deferred.reject(res);
          return mdToastService.showToast('服务器内部出错');
        });
        return deferred.promise;
      };
      this.saveRule = saveRule;
      this.getProperty = getProperty;
      this.getRule = getRule;
    }
  ]);

}).call(this);
