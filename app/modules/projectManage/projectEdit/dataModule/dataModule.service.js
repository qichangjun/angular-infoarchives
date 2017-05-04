(function() {
  'use strict';
  angular.module("myApp").service("dataModuleService", [
    '$log', '$q', '$timeout', '$mdToast', 'MockRestangular', 'hsAPI', 'mdToastService', 'hsAuth', 'Restangular', '$http', '$state', function($log, $q, $timeout, $mdToast, MockRestangular, hsAPI, mdToastService, hsAuth, Restangular, $http, $state) {
      var createModule, editModule, exportModuke, exportSample, getModuleInfo, getModuleVersionList, getSysAttr, updateVersion;
      getModuleVersionList = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getModuleVersionList']).get({
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
          return mdToastService.showToast('服务器内部出错');
        });
        return deferred.promise;
      };
      createModule = function(containers, attrRules, id) {
        var deferred, obj;
        deferred = $q.defer();
        obj = {
          "containers": containers,
          "attrRules": attrRules,
          "template": {
            projectId: id
          }
        };
        Restangular.all(hsAPI['createModule'] + '?accessUser=' + hsAuth.getAccessKey() + '&accessToken=' + hsAuth.getAccessToken()).post(obj).then(function(res) {
          if (res.code === '1') {
            deferred.resolve(res.data);
            return mdToastService.showToast(res.message);
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
      updateVersion = function(containers, attrRules, template) {
        var deferred;
        deferred = $q.defer();
        Restangular.all(hsAPI['updateVersion'] + '?accessUser=' + hsAuth.getAccessKey() + '&accessToken=' + hsAuth.getAccessToken()).post({
          "containers": containers,
          "attrRules": attrRules,
          "template": template
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
          return mdToastService.showToast('服务器内部出错');
        });
        return deferred.promise;
      };
      editModule = function(containers, attrRules, template) {
        var deferred;
        deferred = $q.defer();
        Restangular.all(hsAPI['editModule'] + '?accessUser=' + hsAuth.getAccessKey() + '&accessToken=' + hsAuth.getAccessToken()).post({
          "containers": containers,
          "attrRules": attrRules,
          "template": template
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
          return mdToastService.showToast('服务器内部出错');
        });
        return deferred.promise;
      };
      getModuleInfo = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getModuleInfo']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          id: id
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
      getSysAttr = function(type) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getSysAttr']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          type: type
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
      exportModuke = function(templateId) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['exportModuke']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          templateId: templateId
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
      exportSample = function(templateId) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['exportSample']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          templateId: templateId
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
      this.exportSample = exportSample;
      this.exportModuke = exportModuke;
      this.getSysAttr = getSysAttr;
      this.getModuleInfo = getModuleInfo;
      this.editModule = editModule;
      this.updateVersion = updateVersion;
      this.createModule = createModule;
      this.getModuleVersionList = getModuleVersionList;
    }
  ]);

}).call(this);
