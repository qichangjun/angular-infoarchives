(function() {
  'use strict';
  angular.module("myApp").service("projectManageService", [
    '$log', '$q', '$timeout', '$mdToast', 'MockRestangular', 'hsAPI', 'mdToastService', 'hsAuth', 'Restangular', function($log, $q, $timeout, $mdToast, MockRestangular, hsAPI, mdToastService, hsAuth, Restangular) {
      var deleteProject, getDataBaseList, getProjectList, newProject;
      $log.info("projectManageService");
      getProjectList = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getProjectList']).get({
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
      getDataBaseList = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getDataBaseList']).withHttpConfig({
          ignoreLoadingBar: true
        }).get({
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
      newProject = function(parameter) {
        var deferred;
        deferred = $q.defer();
        parameter.accessUser = hsAuth.getAccessKey();
        parameter.accessToken = hsAuth.getAccessToken();
        Restangular.one(hsAPI['newProject']).get(parameter).then(function(res) {
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
      deleteProject = function(objectId) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['deleteProject']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          id: objectId
        }).then(function(res) {
          if (res.code === '1') {
            deferred.resolve(res);
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
      this.deleteProject = deleteProject;
      this.newProject = newProject;
      this.getDataBaseList = getDataBaseList;
      this.getProjectList = getProjectList;
    }
  ]);

}).call(this);
