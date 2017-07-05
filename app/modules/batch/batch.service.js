(function() {
  'use strict';
  angular.module("myApp").service("batchService", [
    '$log', '$q', '$timeout', '$mdToast', 'hsAuth', 'Restangular', 'hsAPI', 'hsTpl', 'mdToastService', 'MockRestangular', 'commonMethodSerivce', '$state', '$translate', function($log, $q, $timeout, $mdToast, hsAuth, Restangular, hsAPI, hsTpl, mdToastService, MockRestangular, commonMethodSerivce, $state, $translate) {
      var batch, batchErrorList, checkForceSwitch, deleteBatch, exportList, forceSwitch, getDetailInfo, getErrorGridData, getErrorList, getGridData, getPackageList, packageList;
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
          columns.push(commonMethodSerivce.initColumn('projectId', 'EQUAL', 'string', info.projectId));
        }
        if (parameter.start_date) {
          info.start_date = info.start_date.getFullYear() + "-" + (info.start_date.getMonth() + 1) + "-" + info.start_date.getDate();
          columns.push(commonMethodSerivce.initColumn('packageAiuStartDate', 'GREATER_THAN', 'date', info.start_date));
        }
        if (parameter.end_date) {
          info.end_date = info.end_date.getFullYear() + "-" + (info.end_date.getMonth() + 1) + "-" + info.end_date.getDate();
          columns.push(commonMethodSerivce.initColumn('packageAiuStartDate', 'LESS_THAN', 'date', info.end_date));
        }
        if (parameter.exception_handle_behavior && parameter.exception_handle_behavior.length > 0) {
          columns.push(commonMethodSerivce.initColumn('exceptionHandleBehavior', 'IN', 'int', info.exception_handle_behavior.join(',')));
        }
        if (parameter.batchStatus && parameter.batchStatus !== 'all') {
          columns.push(commonMethodSerivce.initColumn('batchStatus', 'IN', 'int', info.batchStatus));
        }
        Restangular.all(hsAPI['getBatchList'] + '?accessToken=' + hsAuth.getAccessToken()).post({
          columns: columns,
          orders: orders,
          page: parameter.currentPage,
          length: parameter.pageSize
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
        console.log(parameter);
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
          columns.push(commonMethodSerivce.initColumn('projectId', 'EQUAL', 'string', info.projectId));
        }
        if (parameter.start_date) {
          columns.push(commonMethodSerivce.initColumn('packageAiuStartDate', 'GREATER_THAN', 'date', info.start_date));
        }
        if (parameter.end_date) {
          columns.push(commonMethodSerivce.initColumn('packageAipEndDate', 'LESS_THAN', 'date', info.end_date));
        }
        if (parameter.exception_handle_behavior && parameter.exception_handle_behavior.length > 0) {
          columns.push(commonMethodSerivce.initColumn('exceptionHandleBehavior', 'IN', 'int', info.exception_handle_behavior.join(',')));
        }
        if (parameter.batchStatus && parameter.batchStatus !== 'all') {
          columns.push(commonMethodSerivce.initColumn('batchStatus', 'IN', 'int', info.batchStatus));
        }
        Restangular.all(hsAPI['exportBatchList'] + '?accessToken=' + hsAuth.getAccessToken()).post({
          columns: columns,
          orders: orders
        }).then(function(res) {
          if (res.code === '1') {
            deferred.resolve(res.data);
            return mdToastService.showToast(res.message);
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
      getErrorList = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getErrorList']).get({
          accessToken: hsAuth.getAccessToken(),
          batchId: id
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
      deleteBatch = function(ids) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['deleteBatch']).get({
          accessToken: hsAuth.getAccessToken(),
          ids: ids
        }).then(function(res) {
          if (res.code === '1') {
            deferred.resolve(res.data);
            return mdToastService.showToast(res.message);
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
      getDetailInfo = function(id) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getBatchDetail']).withHttpConfig({
          ignoreLoadingBar: true
        }).get({
          accessToken: hsAuth.getAccessToken(),
          id: id
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
      getErrorGridData = function(parameter) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getErrorGridData']).get({
          accessToken: hsAuth.getAccessToken(),
          exceptionRecordId: parameter.objectId,
          currentPage: parameter.currentPage,
          pageSize: parameter.pageSize
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
      getPackageList = function(parameter) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getPackageList']).get({
          accessToken: hsAuth.getAccessToken(),
          batchId: parameter.batchId,
          currentPage: parameter.currentPage,
          pageSize: parameter.pageSize
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
      checkForceSwitch = function(ids) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['checkForceSwitch']).get({
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
      forceSwitch = function(ids) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['forceSwitch']).get({
          accessToken: hsAuth.getAccessToken(),
          ids: ids
        }).then(function(res) {
          if (res.code === '1') {
            deferred.resolve(res.data);
            return mdToastService.showToast(res.message);
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
      batch = [
        {
          field: 'batchCode',
          name: 'batchCode',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_BATCH_CODE',
          minWidth: 350,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'aipCount',
          name: 'aipCount',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_DATA_PACKAGE_COUNT',
          minWidth: 150,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          field: 'aipCapacity',
          name: 'aipCapacity',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_PACKAGE_CAPACITY',
          minWidth: 150,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-capacity.html'
        }, {
          name: 'batchStatus',
          headerCellClass: 'background',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_STATE',
          minWidth: 150,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-status.html'
        }, {
          name: 'packageAiuStartDate',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_RECEIVE_TIME',
          minWidth: 260,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-startDate.html'
        }, {
          name: 'packageAipEndDate',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_FILED_DATE',
          minWidth: 260,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-endDate.html'
        }, {
          headerCellClass: 'operation--cell--grid',
          name: 'operation',
          enableSorting: false,
          pinnedRight: true,
          headerCellFilter: 'translate',
          displayName: 'MODULES_SERVICEWATCH_OPERATION',
          width: 150,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-operation.html'
        }
      ];
      batchErrorList = [
        {
          headerCellClass: 'first--cell--margin',
          name: 'batchCode',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_BATCH_CODE',
          minWidth: 200,
          cellTemplate: '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell first--cell--margin" title="{{COL_FIELD CUSTOM_FILTERS}}"> {{COL_FIELD CUSTOM_FILTERS}} </div> </div>'
        }, {
          name: 'id',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_BUSINESS_SYSTEM_ID',
          minWidth: 250,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'recordName',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_RECORD_NAME',
          width: 250,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'exceptionDesc',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_EXCEPTION_DESC',
          minWidth: 450,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'exceptionHandleBehavior',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_EXCEPTION_HANDLE_BEHAVIOR_STATE',
          minWidth: 95,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-dataError-exceptionHandleBehavior.html'
        }
      ];
      packageList = [
        {
          name: 'archivalId',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_ARCHIVAL_ID',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'batchCode',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_BATCH_CODE',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'recordCode',
          headerCellFilter: 'translate',
          displayName: 'MODULES_DATABASE_BUSINESS_TRANSACTION',
          width: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'name',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_NAME',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'licenseNumber',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_RECORD_CODE',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'createDate',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_CREATE_DATE',
          minWidth: 150,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-packageList-createDate.html'
        }, {
          name: 'modifyDate',
          headerCellFilter: 'translate',
          displayName: 'MODULES_BATCH_MODIFY_DATE',
          minWidth: 150,
          cellTemplate: 'modules/batch/template/ui-grid-template/grid-packageList-modifyDate.html'
        }
      ];
      this.forceSwitch = forceSwitch;
      this.checkForceSwitch = checkForceSwitch;
      this.deleteBatch = deleteBatch;
      this.getPackageList = getPackageList;
      this.exportList = exportList;
      this.getErrorList = getErrorList;
      this.getDetailInfo = getDetailInfo;
      this.getErrorGridData = getErrorGridData;
      this.getGridData = getGridData;
      this.batchErrorList = batchErrorList;
      this.packageList = packageList;
      this.batch = batch;
    }
  ]);

}).call(this);
