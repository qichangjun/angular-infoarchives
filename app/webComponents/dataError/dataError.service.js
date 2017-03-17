(function() {
  'use strict';
  angular.module("myApp").service("dataErrorService", [
    '$log', '$q', '$timeout', '$mdToast', 'hsAuth', 'Restangular', 'hsAPI', function($log, $q, $timeout, $mdToast, hsAuth, Restangular, hsAPI) {
      var getDataType, getGridData, getSystemSource, getUnit;
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
      getGridData = function() {
        var arry, deferred, i, res;
        deferred = $q.defer();
        res = {};
        res.data = [
          {
            objectId: '1',
            status: true,
            startData: '2016-11-21',
            endData: '2016-11-21',
            YWID: 'YW00120170123123455001',
            YWSyetemId: 'YW001',
            YWUnit: '浙江省住建厅',
            AIUAmount: 3789,
            dataAmount: '68.3M',
            keepTime: '1m31s',
            AIPswitch: 3789,
            dataError: 0,
            forceSwitch: 0
          }, {
            objectId: '2',
            status: false,
            startData: '2016-1-21',
            endData: '2016-6-21',
            YWID: 'YW00120171123223455221',
            YWSyetemId: 'YW002',
            YWUnit: '浙江省住建厅',
            AIUAmount: 3789,
            dataAmount: '7.3M',
            keepTime: '29s',
            AIPswitch: 766,
            dataError: 1,
            forceSwitch: 2
          }, {
            objectId: '3',
            status: true,
            startData: '2016-1-21',
            endData: '2016-6-21',
            YWID: 'YW00120171124413455221',
            YWSyetemId: 'YW001',
            YWUnit: '浙江省住建厅',
            AIUAmount: 1344,
            dataAmount: '22.3M',
            keepTime: '1m9s',
            AIPswitch: 122,
            dataError: 1,
            forceSwitch: 2
          }
        ];
        arry = [
          {
            objectId: '1',
            status: true,
            startData: '2016-11-21',
            endData: '2016-11-21',
            YWID: 'YW00120170123123455001',
            YWSyetemId: 'YW001',
            YWUnit: '浙江省住建厅',
            AIUAmount: 3789,
            dataAmount: '68.3M',
            keepTime: '1m31s',
            AIPswitch: 3789,
            dataError: 0,
            forceSwitch: 0
          }, {
            objectId: '2',
            status: false,
            startData: '2016-1-21',
            endData: '2016-6-21',
            YWID: 'YW00120171123223455221',
            YWSyetemId: 'YW002',
            YWUnit: '浙江省住建厅',
            AIUAmount: 3789,
            dataAmount: '7.3M',
            keepTime: '29s',
            AIPswitch: 766,
            dataError: 1,
            forceSwitch: 2
          }, {
            objectId: '3',
            status: true,
            startData: '2016-1-21',
            endData: '2016-6-21',
            YWID: 'YW00120171124413455221',
            YWSyetemId: 'YW001',
            YWUnit: '浙江省住建厅',
            AIUAmount: 1344,
            dataAmount: '22.3M',
            keepTime: '1m9s',
            AIPswitch: 122,
            dataError: 1,
            forceSwitch: 2
          }
        ];
        i = 0;
        while (i < 22) {
          res.data = res.data.concat(arry);
          i++;
        }
        deferred.resolve(res);
        return deferred.promise;
      };
      this.getGridData = getGridData;
      this.getDataType = getDataType;
      this.getUnit = getUnit;
      this.getSystemSource = getSystemSource;
    }
  ]);

}).call(this);
