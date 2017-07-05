(function() {
  'use strict';
  angular.module("myApp").service("ruleSetService", [
    '$log', '$q', '$timeout', '$mdToast', 'MockRestangular', 'hsAPI', 'mdToastService', 'hsAuth', 'Restangular', '$state', '$translate', function($log, $q, $timeout, $mdToast, MockRestangular, hsAPI, mdToastService, hsAuth, Restangular, $state, $translate) {
      var createRule, getProperty, getRetentionPeriodId, getRetentionPeriodList, getRetentionPolicyId, getRetentionPolicyList, getRule, saveRetentionPeriod, saveRetentionPeriodAndPolicy, saveRetentionPolicy, saveRule;
      getRule = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getRule']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          projectId: id
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
          } else if (res.code === '10004') {
            hsAuth.removeUser();
            return $state.go('login');
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
      getProperty = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getProperty']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          projectId: id
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
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
      saveRule = function(fields, codingPolicy) {
        var deferred;
        deferred = $q.defer();
        Restangular.all(hsAPI['saveRule'] + '?accessUser=' + hsAuth.getAccessKey() + '&accessToken=' + hsAuth.getAccessToken()).post({
          fields: fields,
          codingPolicy: codingPolicy
        }).then(function(res) {
          if (res.code === '1') {
            deferred.resolve(res.data);
            return mdToastService.showToast(res.message);
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
      createRule = function(fields, projectId) {
        var deferred;
        deferred = $q.defer();
        Restangular.all(hsAPI['createRule'] + '?accessUser=' + hsAuth.getAccessKey() + '&accessToken=' + hsAuth.getAccessToken()).post({
          fields: fields,
          codingPolicy: {
            projectId: projectId,
            codingPolicyName: 'default'
          }
        }).then(function(res) {
          if (res.code === '1') {
            deferred.resolve(res.data);
            return mdToastService.showToast(res.message);
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
      getRetentionPeriodId = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getRetentionPeriodId']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          projectId: id
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
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
      getRetentionPolicyId = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getRetentionPolicyId']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          projectId: id
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
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
      getRetentionPolicyList = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getRetentionPolicyList']).get({
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
          return mdToastService.showToast($translate.instant('MODULES_SHOWTOAST_SERVER_ERROR'));
        });
        return deferred.promise;
      };
      getRetentionPeriodList = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getRetentionPeriodList']).get({
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
          return mdToastService.showToast($translate.instant('MODULES_SHOWTOAST_SERVER_ERROR'));
        });
        return deferred.promise;
      };
      saveRetentionPolicy = function(retentioPolicyId, projectId) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['saveRetentionPolicy']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          projectId: projectId,
          id: retentioPolicyId
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
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
      saveRetentionPeriod = function(retentionPeriodId, projectId) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['saveRetentionPeriod']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          projectId: projectId,
          id: retentionPeriodId
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
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
      saveRetentionPeriodAndPolicy = function(info) {
        var deferred;
        deferred = $q.defer();
        info.accessUser = hsAuth.getAccessKey();
        info.accessToken = hsAuth.getAccessToken();
        Restangular.one(hsAPI['saveRetentionPeriodAndPolicy']).get(info).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
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
      this.saveRetentionPeriodAndPolicy = saveRetentionPeriodAndPolicy;
      this.saveRetentionPolicy = saveRetentionPolicy;
      this.getRetentionPolicyList = getRetentionPolicyList;
      this.getRetentionPolicyId = getRetentionPolicyId;
      this.saveRetentionPeriod = saveRetentionPeriod;
      this.getRetentionPeriodId = getRetentionPeriodId;
      this.getRetentionPeriodList = getRetentionPeriodList;
      this.createRule = createRule;
      this.saveRule = saveRule;
      this.getProperty = getProperty;
      this.getRule = getRule;
    }
  ]);

}).call(this);
