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
  }).controller("dataErrorController", [
    '$scope', '$log', '$state', '$timeout', '$element', '$stateParams', 'dataErrorService', 'dataBaseService', 'hsUiGridTemplates', 'i18nService', 'hsTpl', function($scope, $log, $state, $timeout, $element, $stateParams, dataErrorService, dataBaseService, hsUiGridTemplates, i18nService, hsTpl) {
      var getBaseData, getDataDown, getDataList, getGridData, init, initGrid, loadDataType, loadSystemSource, loadUnit, reset, search, vm;
      vm = this;
      vm.systemSource;
      vm.unit;
      vm.dataType;
      vm.parameter = $stateParams;
      init = function() {
        initGrid();
        loadSystemSource();
        loadUnit();
        loadDataType();
        getDataList();
      };
      initGrid = function() {
        i18nService.setCurrentLang('zh-cn');
        return $scope.gridOptions = {
          showHeader: false,
          infiniteScrollRowsFromEnd: 30,
          infiniteScrollDown: true,
          rowTemplate: hsTpl.hsRowTemplate,
          rowHeight: 100,
          selectionRowHeaderWidth: 0,
          onRegisterApi: function(gridApi) {
            gridApi.infiniteScroll.on.needLoadMoreData($scope, getDataDown);
            return $scope.gridApi = gridApi;
          }
        };
      };
      getDataDown = function() {
        if (vm.parameter.objectId) {
          return dataErrorService.getGridData(vm.parameter).then(function(res) {
            $scope.gridApi.infiniteScroll.saveScrollPercentage();
            $scope.gridOptions.data = $scope.gridOptions.data.concat(res.data);
            return $scope.gridApi.infiniteScroll.dataLoaded(true, true).then(function() {});
          }, function(res) {});
        }
      };
      getDataList = function() {
        return dataBaseService.getDataList().then(function(res) {
          vm.dataBases = res.data;
          vm.parameter.objectId = res.data[0].objectId;
          $state.go('.', vm.parameter, {
            notify: false
          });
          return getBaseData(res.data[0].objectId);
        }, function(res) {});
      };
      getBaseData = function(id) {
        vm.parameter.objectId = id;
        $state.go('.', vm.parameter, {
          notify: false
        });
        return getGridData();
      };
      getGridData = function() {
        vm.loading = true;
        if (vm.parameter.objectId) {
          return dataErrorService.getGridData(vm.parameter).then(function(res) {
            vm.loading = false;
            $scope.gridOptions.data = res.data;
            $scope.gridOptions.totalItems = 200;
            $scope.gridOptions.columnDefs = hsUiGridTemplates.dataError;
            return $scope.gridOptions.columnVirtualizationThreshold = hsUiGridTemplates.dataError.length;
          }, function(res) {});
        }
      };
      loadSystemSource = function() {
        return dataErrorService.getSystemSource().then(function(res) {
          return vm.systemSourceLists = res.data;
        }, function(res) {});
      };
      loadUnit = function() {
        return dataErrorService.getUnit().then(function(res) {
          return vm.unitList = res.data;
        }, function(res) {});
      };
      loadDataType = function() {
        return dataErrorService.getDataType().then(function(res) {
          return vm.dataTypeList = res.data;
        }, function(res) {});
      };
      search = function() {
        return $state.go('.', vm.parameter, {
          notify: false
        });
      };
      reset = function(info) {
        return info = null;
      };
      vm.getBaseData = getBaseData;
      vm.reset = reset;
      vm.search = search;
      vm.loadDataType = loadDataType;
      vm.loadUnit = loadUnit;
      vm.loadSystemSource = loadSystemSource;
      init();
    }
  ]);

}).call(this);

//# sourceMappingURL=dataError.controller.js.map
