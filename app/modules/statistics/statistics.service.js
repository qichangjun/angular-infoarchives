(function() {
  'use strict';
  angular.module("myApp").service("statisticsService", [
    '$log', '$q', '$timeout', '$mdToast', 'Restangular', 'hsAPI', 'hsAuth', 'mdToastService', function($log, $q, $timeout, $mdToast, Restangular, hsAPI, hsAuth, mdToastService) {
      var getRecordNum, getSystemName, getTopTenData, getYearList;
      getTopTenData = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getTopTenData']).get({
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
      getSystemName = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getSystemName']).get({
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
      getRecordNum = function(info) {
        var deferred, myDate, parameter;
        myDate = new Date();
        parameter = angular.copy(info);
        if (parameter.year === 'all') {
          parameter.year = myDate.getFullYear();
        }
        parameter.accessUser = hsAuth.getAccessKey();
        parameter.accessToken = hsAuth.getAccessToken();
        deferred = $q.defer();
        Restangular.one(hsAPI['getRecordNum']).get(parameter).then(function(res) {
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
      getYearList = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getYearList']).get({
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
      this.getYearList = getYearList;
      this.getRecordNum = getRecordNum;
      this.getSystemName = getSystemName;
      this.getTopTenData = getTopTenData;
    }
  ]);

}).call(this);
