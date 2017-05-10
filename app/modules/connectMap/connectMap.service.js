(function() {
  'use strict';
  angular.module("myApp").service("connectMapService", [
    '$log', '$q', '$timeout', '$mdToast', 'hsAuth', 'Restangular', 'hsAPI', 'hsTpl', 'mdToastService', 'MockRestangular', 'commonMethodSerivce', '$state', function($log, $q, $timeout, $mdToast, hsAuth, Restangular, hsAPI, hsTpl, mdToastService, MockRestangular, commonMethodSerivce, $state) {
      var getSystemInfo, getSystemLists;
      getSystemInfo = function(systemName) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getTopology']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          systemName: systemName
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
      getSystemLists = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getSystemLists']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken()
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
      this.getSystemLists = getSystemLists;
      this.getSystemInfo = getSystemInfo;
    }
  ]);

}).call(this);
