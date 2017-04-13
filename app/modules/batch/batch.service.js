// Generated by CoffeeScript 1.9.1
(function() {
  'use strict';
  angular.module("myApp").service("batchService", [
    '$log', '$q', '$timeout', '$mdToast', 'hsAuth', 'Restangular', 'hsAPI', 'hsTpl', 'mdToastService', 'MockRestangular', 'commonMethodSerivce', function($log, $q, $timeout, $mdToast, hsAuth, Restangular, hsAPI, hsTpl, mdToastService, MockRestangular, commonMethodSerivce) {
      var batch, batchErrorList, getDataType, getDetailInfo, getErrorGridData, getErrorList, getGridData, getSystemSource, getUnit;
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
        var columns, deferred, info, orders;
        info = angular.copy(parameter);
        deferred = $q.defer();
        if (parameter.sortField && parameter.sortWay) {
          orders = [
            {
              column: parameter.sortField,
              direction: parameter.sortWay
            }
          ];
        } else {
          orders = [];
        }
        columns = [];
        if (info.projectId) {
          columns.push(commonMethodSerivce.initColumn('project_id', 'EQUAL', 'string', info.projectId));
        }
        if (parameter.start_date) {
          columns.push(commonMethodSerivce.initColumn('package_aiu_start_date', 'GREATER_THAN', 'date', info.start_date));
        }
        if (parameter.end_date) {
          columns.push(commonMethodSerivce.initColumn('package_aip_end_date', 'LESS_THAN', 'date', info.end_date));
        }
        if (parameter.exception_handle_behavior) {
          columns.push(commonMethodSerivce.initColumn('exception_handle_behavior', 'EQUAL', 'int', info.exception_handle_behavior));
        }
        if (parameter.batch_status && parameter.batch_status !== 'all') {
          columns.push(commonMethodSerivce.initColumn('batch_status', 'IN', 'int', info.batch_status));
        }
        Restangular.all(hsAPI['getBatchList'] + '?accessUser=' + hsAuth.getAccessKey() + '&accessToken=' + hsAuth.getAccessToken()).post({
          columns: columns,
          orders: orders,
          page: parameter.currentPage,
          length: parameter.pageSize
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
      getErrorList = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getErrorList']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          batchId: id
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
      getDetailInfo = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getBatchDetail']).withHttpConfig({
          ignoreLoadingBar: true
        }).get({
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
      getErrorGridData = function(parameter) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getErrorGridData']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          exceptionRecordId: parameter.objectId,
          currentPage: parameter.currentPage,
          pageSize: parameter.pageSize
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
      batch = [
        {
          field: 'batchCode',
          name: 'batch_code',
          headerCellFilter: 'translate',
          displayName: '批次号',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'id',
          name: 'id',
          headerCellFilter: 'translate',
          displayName: '业务系统ID',
          minWidth: 100,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'batch_status',
          headerCellClass: 'background',
          headerCellFilter: 'translate',
          displayName: '状态',
          width: 50,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-status.html'
        }, {
          name: 'start_date',
          headerCellFilter: 'translate',
          displayName: '起始时间',
          minWidth: 150,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-startDate.html'
        }, {
          name: 'end_date',
          headerCellFilter: 'translate',
          displayName: '结束区间',
          minWidth: 150,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-endDate.html'
        }, {
          field: 'aiuCount',
          name: 'aiu_count',
          headerCellFilter: 'translate',
          displayName: '数据包数量',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'aipCount',
          name: 'aip_count',
          headerCellFilter: 'translate',
          displayName: '数据量',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'operation',
          enableSorting: false,
          headerCellFilter: 'translate',
          displayName: '',
          minWidth: 150,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-operation.html'
        }
      ];
      batchErrorList = [
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
          name: 'recordName',
          headerCellFilter: 'translate',
          displayName: '申报名称',
          width: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'exceptionDesc',
          headerCellFilter: 'translate',
          displayName: '异常说明',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'exceptionHandleBehavior',
          headerCellFilter: 'translate',
          displayName: '异常处理',
          minWidth: 50,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-exceptionHandleBehavior.html'
        }, {
          name: 'dealAction',
          headerCellFilter: 'translate',
          displayName: '处理动作',
          minWidth: 50,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-dealAction.html'
        }
      ];
      this.getErrorList = getErrorList;
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

//# sourceMappingURL=batch.service.js.map
