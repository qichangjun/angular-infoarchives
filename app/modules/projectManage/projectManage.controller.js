(function() {
  'use strict';
  angular.module("myApp").controller("projectManageController", [
    '$scope', '$log', '$state', 'projectManageService', 'mdDialogService', '$timeout', '$mdToast', function($scope, $log, $state, projectManageService, mdDialogService, $timeout, $mdToast) {
      var deleteProject, editModule, getProjectList, init, newProject, newProjectAlert, serfToEdit, vm;
      vm = this;
      init = function() {
        getProjectList();
      };
      getProjectList = function() {
        return projectManageService.getProjectList().then(function(res) {
          return vm.projectLists = res;
        }, function(res) {});
      };
      newProject = function(event) {
        return mdDialogService.initCustomDialog('newProjectController', 'modules/projectManage/template/mdDialog/newProjectManage.html?' + window.hsConfig.bust, event, null).then(function(res) {
          newProjectAlert();
          return getProjectList();
        }, function(res) {});
      };
      newProjectAlert = function() {
        return mdDialogService.initCustomDialog('newProjectAlertController', 'modules/projectManage/template/mdDialog/newProjectAlert.html?' + window.hsConfig.bust, event, null).then(function(res) {}, function(res) {});
      };
      editModule = function(event, item) {
        return mdDialogService.initCustomDialog('customeModuleController', 'webComponents/common/hsTemplates/doc/projectManage/customeModule.html?' + window.hsConfig.bust, event, {
          module: null
        }).then(function(res) {
          if (!item.module) {
            item.module = [];
          }
          item.module.push(res);
        }, function(res) {});
      };
      deleteProject = function(event, item) {
        event.stopPropagation();
        return mdDialogService.initConfirmDialog(event, '删除项目', '确定要删除该项目吗?').then(function() {
          vm.loading = true;
          return projectManageService.deleteProject(item.objectId).then(function(res) {
            vm.loading = false;
            return getProjectList();
          }, function(res) {});
        });
      };
      serfToEdit = function(item) {
        return $state.go('infoArchives.projectEdit.basicData', {
          objectId: item.objectId
        });
      };
      vm.serfToEdit = serfToEdit;
      vm.deleteProject = deleteProject;
      vm.editModule = editModule;
      vm.newProject = newProject;
      init();
    }
  ]).controller('newProjectController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'projectManageService', function($scope, $log, $stateParams, $mdDialog, projectManageService) {
      var addRule, addString, cancel, deleteRule, getVersionList, init, loadDataBase, newProject, vm;
      vm = this;
      vm.entity = {};
      init = function() {
        var myDate;
        myDate = new Date();
        vm.entity.businessCode = 'IA' + myDate.getFullYear().toString() + (myDate.getMonth() + 1).toString() + myDate.getDate().toString() + Date.parse(new Date()).toString();
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      newProject = function() {
        vm.loading = true;
        return projectManageService.newProject(vm.entity).then(function(res) {
          vm.loading = false;
          return $mdDialog.hide(true);
        }, function(res) {
          vm.loading = false;
        });
      };
      loadDataBase = function() {
        return projectManageService.getDataBaseList().then(function(res) {
          return vm.dataBases = res;
        }, function(res) {});
      };
      getVersionList = function(dataBaseName) {
        var i, j, len, ref, results, rows;
        vm.versionList = [];
        ref = vm.dataBases;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.databaseName === dataBaseName) {
            results.push(vm.versionList.push(rows.databaseVersion));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
      addRule = function(index) {
        if (index >= 0) {
          return vm.entity.rules.splice(index + 1, 0, {
            type: 'rule',
            value: 'none'
          });
        } else {
          return vm.entity.rules.push({
            type: 'rule',
            value: 'none'
          });
        }
      };
      addString = function(index) {
        if (index >= 0) {
          return vm.entity.rules.splice(index + 1, 0, {
            type: 'string',
            value: '-'
          });
        } else {
          return vm.entity.rules.push({
            type: 'string',
            value: '-'
          });
        }
      };
      deleteRule = function(index) {
        return vm.entity.rules.splice(index, 1);
      };
      vm.deleteRule = deleteRule;
      vm.addString = addString;
      vm.addRule = addRule;
      vm.getVersionList = getVersionList;
      vm.loadDataBase = loadDataBase;
      vm.newProject = newProject;
      vm.cancel = cancel;
      init();
    }
  ]).controller('newProjectAlertController', [
    '$scope', '$log', '$stateParams', '$mdDialog', function($scope, $log, $stateParams, $mdDialog) {
      var cancel, init, vm;
      vm = this;
      init = function() {};
      cancel = function() {
        return $mdDialog.cancel();
      };
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);