(function() {
  'use strict';
  angular.module("myApp").controller("projectManageController", [
    '$scope', '$log', '$state', 'projectManageService', 'mdDialogService', '$timeout', '$mdToast', function($scope, $log, $state, projectManageService, mdDialogService, $timeout, $mdToast) {
      var PAHT_OF_TEMPLATE_MDDIALOG, deleteProject, getProjectList, init, newProject, newProjectAlert, serfToEdit, vm;
      vm = this;
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/projectManage/template/mdDialog/';
      init = function() {
        getProjectList();
      };
      getProjectList = function() {
        return projectManageService.getProjectList().then(function(res) {
          return vm.projectLists = res;
        }, function(res) {});
      };
      newProject = function(event) {
        return mdDialogService.initCustomDialog('newProjectController', PAHT_OF_TEMPLATE_MDDIALOG + 'newProjectManage.html?' + window.hsConfig.bust, event, null).then(function(res) {
          if (res) {
            vm.projectLists.push(res);
          }
          return newProjectAlert();
        }, function(res) {});
      };
      newProjectAlert = function() {
        return mdDialogService.initCustomDialog('newProjectAlertController', PAHT_OF_TEMPLATE_MDDIALOG + 'newProjectAlert.html?' + window.hsConfig.bust, event, null).then(function(res) {}, function(res) {});
      };
      deleteProject = function(event, item, index) {
        event.stopPropagation();
        return mdDialogService.initCustomDialog('deleteAlertController', PAHT_OF_TEMPLATE_MDDIALOG + 'deleteAlert.html?' + window.hsConfig.bust, event, {
          title: '删除项目',
          content: '确定要删除该项目吗?'
        }).then(function() {
          vm.loading = true;
          return projectManageService.deleteProject(item.id).then(function(res) {
            vm.loading = false;
            return vm.projectLists.splice(index, 1);
          }, function(res) {});
        });
      };
      serfToEdit = function(item) {
        return $state.go('infoArchives.projectEdit.basicData', {
          objectId: item.id
        });
      };
      vm.serfToEdit = serfToEdit;
      vm.deleteProject = deleteProject;
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
          return $mdDialog.hide(res);
        }, function(res) {
          vm.loading = false;
        });
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
  ]).controller('deleteAlertController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'title', 'content', function($scope, $log, $stateParams, $mdDialog, title, content) {
      var cancel, confirm, init, vm;
      vm = this;
      init = function() {
        vm.title = title;
        return vm.content = content;
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      confirm = function() {
        return $mdDialog.hide(true);
      };
      vm.confirm = confirm;
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);
