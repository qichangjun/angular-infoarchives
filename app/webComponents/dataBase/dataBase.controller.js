(function() {
  'use strict';
  angular.module("myApp").controller("dataBaseController", [
    '$scope', '$log', 'dataBaseService', '$stateParams', '$state', 'initGrid', 'hsUiGridTemplates', '$timeout', 'dataErrorService', function($scope, $log, dataBaseService, $stateParams, $state, initGrid, hsUiGridTemplates, $timeout, dataErrorService) {
      var getBaseData, getDataList, getGridData, init, listenEvent, loadDataType, loadSystemSource, loadUnit, search, vm;
      vm = this;
      vm.parameter = $stateParams;
      $scope.totalItems = 64;
      $scope.currentPage = 4;
      init = function() {
        initGrid.getScope($scope);
        initGrid.getGrid();
        getDataList();
        getGridData();
        listenEvent();
        loadSystemSource();
        loadUnit();
        loadDataType();
        vm.showMenu = true;
      };
      listenEvent = function() {
        return $scope.$on('getList:changePageAndSort', function(ev, parameter) {
          vm.parameter.currentPage = parameter.currentPage;
          $state.go('.', vm.parameter, {
            notify: false
          });
          return getGridData();
        });
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
          return dataBaseService.getGridData(vm.parameter).then(function(res) {
            var column, i, len, ref, results;
            vm.loading = false;
            $scope.gridOptions.data = res.data;
            $scope.gridOptions.totalItems = 200;
            $scope.gridOptions.columnDefs = hsUiGridTemplates.dataBase;
            $scope.gridOptions.columnVirtualizationThreshold = hsUiGridTemplates.dataBase.length;
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
        return $timeout(function() {
          $state.go('.', vm.parameter, {
            notify: false
          });
          return getGridData();
        }, 500);
      };
      vm.search = search;
      vm.loadDataType = loadDataType;
      vm.loadUnit = loadUnit;
      vm.loadSystemSource = loadSystemSource;
      vm.getBaseData = getBaseData;
      init();
    }
  ]);

}).call(this);
