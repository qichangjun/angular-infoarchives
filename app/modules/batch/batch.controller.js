// Generated by CoffeeScript 1.9.1
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
      var PAHT_OF_TEMPLATE_MDDIALOG, SIDE_BAR_NAME, changeBehavior, checkDetail, checkErrorData, checkErrorList, closeSideBar, getBaseData, getBatchInfo, getDataList, getErrorList, getGridData, getProjectInfo, init, initGrid, search, vm;
      vm = this;
      vm.systemSource;
      vm.unit;
      vm.dataType;
      vm.parameter = $stateParams;
      vm.parameter.pageSize = Number(vm.parameter.pageSize) || 50;
      vm.parameter.currentPage = Number(vm.parameter.currentPage) || 1;
      vm.parameter.batch_status = vm.parameter.batch_status || 'all';
      if (!vm.parameter.start_date) {
        vm.parameter.start_date = "";
      } else {
        vm.parameter.start_date = new Date(vm.parameter.start_date);
      }
      if (!vm.parameter.end_date) {
        vm.parameter.end_date = "";
      } else {
        vm.parameter.end_date = new Date(vm.parameter.end_date);
      }
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/batch/template/mdDialog/';
      SIDE_BAR_NAME = 'batch_detail';
      init = function() {
        initGrid();
        getDataList();
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
          infiniteScrollRowsFromEnd: 30,
          infiniteScrollDown: true,
          rowTemplate: hsTpl.hsRowTemplate,
          useExternalPagination: true,
          useExternalSorting: true,
          rowHeight: 50,
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
        return batchService.getDetailInfo(vm.currentId).then(function(res) {
          vm.batchInfo = res.batch;
          vm.batchInfo.AIU2SIP = Math.floor((vm.batchInfo.aiu2sipSuccessCount / vm.batchInfo.aiuCount) * 100);
          vm.batchInfo.SIP2AIP = Math.floor(100 - (vm.batchInfo.sip2aipFailCount / vm.batchInfo.aiu2sipSuccessCount) * 100);
        }, function(res) {});
      };
      getErrorList = function() {
        return batchService.getErrorList(vm.currentId).then(function(res) {
          return vm.errorInfo = res;
        }, function(res) {});
      };
      checkDetail = function(id) {
        var loadRate;
        vm.currentId = id;
        getProjectInfo();
        getBatchInfo(id);
        getErrorList(id);
        $mdSidenav(SIDE_BAR_NAME).open();
        loadRate = $interval(function() {
          return batchService.getDetailInfo(vm.currentId).then(function(res) {
            vm.batchInfo = res.batch;
            vm.batchInfo.AIU2SIP = Math.floor((vm.batchInfo.aiu2sipSuccessCount / vm.batchInfo.aiuCount) * 100);
            vm.batchInfo.SIP2AIP = Math.floor(100 - (vm.batchInfo.sip2aipFailCount / vm.batchInfo.aiu2sipSuccessCount) * 100);
            if ((vm.batchInfo.AIU2SIP === 100 && vm.batchInfo.SIP2AIP === 100) || !$mdSidenav(SIDE_BAR_NAME).isOpen()) {
              return $interval.cancel(loadRate);
            }
          }, function(res) {});
        }, 5000, 0);
        return $mdSidenav(SIDE_BAR_NAME).onClose(function() {
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
            var column, i, len, ref, results;
            vm.loading = false;
            $scope.gridOptions.data = res.content;
            $scope.gridOptions.totalItems = res.totalElements;
            $scope.gridOptions.columnDefs = batchService.batch;
            $scope.gridOptions.columnVirtualizationThreshold = batchService.batch.length;
            ref = $scope.gridOptions.columnDefs;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              column = ref[i];
              results.push(column.enableColumnMenu = false);
            }
            return results;
          }, function(res) {});
        }
      };
      search = function() {
        if (vm.parameter.batch_status === '0,1,2,3,4' || vm.parameter.batch_status === '6') {
          vm.parameter.exception_handle_behavior = null;
        }
        $state.go('.', vm.parameter, {
          notify: false
        });
        return getGridData();
      };
      checkErrorData = function(info, event) {
        return mdDialogService.initCustomDialog('checkErrorDataController', 'modules/batch/template/mdDialog/checkErrorData.html?' + window.hsConfig.bust, event, {
          info: info
        }).then(function(res) {}, function(res) {});
      };
      closeSideBar = function() {
        return $mdSidenav(SIDE_BAR_NAME).close();
      };
      checkErrorList = function(id) {
        return mdDialogService.initCustomDialog('checkErrorListController', PAHT_OF_TEMPLATE_MDDIALOG + 'checkErrorList.html?' + window.hsConfig.bust, event, {
          objectId: id
        }).then(function(res) {}, function(res) {});
      };
      changeBehavior = function(value) {
        if (vm.parameter.exception_handle_behavior === value) {
          return vm.parameter.exception_handle_behavior = null;
        } else {
          return vm.parameter.exception_handle_behavior = value;
        }
      };
      vm.changeBehavior = changeBehavior;
      vm.checkErrorList = checkErrorList;
      vm.closeSideBar = closeSideBar;
      vm.checkErrorData = checkErrorData;
      vm.checkDetail = checkDetail;
      vm.getBaseData = getBaseData;
      vm.search = search;
      init();
    }
  ]).controller('checkErrorDataController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'info', function($scope, $log, $stateParams, $mdDialog, info) {
      var deleteData, forceChange, init, vm;
      vm = this;
      vm.entity = info;
      init = function() {
        return console.log(vm.entity);
      };
      deleteData = function() {};
      forceChange = function() {};
      vm.forceChange = forceChange;
      vm.deleteData = deleteData;
      init();
    }
  ]).controller('checkErrorListController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'i18nService', 'hsTpl', 'batchService', 'objectId', function($scope, $log, $stateParams, $mdDialog, i18nService, hsTpl, batchService, objectId) {
      var cancel, deleteData, forceSwitch, getGridData, init, initGrid, vm;
      vm = this;
      vm.parameter = {};
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
          selectionRowHeaderWidth: 40,
          paginationPageSize: Number(vm.parameter.pageSize),
          paginationCurrentPage: Number(vm.parameter.currentPage),
          enableRowSelection: true,
          enableSelectAll: true,
          infiniteScrollRowsFromEnd: 30,
          infiniteScrollDown: true,
          rowTemplate: hsTpl.hsRowTemplate,
          useExternalPagination: true,
          useExternalSorting: true,
          rowHeight: 40,
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
          var column, i, len, ref, results;
          vm.loading = false;
          $scope.gridOptions.data = res.exceptionItemList;
          $scope.gridOptions.totalItems = res.pageInfo.totalCount;
          $scope.gridOptions.columnDefs = batchService.batchErrorList;
          $scope.gridOptions.columnVirtualizationThreshold = batchService.batchErrorList.length;
          ref = $scope.gridOptions.columnDefs;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            column = ref[i];
            results.push(column.enableColumnMenu = false);
          }
          return results;
        }, function(res) {});
      };
      deleteData = function() {
        console.log($scope.gridApi.selection.getSelectedRows());
      };
      forceSwitch = function() {
        console.log($scope.gridApi.selection.getSelectedRows());
      };
      cancel = function() {
        return $mdDialog.hide();
      };
      vm.cancel = cancel;
      vm.deleteData = deleteData;
      vm.forceSwitch = forceSwitch;
      init();
    }
  ]);

}).call(this);

//# sourceMappingURL=batch.controller.js.map
