(function() {
  'use strict';
  angular.module("myApp").filter("toDate", function() {
    return function(input) {
      if (input) {
        return new Date(input);
      } else {
        return null;
      }
    };
  }).controller("batchController", [
    '$scope', '$log', '$state', '$timeout', '$stateParams', 'batchService', 'dataBaseService', 'i18nService', 'hsTpl', '$mdSidenav', '$interval', 'mdDialogService', 'projectManageService', 'basicDataService', function($scope, $log, $state, $timeout, $stateParams, batchService, dataBaseService, i18nService, hsTpl, $mdSidenav, $interval, mdDialogService, projectManageService, basicDataService) {
      var PAHT_OF_TEMPLATE_MDDIALOG, SIDE_BAR_NAME, changeBehavior, checkDetail, checkDetailData, checkErrorList, checkInOperation, closeSideBar, dbClick, deleteBatch, exists, exportList, forceSwitch, getBaseData, getBatchInfo, getDataList, getErrorList, getGridData, getProjectInfo, init, initGrid, initParameter, listenEvent, loadRate, search, vm, watchSelectedItem;
      loadRate = null;
      SIDE_BAR_NAME = 'batch_detail';
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/batch/template/mdDialog/';
      vm = this;
      vm.unit;
      vm.dataType;
      vm.systemSource;
      vm.parameter = $stateParams;
      init = function() {
        initParameter();
        initGrid();
        getDataList();
        listenEvent();
        $timeout(function() {
          return vm.timeoutSetting = true;
        }, 1000);
      };
      initParameter = function() {
        vm.parameter.pageSize = Number(vm.parameter.pageSize) || 50;
        vm.parameter.batchStatus = vm.parameter.batchStatus || 'all';
        vm.parameter.currentPage = Number(vm.parameter.currentPage) || 1;
        vm.parameter.exception_handle_behavior = vm.parameter.exception_handle_behavior || [];
        vm.parameter.sortWay = vm.parameter.sortWay || 'ASC';
        vm.parameter.sortField = vm.parameter.sortField || 'batchCode';
        if (!vm.parameter.start_date) {
          vm.parameter.start_date = "";
        } else {
          vm.parameter.start_date = new Date(vm.parameter.start_date);
        }
        if (!vm.parameter.end_date) {
          return vm.parameter.end_date = "";
        } else {
          return vm.parameter.end_date = new Date(vm.parameter.end_date);
        }
      };
      listenEvent = function() {
        return $scope.$on("$destroy", function() {
          return $interval.cancel(loadRate);
        });
      };
      initGrid = function() {
        i18nService.setCurrentLang('zh-cn');
        return $scope.gridOptions = {
          totalItems: vm.parameter.pageSize * vm.parameter.currentPage,
          selectionRowHeaderWidth: 40,
          paginationPageSize: Number(vm.parameter.pageSize),
          paginationCurrentPage: Number(vm.parameter.currentPage),
          enableRowSelection: true,
          enableSelectAll: true,
          rowTemplate: hsTpl.hsRowTemplate,
          useExternalPagination: true,
          useExternalSorting: true,
          enableHorizontalScrollbar: 0,
          enableVerticalScrollbar: 1,
          rowHeight: 40,
          columnDefs: batchService.batch,
          columnVirtualizationThreshold: batchService.batch.length,
          onRegisterApi: function(gridApi) {
            $scope.cancelSelect = function(row) {
              if (gridApi.selection) {
                if (gridApi.selection.getSelectedRows().length === 1 && gridApi.selection.getSelectedRows()[0] === row) {
                  gridApi.selection.clearSelectedRows();
                } else if (gridApi.selection.getSelectedRows().length === 1 && gridApi.selection.getSelectedRows()[0] !== row) {
                  gridApi.selection.clearSelectedRows();
                  gridApi.selection.selectRow(row);
                  if (vm.sideBarEnable) {
                    checkDetail(row.id);
                  }
                } else if (gridApi.selection.getSelectedRows().length < 1) {
                  gridApi.selection.selectRow(row);
                  if (vm.sideBarEnable) {
                    checkDetail(row.id);
                  }
                } else if (gridApi.selection.getSelectedRows().length > 1) {
                  gridApi.selection.clearSelectedRows();
                  gridApi.selection.selectRow(row);
                  if (vm.sideBarEnable) {
                    checkDetail(row.id);
                  }
                }
                return watchSelectedItem();
              }
            };
            $scope.gridApi = gridApi;
            gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
              if (!(vm.parameter.currentPage === newPage && vm.parameter.pageSize === pageSize)) {
                vm.parameter.currentPage = newPage;
                vm.parameter.pageSize = pageSize;
                $state.go('.', vm.parameter, {
                  notify: false
                });
                return getGridData();
              }
            });
            return gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
              if (sortColumns.length === 0) {
                vm.parameter.sortWay = null;
                vm.parameter.sortField = null;
              } else {
                vm.parameter.sortWay = sortColumns[0].sort.direction.toLocaleUpperCase();
                vm.parameter.sortField = sortColumns[0].name;
              }
              console.log(vm.parameter);
              $state.go('.', vm.parameter, {
                notify: false
              });
              return getGridData();
            });
          }
        };
      };
      getProjectInfo = function() {
        return basicDataService.getProjectInfo(vm.parameter.projectId).then(function(res) {
          return vm.projectInfo = res;
        }, function(res) {});
      };
      getBatchInfo = function() {
        vm.loadingDetail = true;
        return batchService.getDetailInfo(vm.currentId).then(function(res) {
          vm.loadingDetail = false;
          vm.batchInfo = res.batch;
          if (!vm.batchInfo.aipCount) {
            vm.batchInfo.aipCount = 0;
          }
          vm.batchInfo.DATA2AIU = Math.floor((vm.batchInfo.aiuCount / vm.batchInfo.packageCount) * 100);
          vm.batchInfo.AIU2SIP = Math.floor((vm.batchInfo.aiu2sipSuccessCount / vm.batchInfo.packageCount) * 100);
          vm.batchInfo.SIP2AIP = Math.floor((vm.batchInfo.aipCount / vm.batchInfo.packageCount) * 100);
          if (!vm.batchInfo.packageCount) {
            vm.batchInfo.DATA2AIU = 0;
            vm.batchInfo.AIU2SIP = 0;
            vm.batchInfo.SIP2AIP = 0;
          }
        }, function(res) {
          vm.loadingDetail = false;
        });
      };
      getErrorList = function() {
        return batchService.getErrorList(vm.currentId).then(function(res) {
          return vm.errorInfo = res;
        }, function(res) {});
      };
      checkDetail = function(id) {
        vm.sideBarEnable = true;
        vm.currentId = id;
        getProjectInfo();
        getBatchInfo(id);
        getErrorList(id);
        $mdSidenav(SIDE_BAR_NAME).open();
        $interval.cancel(loadRate);
        loadRate = $interval(function() {
          return batchService.getDetailInfo(vm.currentId).then(function(res) {
            vm.batchInfo = res.batch;
            vm.batchInfo.DATA2AIU = Math.floor((vm.batchInfo.aiuCount / vm.batchInfo.packageCount) * 100);
            vm.batchInfo.AIU2SIP = Math.floor((vm.batchInfo.aiu2sipSuccessCount / vm.batchInfo.packageCount) * 100);
            vm.batchInfo.SIP2AIP = Math.floor((vm.batchInfo.aipCount / vm.batchInfo.packageCount) * 100);
            if (!vm.batchInfo.packageCount) {
              vm.batchInfo.DATA2AIU = 0;
              vm.batchInfo.AIU2SIP = 0;
              vm.batchInfo.SIP2AIP = 0;
            }
            if ((vm.batchInfo.AIU2SIP === 100 && vm.batchInfo.SIP2AIP === 100 && vm.batchInfo.SIP2AIP === 100) || !$mdSidenav(SIDE_BAR_NAME).isOpen()) {
              return $interval.cancel(loadRate);
            }
          }, function(res) {});
        }, 5000, 0);
        return $mdSidenav(SIDE_BAR_NAME).onClose(function() {
          vm.sideBarEnable = false;
          return $interval.cancel(loadRate);
        });
      };
      getDataList = function() {
        return projectManageService.getProjectList().then(function(res) {
          vm.dataBases = res;
          if (!vm.parameter.projectId) {
            vm.parameter.projectId = vm.dataBases[0].id;
            $state.go('.', vm.parameter, {
              notify: false
            });
          }
          return getGridData();
        }, function(res) {});
      };
      getBaseData = function(id) {
        $mdSidenav(SIDE_BAR_NAME).close();
        vm.parameter = {};
        initParameter();
        vm.parameter.projectId = id;
        $state.go('.', vm.parameter, {
          notify: false
        });
        return getGridData();
      };
      getGridData = function() {
        vm.loading = true;
        if (vm.parameter.projectId) {
          return batchService.getGridData(vm.parameter).then(function(res) {
            var column, j, len, ref, results;
            vm.loading = false;
            $scope.gridOptions.data = res.content;
            $scope.gridOptions.totalItems = res.totalElements;
            if ($scope.gridOptions.data.length === 0) {
              $scope.gridOptions.enablePaginationControls = false;
            } else {
              $scope.gridOptions.enablePaginationControls = true;
            }
            ref = $scope.gridOptions.columnDefs;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              column = ref[j];
              results.push(column.enableColumnMenu = false);
            }
            return results;
          }, function(res) {});
        }
      };
      search = function() {
        var endDate, startDate;
        if (vm.parameter.batchStatus === '0,1,2,3,4' || vm.parameter.batchStatus === '6') {
          vm.parameter.exception_handle_behavior = [];
        }
        $state.go('.', vm.parameter, {
          notify: false
        });
        if (!vm.parameter.start_date) {
          vm.parameter.start_date = "";
        } else {
          startDate = new Date(vm.parameter.start_date);
          startDate.setHours(0);
          startDate.setMinutes(0);
          startDate.setSeconds(0);
          vm.parameter.start_date = startDate;
        }
        if (!vm.parameter.end_date) {
          vm.parameter.end_date = "";
        } else {
          endDate = new Date(vm.parameter.end_date);
          endDate.setHours(23);
          endDate.setMinutes(59);
          endDate.setSeconds(59);
          vm.parameter.end_date = endDate;
        }
        return getGridData();
      };
      checkDetailData = function(info, event) {
        return mdDialogService.initCustomDialog('checkDetailDataController', 'modules/batch/template/mdDialog/checkDetailData.html?' + window.hsConfig.bust, event, {
          info: info
        }).then(function(res) {}, function(res) {});
      };
      closeSideBar = function() {
        return $mdSidenav(SIDE_BAR_NAME).close();
      };
      checkErrorList = function(id, batchId) {
        return mdDialogService.initCustomDialog('checkErrorListController', PAHT_OF_TEMPLATE_MDDIALOG + 'checkErrorList.html?' + window.hsConfig.bust, event, {
          batchStatus: vm.batchInfo.batchStatus,
          batchCode: vm.batchInfo.batchCode,
          objectId: id,
          batchId: batchId
        }).then(function(res) {
          if (res) {
            getGridData();
          }
        }, function(res) {});
      };
      changeBehavior = function(value) {
        var idx;
        idx = vm.parameter.exception_handle_behavior.indexOf(value);
        if (idx > -1) {
          return vm.parameter.exception_handle_behavior.splice(idx, 1);
        } else {
          return vm.parameter.exception_handle_behavior.push(value);
        }
      };
      exportList = function() {
        return batchService.exportList(vm.parameter).then(function(res) {
          window.location.href = res.downloadUrl;
        }, function(res) {});
      };
      exists = function(value) {
        return vm.parameter.exception_handle_behavior.indexOf(value) > -1;
      };
      forceSwitch = function() {
        var _ids, i, j, len, ref, rows;
        _ids = [];
        ref = $scope.gridApi.selection.getSelectedRows();
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          _ids.push(rows.id);
        }
        return batchService.checkForceSwitch(_ids).then(function(res) {
          return batchService.forceSwitch(_ids).then(function(res) {
            getGridData();
          }, function(res) {});
        }, function(res) {});
      };
      deleteBatch = function() {
        var ids, item;
        ids = (function() {
          var j, len, ref, results;
          ref = $scope.gridApi.selection.getSelectedRows();
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            item = ref[j];
            results.push(item.id);
          }
          return results;
        })();
        return batchService.deleteBatch(ids).then(function(res) {
          return getGridData();
        }, function(res) {});
      };
      watchSelectedItem = function() {
        var i, j, len, ref, results, rows;
        vm.selectIsError = false;
        ref = $scope.gridApi.selection.getSelectedRows();
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.batchStatus === 6) {
            results.push(vm.selectIsError = true);
          } else {
            vm.selectIsError = false;
            break;
          }
        }
        return results;
      };
      $scope.$watch('gridApi.selection.getSelectedRows().length', function(newValue, oldValue, scope) {
        if ($scope.gridApi) {
          watchSelectedItem();
        }
        if (newValue !== 1) {
          return $mdSidenav(SIDE_BAR_NAME).close();
        }
      });
      dbClick = function(info) {
        $scope.gridApi.selection.selectRow(info);
        return checkDetail(info.id);
      };
      checkInOperation = function(info, e) {
        e.stopPropagation();
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridApi.selection.selectRow(info);
        return checkDetail(info.id);
      };
      vm.checkInOperation = checkInOperation;
      vm.dbClick = dbClick;
      vm.deleteBatch = deleteBatch;
      vm.forceSwitch = forceSwitch;
      vm.exists = exists;
      vm.exportList = exportList;
      vm.changeBehavior = changeBehavior;
      vm.checkErrorList = checkErrorList;
      vm.closeSideBar = closeSideBar;
      vm.checkDetailData = checkDetailData;
      vm.checkDetail = checkDetail;
      vm.getBaseData = getBaseData;
      vm.search = search;
      init();
    }
  ]).controller('checkDetailDataController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'info', 'i18nService', 'hsTpl', 'batchService', 'dataBaseService', 'mdDialogService', '$window', '$state', function($scope, $log, $stateParams, $mdDialog, info, i18nService, hsTpl, batchService, dataBaseService, mdDialogService, $window, $state) {
      var PAHT_OF_TEMPLATE_MDDIALOG, cancel, downloadFile, exportList, getGridData, init, initGrid, previewDoc, previewRecord, vm;
      vm = this;
      vm.entity = info;
      vm.parameter = {};
      vm.parameter.batchId = info.batchCode;
      vm.parameter.currentPage = vm.parameter.currentPage || 1;
      vm.parameter.pageSize = vm.parameter.pageSize || 50;
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/dataBase/template/mdDialog/';
      init = function() {
        initGrid();
        return getGridData();
      };
      initGrid = function() {
        i18nService.setCurrentLang('zh-cn');
        return $scope.gridOptions = {
          totalItems: vm.parameter.pageSize * vm.parameter.currentPage,
          selectionRowHeaderWidth: 40,
          paginationPageSize: Number(vm.parameter.pageSize),
          paginationCurrentPage: Number(vm.parameter.currentPage),
          enableRowSelection: true,
          enableSelectAll: true,
          rowTemplate: hsTpl.hsRowTemplate,
          useExternalPagination: true,
          useExternalSorting: true,
          rowHeight: 40,
          columnDefs: dataBaseService.recordList,
          columnVirtualizationThreshold: dataBaseService.recordList.length,
          onRegisterApi: function(gridApi) {
            $scope.cancelSelect = function(row) {
              if (gridApi.selection) {
                if (gridApi.selection.getSelectedRows().length === 1 && gridApi.selection.getSelectedRows()[0] === row) {
                  return gridApi.selection.clearSelectedRows();
                } else if (gridApi.selection.getSelectedRows().length === 1 && gridApi.selection.getSelectedRows()[0] !== row) {
                  gridApi.selection.clearSelectedRows();
                  return gridApi.selection.selectRow(row);
                } else if (gridApi.selection.getSelectedRows().length < 1) {
                  return gridApi.selection.selectRow(row);
                } else if (gridApi.selection.getSelectedRows().length > 1) {
                  gridApi.selection.clearSelectedRows();
                  return gridApi.selection.selectRow(row);
                }
              }
            };
            $scope.gridApi = gridApi;
            gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
              if (!(vm.parameter.currentPage === newPage && vm.parameter.pageSize === pageSize)) {
                vm.parameter.currentPage = newPage;
                vm.parameter.pageSize = pageSize;
                return getGridData();
              }
            });
            return gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
              if (sortColumns.length === 0) {
                vm.parameter.sortWay = null;
                vm.parameter.sortField = null;
              } else {
                vm.parameter.sortWay = sortColumns[0].sort.direction.toLocaleUpperCase();
                vm.parameter.sortField = sortColumns[0].name;
              }
              return getGridData();
            });
          }
        };
      };
      getGridData = function() {
        vm.loading = true;
        return dataBaseService.getGridData(vm.parameter).then(function(res) {
          var column, i, j, k, len, len1, ref, ref1, results, rows;
          vm.loading = false;
          $scope.gridOptions.data = res.content;
          ref = $scope.gridOptions.data;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.licenseNumber === 'null') {
              rows.licenseNumber = null;
            }
          }
          $scope.gridOptions.totalItems = res.totalElements;
          ref1 = $scope.gridOptions.columnDefs;
          results = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            column = ref1[k];
            results.push(column.enableColumnMenu = false);
          }
          return results;
        }, function(res) {
          vm.loading = false;
        });
      };
      cancel = function() {
        return $mdDialog.hide();
      };
      exportList = function() {
        return dataBaseService.exportList(vm.parameter).then(function(res) {
          return window.location.href = res.downloadUrl;
        }, function(res) {});
      };
      previewRecord = function(info) {
        $window.open($state.href('previewRecord', {
          templateId: info.templateId,
          recordId: info.recordCode,
          businessCode: info.businessCode,
          name: info.name
        }));
      };
      previewDoc = function(event) {
        $window.open($state.href('previewRecord', {
          templateId: $scope.gridApi.selection.getSelectedRows()[0].templateId,
          recordId: $scope.gridApi.selection.getSelectedRows()[0].recordCode,
          businessCode: $scope.gridApi.selection.getSelectedRows()[0].businessCode,
          name: $scope.gridApi.selection.getSelectedRows()[0].name
        }));
      };
      downloadFile = function() {
        var _ids, i, j, len, ref, rows;
        _ids = [];
        ref = $scope.gridApi.selection.getSelectedRows();
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          _ids.push(rows.id);
        }
        return dataBaseService.downloadFile(_ids).then(function(res) {
          return window.location.href = res.downloadUrl;
        }, function(res) {});
      };
      vm.previewRecord = previewRecord;
      vm.downloadFile = downloadFile;
      vm.previewDoc = previewDoc;
      vm.exportList = exportList;
      vm.cancel = cancel;
      init();
    }
  ]).controller('checkErrorListController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'i18nService', 'hsTpl', 'batchService', 'objectId', 'batchId', 'batchStatus', 'batchCode', function($scope, $log, $stateParams, $mdDialog, i18nService, hsTpl, batchService, objectId, batchId, batchStatus, batchCode) {
      var cancel, deleteBatch, forceSwitch, getGridData, init, initGrid, vm;
      vm = this;
      vm.refreshGrid = false;
      vm.parameter = {};
      vm.batchId = batchId;
      vm.batchStatus = batchStatus;
      vm.parameter.objectId = objectId;
      vm.parameter.currentPage = vm.parameter.currentPage || 1;
      vm.parameter.pageSize = vm.parameter.pageSize || 50;
      init = function() {
        initGrid();
        getGridData();
      };
      initGrid = function() {
        i18nService.setCurrentLang('zh-cn');
        return $scope.gridOptions = {
          totalItems: vm.parameter.pageSize * vm.parameter.currentPage,
          paginationPageSize: Number(vm.parameter.pageSize),
          paginationCurrentPage: Number(vm.parameter.currentPage),
          rowTemplate: hsTpl.hsRowTemplate,
          useExternalPagination: true,
          useExternalSorting: false,
          rowHeight: 40,
          columnDefs: batchService.batchErrorList,
          columnVirtualizationThreshold: batchService.batchErrorList.length,
          onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            return gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
              if (!(vm.parameter.currentPage === newPage && vm.parameter.pageSize === pageSize)) {
                vm.parameter.currentPage = newPage;
                vm.parameter.pageSize = pageSize;
                return getGridData();
              }
            });
          }
        };
      };
      getGridData = function() {
        vm.loading = true;
        return batchService.getErrorGridData(vm.parameter).then(function(res) {
          var column, i, j, k, len, len1, ref, ref1, results, rows;
          vm.loading = false;
          ref = res.exceptionItemList;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            rows.batchCode = batchCode;
          }
          $scope.gridOptions.data = res.exceptionItemList;
          $scope.gridOptions.totalItems = res.pageInfo.totalCount;
          ref1 = $scope.gridOptions.columnDefs;
          results = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            column = ref1[k];
            results.push(column.enableColumnMenu = false);
          }
          return results;
        }, function(res) {
          vm.loading = false;
        });
      };
      cancel = function() {
        return $mdDialog.hide(vm.refreshGrid);
      };
      forceSwitch = function() {
        return batchService.checkForceSwitch([vm.batchId]).then(function(res) {
          return batchService.forceSwitch([vm.batchId]).then(function(res) {
            getGridData();
            return vm.refreshGrid = true;
          }, function(res) {});
        }, function(res) {});
      };
      deleteBatch = function() {
        return batchService.deleteBatch([vm.batchId]).then(function(res) {
          getGridData();
          return vm.refreshGrid = true;
        }, function(res) {});
      };
      vm.deleteBatch = deleteBatch;
      vm.forceSwitch = forceSwitch;
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);
