(function() {
  'use strict';
  angular.module("myApp").service("moduleTemplateService", [
    '$log', '$q', '$timeout', '$mdToast', 'MockRestangular', 'hsAPI', 'mdToastService', 'hsAuth', 'Restangular', '$state', 'templateRestangular', function($log, $q, $timeout, $mdToast, MockRestangular, hsAPI, mdToastService, hsAuth, Restangular, $state, templateRestangular) {
      var createTemplate, getAttributeList, getTemplate;
      getAttributeList = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getAttributeList']).get({
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
      getTemplate = function(id) {
        var deferred;
        deferred = $q.defer();
        templateRestangular.one(hsAPI['getShowTemplate']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          templateId: id
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
      createTemplate = function(data, id) {
        var deferred, string_data;
        deferred = $q.defer();
        string_data = angular.copy(data);
        Restangular.all(hsAPI['createShowTemplate'] + '?accessUser=' + hsAuth.getAccessKey() + '&accessToken=' + hsAuth.getAccessToken()).post({
          templateId: id,
          showTemplate: JSON.stringify(string_data)
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
      this.getTemplate = getTemplate;
      this.createTemplate = createTemplate;
      this.getAttributeList = getAttributeList;
    }
  ]);

}).call(this);
