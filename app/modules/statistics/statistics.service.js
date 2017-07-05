(function() {
  'use strict';
  angular.module("myApp").service("statisticsService", [
    '$log', '$q', '$timeout', '$mdToast', 'Restangular', 'hsAPI', 'hsAuth', 'mdToastService', 'commonMethodSerivce', '$translate', function($log, $q, $timeout, $mdToast, Restangular, hsAPI, hsAuth, mdToastService, commonMethodSerivce, $translate) {
      var exportExcel, getBusinessMatterList, getOverAll, getRecordNum, getSystemName, getTopTenData, getYearList;
      getTopTenData = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getTopTenData']).get({
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
      getSystemName = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getSystemName']).get({
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
      getRecordNum = function(info) {
        var deferred, parameter;
        parameter = angular.copy(info);
        parameter.accessToken = hsAuth.getAccessToken();
        deferred = $q.defer();
        Restangular.one(hsAPI['getRecordNum']).get(parameter).then(function(res) {
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
      getBusinessMatterList = function(info) {
        var deferred, parameter;
        parameter = angular.copy(info);
        parameter.accessToken = hsAuth.getAccessToken();
        parameter.unitName = parameter.unit;
        deferred = $q.defer();
        Restangular.one(hsAPI['getBusinessMatterList']).get(parameter).then(function(res) {
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
      getYearList = function(unitName) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getYearList']).get({
          accessToken: hsAuth.getAccessToken(),
          unitName: unitName
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
      getOverAll = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getOverAll']).get({
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
      exportExcel = function(info) {
        var deferred, parameter;
        deferred = $q.defer();
        parameter = angular.copy(info);
        parameter.accessToken = hsAuth.getAccessToken();
        parameter.unitName = parameter.unit;
        if (parameter.unitName === 'all') {
          parameter.unitName = null;
        }
        Restangular.one(hsAPI['exportExcel']).get(parameter).then(function(res) {
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
      this.exportExcel = exportExcel;
      this.getBusinessMatterList = getBusinessMatterList;
      this.getOverAll = getOverAll;
      this.getYearList = getYearList;
      this.getRecordNum = getRecordNum;
      this.getSystemName = getSystemName;
      this.getTopTenData = getTopTenData;
    }
  ]);

}).call(this);
