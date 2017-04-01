(function() {
  'use strict';
  angular.module("myApp").controller("basicDataController", [
    '$scope', '$log', '$state', 'projectManageService', 'mdDialogService', '$timeout', '$mdToast', '$stateParams', 'basicDataService', function($scope, $log, $state, projectManageService, mdDialogService, $timeout, $mdToast, $stateParams, basicDataService) {
      var editProject, getProjectInfo, getVersionList, init, loadDataBase, vm;
      vm = this;
      vm.parameter = $stateParams;
      init = function() {
        getProjectInfo();
        loadDataBase();
      };
      getProjectInfo = function() {
        return basicDataService.getProjectInfo(vm.parameter.objectId).then(function(res) {
          vm.entity = res;
          return projectManageService.getDataBaseList().then(function(res) {
            vm.dataBases = res;
            return getVersionList();
          }, function(res) {});
        }, function(res) {});
      };
      loadDataBase = function() {
        return projectManageService.getDataBaseList().then(function(res) {
          var i, j, len, ref, results, rows;
          vm.dataBases = res;
          vm.dataBaseDisplayLists = [];
          ref = vm.dataBases;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if ($.inArray(rows.databaseName, vm.dataBaseDisplayLists) === -1) {
              results.push(vm.dataBaseDisplayLists.push(rows.databaseName));
            } else {
              results.push(void 0);
            }
          }
          return results;
        }, function(res) {});
      };
      getVersionList = function() {
        var i, j, len, ref, results, rows;
        vm.versionList = [];
        ref = vm.dataBases;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.databaseName === vm.entity.databaseName) {
            results.push(vm.versionList.push(rows.databaseVersion));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
      editProject = function() {
        return basicDataService.editProject(vm.entity).then(function(res) {}, function(res) {});
      };
      vm.editProject = editProject;
      vm.getVersionList = getVersionList;
      vm.loadDataBase = loadDataBase;
      init();
    }
  ]);

}).call(this);
