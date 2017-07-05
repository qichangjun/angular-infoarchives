(function() {
  'use strict';
  angular.module("myApp").service("dataBaseService", [
    '$log', '$q', '$timeout', 'Restangular', 'hsAPI', 'MockRestangular', 'hsTpl', 'hsAuth', 'mdToastService', 'uuid', 'commonMethodSerivce', '$translate', function($log, $q, $timeout, Restangular, hsAPI, MockRestangular, hsTpl, hsAuth, mdToastService, uuid, commonMethodSerivce, $translate) {
      var dataBase, downloadFile, exportList, getBasicInfo, getGridData, getRecordDetail, getRecordJson, getSourceData, getUnitData, recordList;
      downloadFile = function(ids) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['recordDownload']).get({
          accessToken: hsAuth.getAccessToken(),
          ids: ids
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
        Restangular.all(hsAPI['recordExportList'] + '?accessToken=' + hsAuth.getAccessToken()).post({
          columns: columns,
          orders: orders,
          page: info.currentPage,
          length: info.pageSize
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
      getBasicInfo = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getRecordCount']).get({
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
        Restangular.all(hsAPI['getRecordDetail'] + '?accessToken=' + hsAuth.getAccessToken()).post({
          columns: columns,
          orders: orders,
          page: 1,
          length: 50
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
          info.startDate = info.startDate.getFullYear() + "-" + (info.startDate.getMonth() + 1) + "-" + info.startDate.getDate();
          columns.push(commonMethodSerivce.initColumn('businessEndDate', 'GREATER_THAN', 'date', info.startDate));
        }
        if (info.endDate) {
          info.endDate = info.endDate.getFullYear() + "-" + (info.endDate.getMonth() + 1) + "-" + info.endDate.getDate();
          columns.push(commonMethodSerivce.initColumn('businessEndDate', 'LESS_THAN', 'date', info.endDate));
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
        Restangular.all(hsAPI['getRecordList'] + '?accessToken=' + hsAuth.getAccessToken()).post({
          columns: columns,
          orders: orders,
          page: info.currentPage,
          length: info.pageSize
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
      getUnitData = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getUnitData']).get({
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
      getSourceData = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getSourceData']).get({
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
      getRecordJson = function(recordCode) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getRecordJson']).get({
          accessToken: hsAuth.getAccessToken(),
          recordCode: recordCode
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
          field: 'name',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_NAME',
          minWidth: 350,
          cellTemplate: 'modules/dataBase/template/ui-grid-template/grid-recordList-name.html'
        }, {
          field: 'batchCode',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_BATCH_CODE',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'recordCode',
          headerCellFilter: 'translate',
          displayName: 'MODULES_DATABASE_BUSINESS_TRANSACTION',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'licenseNumber',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_RECORD_CODE',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'businessEndDate',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_BUSINESS_END_DATE',
          minWidth: 50,
          cellTemplate: 'modules/dataBase/template/ui-grid-template/grid-recordList-createDate.html'
        }, {
          field: 'filedDate',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_FILED_DATE',
          minWidth: 50,
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
