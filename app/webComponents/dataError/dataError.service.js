(function() {
  'use strict';
  angular.module("myApp").service("dataErrorService", [
    '$log', '$q', '$timeout', '$mdToast', 'hsAuth', 'Restangular', 'hsAPI', function($log, $q, $timeout, $mdToast, hsAuth, Restangular, hsAPI) {
      var getDataType, getSystemSource, getUnit;
      getSystemSource = function() {
        var deferred, res;
        deferred = $q.defer();
        res = {};
        res.data = ['系统1', '系统2', '系统3', '系统4'];
        return $timeout(function() {
          deferred.resolve(res);
          return deferred.promise;
        }, 1000);
      };
      getUnit = function() {
        var deferred, res;
        deferred = $q.defer();
        res = {};
        res.data = ['单位1', '单位2', '单位3', '单位4'];
        return $timeout(function() {
          deferred.resolve(res);
          return deferred.promise;
        }, 1000);
      };
      getDataType = function() {
        var deferred, res;
        deferred = $q.defer();
        res = {};
        res.data = ['数据1', '数据2', '数据3', '数据4'];
        return $timeout(function() {
          deferred.resolve(res);
          return deferred.promise;
        }, 1000);
      };
      this.getDataType = getDataType;
      this.getUnit = getUnit;
      this.getSystemSource = getSystemSource;
    }
  ]);

}).call(this);
