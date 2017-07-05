(function() {
  'use strict';
  angular.module("myApp").service("connectMapService", [
    '$log', '$q', '$timeout', '$mdToast', 'hsAuth', 'Restangular', 'hsAPI', 'hsTpl', 'mdToastService', 'MockRestangular', 'commonMethodSerivce', '$state', '$translate', function($log, $q, $timeout, $mdToast, hsAuth, Restangular, hsAPI, hsTpl, mdToastService, MockRestangular, commonMethodSerivce, $state, $translate) {
      var getSystemInfo, getSystemLists;
      getSystemInfo = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getTopology']).get({
          accessToken: hsAuth.getAccessToken(),
          projectId: id
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
          } else if (res.code === '0') {
            mdToastService.showToast(res.message);
            return commonMethodSerivce.logOut();
          } else {
            deferred.reject(res);
            return mdToastService.showToast(res.message);
          }
        }, function(res) {
          deferred.reject(res);
          return mdToastService.showToast($translate.instant('MODULES_SHOWTOAST_SERVER_ERROR'));
        });
        return deferred.promise;
      };
      getSystemLists = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getSystemLists']).get({
          accessToken: hsAuth.getAccessToken()
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
          } else if (res.code === '0') {
            mdToastService.showToast(res.message);
            return commonMethodSerivce.logOut();
          } else {
            deferred.reject(res);
            return mdToastService.showToast(res.message);
          }
        }, function(res) {
          deferred.reject(res);
          return mdToastService.showToast($translate.instant('MODULES_SHOWTOAST_SERVER_ERROR'));
        });
        return deferred.promise;
      };
      this.getSystemLists = getSystemLists;
      this.getSystemInfo = getSystemInfo;
    }
  ]);

}).call(this);
