(function() {
  'use strict';
  angular.module("myApp").service("dataBaseService", [
    '$log', '$q', '$timeout', 'Restangular', 'hsAPI', 'MockRestangular', function($log, $q, $timeout, Restangular, hsAPI, MockRestangular) {
      var getDataList, getGridData, test;
      $log.info("dataBaseService");
      getDataList = function() {
        var deferred, res;
        deferred = $q.defer();
        res = {};
        res.data = [
          {
            displayName: 'db_行政审批系统',
            objectId: '1'
          }, {
            displayName: 'db_医学出生证明系统',
            objectId: '2'
          }, {
            displayName: 'db_婚姻登记系统',
            objectId: '3'
          }
        ];
        deferred.resolve(res);
        return deferred.promise;
      };
      getGridData = function() {
        var arry, deferred, i, res;
        deferred = $q.defer();
        res = {};
        res.data = [
          {
            state: true,
            objectId: '1',
            SipId: 'SIP201611211064643',
            dataPath: '/行政审批平台/sip包',
            dataSize: '264KB',
            startData: '2016-11-21',
            endData: '2016-11-21',
            keepTime: 3303,
            recordNum: 4,
            isAip: true
          }, {
            state: true,
            objectId: '2',
            SipId: 'SIP20161121104413',
            dataPath: '/行政审批平台/sip包',
            dataSize: '113',
            startData: '2016-11-21',
            endData: '2016-11-21',
            keepTime: 7704,
            recordNum: 2,
            isAip: true
          }, {
            state: true,
            objectId: '3',
            SipId: 'SIP201611211076112',
            dataPath: '/行政审批平台/sip包',
            dataSize: '264KB',
            startData: '2016-11-21',
            endData: '2016-11-21',
            keepTime: 11441,
            recordNum: 4,
            isAip: false
          }
        ];
        arry = [
          {
            state: true,
            objectId: '1',
            SipId: 'SIP201611211064643',
            dataPath: '/行政审批平台/sip包',
            dataSize: '264KB',
            startData: '2016-11-21',
            endData: '2016-11-21',
            keepTime: 3303,
            recordNum: 4,
            isAip: true
          }, {
            state: true,
            objectId: '2',
            SipId: 'SIP20161121104413',
            dataPath: '/行政审批平台/sip包',
            dataSize: '113',
            startData: '2016-11-21',
            endData: '2016-11-21',
            keepTime: 7704,
            recordNum: 2,
            isAip: true
          }, {
            state: true,
            objectId: '3',
            SipId: 'SIP201611211076112',
            dataPath: '/行政审批平台/sip包',
            dataSize: '264KB',
            startData: '2016-11-21',
            endData: '2016-11-21',
            keepTime: 11441,
            recordNum: 4,
            isAip: false
          }
        ];
        i = 0;
        while (i < 22) {
          res.data = res.data.concat(arry);
          i++;
        }
        $timeout(function() {
          return deferred.resolve(res);
        }, 1000);
        return deferred.promise;
      };
      test = function() {
        var deferred;
        deferred = $q.defer();
        MockRestangular.one(hsAPI['test']).get().then(function(res) {
          return deferred.resolve('用户登录：登录成功');
        }, function(res) {
          return deferred.reject('用户登录：系统错误，请稍候再试');
        });
        return deferred.promise;
      };
      this.test = test;
      this.getGridData = getGridData;
      this.getDataList = getDataList;
    }
  ]);

}).call(this);
