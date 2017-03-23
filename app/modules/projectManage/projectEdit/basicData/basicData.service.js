(function() {
  'use strict';
  angular.module("myApp").service("basicDataService", [
    '$log', '$q', '$timeout', '$mdToast', 'MockRestangular', 'hsAPI', 'mdToastService', 'hsAuth', function($log, $q, $timeout, $mdToast, MockRestangular, hsAPI, mdToastService, hsAuth) {
      var editProject, getProjectInfo;
      getProjectInfo = function(id) {
        var deferred;
        deferred = $q.defer();
        MockRestangular.one(hsAPI['getProjectInfo']).get({
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
      editProject = function(parameter) {
        var deferred;
        deferred = $q.defer();
        parameter.accessUser = hsAuth.getAccessKey();
        parameter.accessToken = hsAuth.getAccessToken();
        MockRestangular.one(hsAPI['editProject']).get(parameter).then(function(res) {
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
      this.editProject = editProject;
      this.getProjectInfo = getProjectInfo;
    }
  ]);

}).call(this);