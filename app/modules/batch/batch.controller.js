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
    '$scope', '$log', '$state', '$timeout', '$stateParams', 'batchService', 'dataBaseService', 'i18nService', 'hsTpl', '$mdSidenav', '$interval', 'mdDialogService', 'projectManageService', function($scope, $log, $state, $timeout, $stateParams, batchService, dataBaseService, i18nService, hsTpl, $mdSidenav, $interval, mdDialogService, projectManageService) {
      var PAHT_OF_TEMPLATE_MDDIALOG, checkDetail, checkErrorData, checkErrorList, closeSideBar, getBaseData, getDataDown, getDataList, getGridData, init, initGrid, search, vm;
      vm = this;
      vm.systemSource;
      vm.unit;
      vm.dataType;
      vm.parameter = $stateParams;
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/batch/template/mdDialog/';
      init = function() {
        initGrid();
        getDataList();
      };
      initGrid = function() {
        i18nService.setCurrentLang('zh-cn');
        return $scope.gridOptions = {
          selectionRowHeaderWidth: 40,
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
            return $scope.gridApi = gridApi;
          }
        };
      };
      checkDetail = function(id) {
        var loadRate;
        batchService.getDetailInfo(id).then(function(res) {
          return vm.entity = res;
        }, function(res) {});
        $mdSidenav('right').open();
        vm.rate = {};
        vm.rate.AIU = 45;
        vm.rate.AIUSIP = 0;
        vm.rate.SIPAIP = 10;
        loadRate = $interval(function() {
          if (vm.rate.AIU < 100) {
            vm.rate.AIU++;
          }
          if (vm.rate.AIUSIP < 100) {
            vm.rate.AIUSIP = vm.rate.AIUSIP + 5;
          }
          if (vm.rate.SIPAIP < 100) {
            return vm.rate.SIPAIP = vm.rate.SIPAIP + 2;
          }
        }, 100, 100);
        return $mdSidenav('right').onClose(function() {
          return $interval.cancel(loadRate);
        });
      };
      getDataDown = function() {
        if (vm.parameter.objectId) {
          return batchService.getGridData(vm.parameter).then(function(res) {
            $scope.gridApi.infiniteScroll.saveScrollPercentage();
            $scope.gridOptions.data = $scope.gridOptions.data.concat(res.data);
            return $scope.gridApi.infiniteScroll.dataLoaded(true, true).then(function() {});
          }, function(res) {});
        }
      };
      getDataList = function() {
        return projectManageService.getProjectList().then(function(res) {
          vm.dataBases = res;
          vm.parameter.projectId = vm.dataBases[0].id;
          $state.go('.', vm.parameter, {
            notify: false
          });
          return getBaseData(vm.dataBases[0].id);
        }, function(res) {});
      };
      getBaseData = function(id) {
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
            $scope.gridOptions.data = res;
            $scope.gridOptions.totalItems = 200;
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
        return $state.go('.', vm.parameter, {
          notify: false
        });
      };
      checkErrorData = function(info, event) {
        return mdDialogService.initCustomDialog('checkErrorDataController', 'modules/batch/template/mdDialog/checkErrorData.html?' + window.hsConfig.bust, event, {
          info: info
        }).then(function(res) {}, function(res) {});
      };
      closeSideBar = function() {
        return $mdSidenav('right').close();
      };
      checkErrorList = function() {
        return mdDialogService.initCustomDialog('checkErrorListController', PAHT_OF_TEMPLATE_MDDIALOG + 'checkErrorList.html?' + window.hsConfig.bust, event, null).then(function(res) {}, function(res) {});
      };
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
    '$scope', '$log', '$stateParams', '$mdDialog', 'i18nService', 'hsTpl', 'batchService', function($scope, $log, $stateParams, $mdDialog, i18nService, hsTpl, batchService) {
      var deleteData, forceSwitch, getGridData, init, initGrid, vm;
      vm = this;
      init = function() {
        initGrid();
        getGridData();
      };
      initGrid = function() {
        i18nService.setCurrentLang('zh-cn');
        return $scope.gridOptions = {
          selectionRowHeaderWidth: 40,
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
            return $scope.gridApi = gridApi;
          }
        };
      };
      getGridData = function() {
        vm.loading = true;
        return batchService.getErrorGridData(1234).then(function(res) {
          var column, i, len, ref, results;
          vm.loading = false;
          $scope.gridOptions.data = res.data;
          $scope.gridOptions.totalItems = 200;
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
      vm.deleteData = deleteData;
      vm.forceSwitch = forceSwitch;
      init();
    }
  ]);

}).call(this);
