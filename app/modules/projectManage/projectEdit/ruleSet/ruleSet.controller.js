(function() {
  'use strict';
  angular.module("myApp").controller("ruleSetController", [
    '$scope', '$log', '$state', 'projectManageService', 'mdDialogService', '$timeout', '$mdToast', '$stateParams', 'ruleSetService', function($scope, $log, $state, projectManageService, mdDialogService, $timeout, $mdToast, $stateParams, ruleSetService) {
      var addRule, changeAttr, deleteRule, getProperty, getRule, init, saveRule, serfToCreateModule, showEdit, vm;
      vm = this;
      vm.parameter = $stateParams;
      init = function() {
        getRule();
        getProperty();
      };
      getRule = function() {
        return ruleSetService.getRule(vm.parameter.objectId).then(function(res) {
          vm.ruleProperty = res.fields;
          vm.codingPolicy = res.codingPolicy;
        }, function(res) {});
      };
      getProperty = function() {
        return ruleSetService.getProperty(vm.parameter.objectId).then(function(res) {
          return vm.ruleType = res.resultSet;
        }, function(res) {});
      };
      serfToCreateModule = function() {
        return $state.go('infoArchives.projectEdit.dataModule', {
          objectId: vm.parameter.objectId,
          create: true
        });
      };
      addRule = function(index) {
        if (index >= 0) {
          return vm.ruleProperty.splice(index + 1, 0, {
            fieldType: 1,
            fieldValue: '-'
          });
        } else {
          return vm.ruleProperty.push({
            fieldType: 1,
            fieldValue: '-'
          });
        }
      };
      deleteRule = function(index) {
        return vm.ruleProperty.splice(index, 1);
      };
      saveRule = function() {
        return ruleSetService.saveRule(vm.ruleProperty).then(function(res) {}, function(res) {
          return console.log(vm.ruleProperty);
        });
      };
      showEdit = function(index) {
        var i, j, len, ref, rows;
        ref = vm.ruleProperty;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          rows.showEdit = false;
        }
        return vm.ruleProperty[index].showEdit = true;
      };
      changeAttr = function(index) {
        var i, j, len, ref, results, rows;
        ref = vm.ruleType;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.attributeName === vm.ruleProperty[index].attrName) {
            results.push(vm.ruleProperty[index].attrDisplayName = rows.attributeValue);
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
      vm.changeAttr = changeAttr;
      vm.showEdit = showEdit;
      vm.saveRule = saveRule;
      vm.deleteRule = deleteRule;
      vm.addRule = addRule;
      vm.serfToCreateModule = serfToCreateModule;
      init();
    }
  ]);

}).call(this);
