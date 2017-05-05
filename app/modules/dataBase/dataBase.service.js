(function() {
  'use strict';
  angular.module("myApp").service("dataBaseService", [
    '$log', '$q', '$timeout', 'Restangular', 'hsAPI', 'MockRestangular', 'hsTpl', 'hsAuth', 'mdToastService', 'uuid', 'commonMethodSerivce', function($log, $q, $timeout, Restangular, hsAPI, MockRestangular, hsTpl, hsAuth, mdToastService, uuid, commonMethodSerivce) {
      var dataBase, downloadFile, exportList, getBasicInfo, getGridData, getRecordDetail, getRecordJson, getSourceData, getUnitData, recordList;
      downloadFile = function(ids) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['recordDownload']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          ids: ids
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
      exportList = function(parameter) {
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
        if (info.source_unit) {
          columns.push(commonMethodSerivce.initColumn('sourceUnit', 'EQUAL', 'string', info.source_unit));
        }
        if (info.system_name) {
          columns.push(commonMethodSerivce.initColumn('systemName', 'EQUAL', 'string', info.system_name));
        }
        if (info.business_matter) {
          columns.push(commonMethodSerivce.initColumn('businessMatter', 'EQUAL', 'string', info.business_matter));
        }
        if (info.startDate) {
          columns.push(commonMethodSerivce.initColumn('createDate', 'GREATER_THAN', 'date', info.startDate));
        }
        if (info.endDate) {
          columns.push(commonMethodSerivce.initColumn('createDate', 'LESS_THAN', 'date', info.endDate));
        }
        if (info.name) {
          columns.push(commonMethodSerivce.initColumn('name', 'LIKE', 'string', info.name));
        }
        if (info.batchId) {
          columns.push(commonMethodSerivce.initColumn('batchCode', 'EQUAL', 'string', info.batchId));
        }
        Restangular.all(hsAPI['recordExportList'] + '?accessUser=' + hsAuth.getAccessKey() + '&accessToken=' + hsAuth.getAccessToken()).post({
          columns: columns,
          orders: orders,
          page: info.currentPage,
          length: info.pageSize
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
      getBasicInfo = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getRecordCount']).get({
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
      getRecordDetail = function(parameter) {
        var columns, deferred, info, orders;
        info = angular.copy(parameter);
        deferred = $q.defer();
        orders = [];
        columns = [];
        if (info.source_unit) {
          columns.push(commonMethodSerivce.initColumn('sourceUnit', 'EQUAL', 'string', info.source_unit));
        }
        if (info.system_name) {
          columns.push(commonMethodSerivce.initColumn('systemName', 'EQUAL', 'string', info.system_name));
        }
        if (info.business_matter) {
          columns.push(commonMethodSerivce.initColumn('businessMatter', 'EQUAL', 'string', info.business_matter));
        }
        Restangular.all(hsAPI['getRecordDetail'] + '?accessUser=' + hsAuth.getAccessKey() + '&accessToken=' + hsAuth.getAccessToken()).post({
          columns: columns,
          orders: orders,
          page: 1,
          length: 50
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
        if (info.source_unit) {
          columns.push(commonMethodSerivce.initColumn('sourceUnit', 'EQUAL', 'string', info.source_unit));
        }
        if (info.system_name) {
          columns.push(commonMethodSerivce.initColumn('systemName', 'EQUAL', 'string', info.system_name));
        }
        if (info.business_matter) {
          columns.push(commonMethodSerivce.initColumn('businessMatter', 'EQUAL', 'string', info.business_matter));
        }
        if (info.startDate) {
          columns.push(commonMethodSerivce.initColumn('createDate', 'GREATER_THAN', 'date', info.startDate));
        }
        if (info.endDate) {
          columns.push(commonMethodSerivce.initColumn('createDate', 'LESS_THAN', 'date', info.endDate));
        }
        if (info.name) {
          columns.push(commonMethodSerivce.initColumn('name', 'LIKE', 'string', info.name));
        }
        if (info.batchId) {
          columns.push(commonMethodSerivce.initColumn('batchCode', 'EQUAL', 'string', info.batchId));
        }
        if (info.batchStatus) {
          columns.push(commonMethodSerivce.initColumn('batchStatus', 'EQUAL', 'int', info.batchStatus));
        }
        Restangular.all(hsAPI['getRecordList'] + '?accessUser=' + hsAuth.getAccessKey() + '&accessToken=' + hsAuth.getAccessToken()).post({
          columns: columns,
          orders: orders,
          page: info.currentPage,
          length: info.pageSize
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
      getUnitData = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getUnitData']).get({
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
      getSourceData = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getSourceData']).get({
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
      getRecordJson = function(recordCode) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getRecordJson']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          recordCode: recordCode
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
      dataBase = [
        {
          name: 'SipId',
          headerCellFilter: 'translate',
          displayName: 'MODULES_DATABASE_SIP_ID',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'dataPath',
          headerCellFilter: 'translate',
          displayName: 'MODULES_DATABASE_DATA_PATH',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'dataSize',
          headerCellFilter: 'translate',
          displayName: 'MODULES_DATABASE_DATA_SIZE',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'startData',
          headerCellFilter: 'translate',
          displayName: 'MODULES_DATABASE_START_DATA',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }
      ];
      recordList = [
        {
          field: 'archivalId',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_ARCHIVAL_ID',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'batchCode',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_BATCH_CODE',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'businessCode',
          headerCellFilter: 'translate',
          displayName: 'MODULES_DATABASE_BUSINESS_TRANSACTION',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'name',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_NAME',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'licenseNumber',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_RECORD_CODE',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'createDate',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_CREATE_DATE',
          minWidth: 150,
          cellTemplate: 'modules/dataBase/template/ui-grid-template/grid-recordList-createDate.html'
        }, {
          field: 'modifyDate',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_MODIFY_DATE',
          minWidth: 150,
          cellTemplate: 'modules/dataBase/template/ui-grid-template/grid-recordList-modifyDate.html'
        }
      ];
      this.getRecordJson = getRecordJson;
      this.downloadFile = downloadFile;
      this.getRecordDetail = getRecordDetail;
      this.getBasicInfo = getBasicInfo;
      this.getSourceData = getSourceData;
      this.getUnitData = getUnitData;
      this.getGridData = getGridData;
      this.exportList = exportList;
      this.dataBase = dataBase;
      this.recordList = recordList;
    }
  ]);

}).call(this);
