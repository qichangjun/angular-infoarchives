(function() {
  'use strict';
  angular.module("myApp").service("dataBaseService", [
    '$log', '$q', function($log, $q) {
      var getDataList, getGridData;
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
        var deferred, res;
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
        deferred.resolve(res);
        return deferred.promise;
      };
      this.getGridData = getGridData;
      this.getDataList = getDataList;
    }
  ]);

}).call(this);
