(function() {
  'use strict';
  angular.module("myApp").service("batchService", [
    '$log', '$q', '$timeout', '$mdToast', 'hsAuth', 'Restangular', 'hsAPI', 'hsTpl', 'mdToastService', 'MockRestangular', function($log, $q, $timeout, $mdToast, hsAuth, Restangular, hsAPI, hsTpl, mdToastService, MockRestangular) {
      var batch, batchErrorList, getDataType, getDetailInfo, getErrorGridData, getGridData, getSystemSource, getUnit;
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
      getGridData = function(parameter) {
        var deferred, info;
        info = angular.copy(parameter);
        deferred = $q.defer();
        info.projectId = 1234;
        info.accessUser = hsAuth.getAccessKey();
        info.accessToken = hsAuth.getAccessToken();
        MockRestangular.one(hsAPI['getBatchList']).get(info).then(function(res) {
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
      getDetailInfo = function(id) {
        var deferred;
        deferred = $q.defer();
        MockRestangular.one(hsAPI['getBatchDetail']).get({
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
      getErrorGridData = function() {
        var deferred, res;
        deferred = $q.defer();
        res = {};
        res.data = [
          {
            objectId: '1',
            status: true,
            YWID: 'YW00120170123123455001',
            YWSyetemId: 'YW001',
            YWUnit: '浙江省住建厅',
            porterName: 'xxxxxxxxx',
            errorExplain: 'xfffffff',
            errorDeal: '待处理',
            dealAction: '-'
          }, {
            objectId: '2',
            status: true,
            YWID: 'YW00120170123123455001',
            YWSyetemId: 'YW001',
            YWUnit: '浙江省住建厅',
            porterName: 'xxxxxxxxx',
            errorExplain: 'xfffffff',
            errorDeal: '待处理',
            dealAction: '-'
          }, {
            objectId: '3',
            status: true,
            YWID: 'YW00120170123123455001',
            YWSyetemId: 'YW001',
            YWUnit: '浙江省住建厅',
            porterName: 'xxxxxxxxx',
            errorExplain: 'xfffffff',
            errorDeal: '待处理',
            dealAction: '-'
          }
        ];
        $timeout(function() {
          return deferred.resolve(res);
        }, 1000);
        return deferred.promise;
      };
      batch = [
        {
          name: 'batchCode',
          headerCellFilter: 'translate',
          displayName: '批次号',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'id',
          headerCellFilter: 'translate',
          displayName: '业务系统ID',
          minWidth: 100,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'batchStatus',
          headerCellClass: 'background',
          headerCellFilter: 'translate',
          displayName: '状态',
          width: 50,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-status.html'
        }, {
          name: 'startDate',
          headerCellFilter: 'translate',
          displayName: '起始时间',
          minWidth: 150,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-startDate.html'
        }, {
          name: 'endDate',
          headerCellFilter: 'translate',
          displayName: '结束区间',
          minWidth: 150,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-endDate.html'
        }, {
          name: 'aiuCount',
          headerCellFilter: 'translate',
          displayName: '数据包数量',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'aipCount',
          headerCellFilter: 'translate',
          displayName: '数据量',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'operation',
          headerCellFilter: 'translate',
          displayName: '',
          minWidth: 150,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-operation.html'
        }
      ];
      batchErrorList = [
        {
          name: 'YWID',
          headerCellFilter: 'translate',
          displayName: '批次号',
          minWidth: 200,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-YW.html'
        }, {
          name: 'YWSyetemId',
          headerCellFilter: 'translate',
          displayName: '业务系统ID',
          minWidth: 100,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'porterName',
          headerCellClass: 'background',
          headerCellFilter: 'translate',
          displayName: '申报名称',
          width: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'errorExplain',
          headerCellFilter: 'translate',
          displayName: '异常说明',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'errorDeal',
          headerCellFilter: 'translate',
          displayName: '异常处理',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'dealAction',
          headerCellFilter: 'translate',
          displayName: '处理动作',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }
      ];
      this.getDetailInfo = getDetailInfo;
      this.getErrorGridData = getErrorGridData;
      this.batchErrorList = batchErrorList;
      this.batch = batch;
      this.getGridData = getGridData;
      this.getDataType = getDataType;
      this.getUnit = getUnit;
      this.getSystemSource = getSystemSource;
    }
  ]);

}).call(this);
