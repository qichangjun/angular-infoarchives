(function() {
  'use strict';
  angular.module("myApp").controller("dataBaseController", [
    '$scope', '$log', 'dataBaseService', '$stateParams', '$state', 'initGrid', '$timeout', 'batchService', '$mdSidenav', 'mdDialogService', function($scope, $log, dataBaseService, $stateParams, $state, initGrid, $timeout, batchService, $mdSidenav, mdDialogService) {
      var PAHT_OF_TEMPLATE_MDDIALOG, changeChartType, checkData, closeSideBar, getData, getTreeData, init, listenEvent, vm;
      vm = this;
      vm.parameter = $stateParams;
      if (!vm.parameter.chartType) {
        vm.parameter.chartType = 'unit';
      }
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/dataBase/template/mdDialog/';
      init = function() {
        $scope.gridOptions = {};
        initGrid.getScope($scope);
        initGrid.getGrid();
        getTreeData();
        listenEvent();
      };
      getTreeData = function() {
        if (vm.parameter.chartType === 'unit') {
          return $scope.data = dataBaseService.getTreeData();
        } else if (vm.parameter.chartType === 'source') {
          return $scope.data = dataBaseService.getTreeData();
        }
      };
      listenEvent = function() {
        return $scope.$on('treeChart:selectNode', function(ev, d) {
          return $timeout(function() {
            console.log(d);
            vm.entity = d;
            return $mdSidenav('tree-data-node-detail').open();
          });
        });
      };
      changeChartType = function(chartType) {
        $state.go('.', vm.parameter, {
          notify: false
        });
        return getTreeData();
      };
      checkData = function(event) {
        return mdDialogService.initCustomDialog('checkDataController', PAHT_OF_TEMPLATE_MDDIALOG + 'checkData.html?' + window.hsConfig.bust, event, null).then(function(res) {}, function(res) {});
      };
      getData = function() {
        return $scope.data = dataBaseService.getTreeData(vm.unitNums, vm.shixiangNums);
      };
      closeSideBar = function() {
        return $mdSidenav('tree-data-node-detail').close();
      };
      vm.closeSideBar = closeSideBar;
      vm.getData = getData;
      vm.checkData = checkData;
      vm.changeChartType = changeChartType;
      init();
    }
  ]).controller('checkDataController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'dataBaseService', 'i18nService', 'hsTpl', 'mdDialogService', function($scope, $log, $stateParams, $mdDialog, dataBaseService, i18nService, hsTpl, mdDialogService) {
      var PAHT_OF_TEMPLATE_MDDIALOG, cancel, getGridData, init, initGrid, previewDoc, vm;
      vm = this;
      vm.parameter = {};
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/dataBase/template/mdDialog/';
      init = function() {
        getGridData();
        return initGrid();
      };
      initGrid = function() {
        i18nService.setCurrentLang('zh-cn');
        return $scope.gridOptions = {
          selectionRowHeaderWidth: 40,
          enableRowSelection: true,
          enableSelectAll: true,
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
        return dataBaseService.getGridData().then(function(res) {
          var column, i, len, ref, results;
          vm.loading = false;
          $scope.gridOptions.data = res.data;
          $scope.gridOptions.totalItems = 200;
          $scope.gridOptions.columnDefs = dataBaseService.dataBase;
          $scope.gridOptions.columnVirtualizationThreshold = dataBaseService.dataBase.length;
          ref = $scope.gridOptions.columnDefs;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            column = ref[i];
            results.push(column.enableColumnMenu = false);
          }
          return results;
        }, function(res) {});
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      previewDoc = function(event) {
        return mdDialogService.initCustomDialog('previewDocController', PAHT_OF_TEMPLATE_MDDIALOG + 'previewDoc.html?' + window.hsConfig.bust, event, {
          objectId: $scope.gridApi.selection.getSelectedRows()[0].objectId
        }).then(function(res) {}, function(res) {});
      };
      vm.previewDoc = previewDoc;
      vm.cancel = cancel;
      init();
    }
  ]).controller('previewDocController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'dataBaseService', 'objectId', function($scope, $log, $stateParams, $mdDialog, dataBaseService, objectId) {
      var cancel, init, vm;
      vm = this;
      vm.objectId = objectId;
      init = function() {};
      cancel = function() {
        return $mdDialog.cancel();
      };
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);
