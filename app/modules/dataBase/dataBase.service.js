(function() {
  'use strict';
  angular.module("myApp").service("dataBaseService", [
    '$log', '$q', '$timeout', 'Restangular', 'hsAPI', 'MockRestangular', 'hsTpl', function($log, $q, $timeout, Restangular, hsAPI, MockRestangular, hsTpl) {
      var dataBase, getDataList, getGridData;
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
        deferred.resolve(res);
        return deferred.promise;
      };
      dataBase = [
        {
          name: 'SipId',
          headerCellFilter: 'translate',
          displayName: '批次号',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <input ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.sip" class="grid-search-input form-control single--attribute--box__input"> </div>'
        }, {
          name: 'dataPath',
          headerCellFilter: 'translate',
          displayName: '数据位置',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <input  ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.dataPath" class="grid-search-input form-control single--attribute--box__input"> </div>'
        }, {
          name: 'dataSize',
          headerCellFilter: 'translate',
          displayName: '数据大小',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <input   ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.dataSize" class="grid-search-input form-control single--attribute--box__input"> </div>'
        }, {
          name: 'startData',
          headerCellFilter: 'translate',
          displayName: '开始事件',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <input  ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.startData" class="grid-search-input form-control single--attribute--box__input"> </div>'
        }
      ];
      this.dataBase = dataBase;
      this.getGridData = getGridData;
      this.getDataList = getDataList;
    }
  ]);

}).call(this);
