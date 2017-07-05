(function() {
  'use strict';
  angular.module("myApp").controller("ruleSetController", [
    '$scope', '$log', '$state', '$timeout', '$stateParams', 'ruleSetService', 'dataModuleService', 'mdToastService', 'basicDataService', '$translate', 'commonMethodSerivce', function($scope, $log, $state, $timeout, $stateParams, ruleSetService, dataModuleService, mdToastService, basicDataService, $translate, commonMethodSerivce) {
      var STRING_ATTR_VALUE_NOTNULL, STRING_ENTER_ATTR_NAME, STRING_ENTER_LENGTH_OF_SERIAL_NUM, addRule, changeAttr, checkRule, deleteRule, getProjectInfo, getProperty, getRetentionPeriodId, getRetentionPeriodList, getRetentionPolicyId, getRetentionPolicyList, getRule, getVersionList, init, saveRetentionPeriod, saveRetentionPeriodAndPolicy, saveRetentionPolicy, saveRule, serfToCreateModule, showAdd, showEdit, vm;
      vm = this;
      vm.parameter = $stateParams;
      vm.entity = {
        fieldType: 0
      };
      vm.ruleProperty = [];
      vm.str = commonMethodSerivce.randomString(150);
      vm.serialNum = commonMethodSerivce.randomNum(150);
      STRING_ENTER_LENGTH_OF_SERIAL_NUM = $translate.instant('MODULES_PROJECTMANAGE_ENTER_SERIAL_CODE_LENGTH');
      STRING_ATTR_VALUE_NOTNULL = $translate.instant('MODULES_PROJECTMANAGE_PROPERTY_VALUE_CANNOT_EMPTY');
      STRING_ENTER_ATTR_NAME = $translate.instant('MODULES_PROJECTMANAGE_PLEASE_SELECT_ATTRIBUTE');
      vm.language = Cookies.get('hs_swap_NG_TRANSLATE_LANG_KEY');
      init = function() {
        getRule();
        getProperty();
        getVersionList();
        getRetentionPeriodList();
        getRetentionPolicyList();
        getProjectInfo();
      };
      getProjectInfo = function() {
        return basicDataService.getProjectInfo(vm.parameter.objectId).then(function(res) {
          vm.projectName = res.projectName;
          vm.result = res;
          if (res.isPeriodFollowDajRule === 1) {
            vm.approveErmsPeriod = true;
          } else {
            vm.approveErmsPeriod = false;
          }
          if (res.isPolicyFollowDajRule === 1) {
            vm.approveErmsPolicy = true;
          } else {
            vm.approveErmsPolicy = false;
          }
          if (res.isCodingFollowDajRule === 1) {
            vm.approveErmsCoding = true;
          } else {
            vm.approveErmsCoding = false;
          }
          if (res.retentionPeriod) {
            vm.retentionPeriod = res.retentionPeriod;
          } else {
            vm.retentionPeriod = null;
          }
          if (res.retentionPolicy) {
            return vm.retentionPolicy = res.retentionPolicy;
          } else {
            return vm.retentionPolicy = null;
          }
        }, function(res) {});
      };
      getRetentionPeriodId = function() {
        return ruleSetService.getRetentionPeriodId(vm.parameter.objectId).then(function(res) {
          if (res && res.id) {
            return vm.retentionPeriod = res.id;
          } else {
            return vm.retentionPeriod = null;
          }
        }, function(res) {});
      };
      getRetentionPolicyId = function() {
        return ruleSetService.getRetentionPolicyId(vm.parameter.objectId).then(function(res) {
          if (res && res.id) {
            return vm.retentionPolicy = res.id;
          } else {
            return vm.retentionPolicy = null;
          }
        }, function(res) {});
      };
      getRetentionPolicyList = function() {
        return ruleSetService.getRetentionPolicyList().then(function(res) {
          vm.retentionPolicyList = res;
          return $timeout(function() {
            return vm.retentionPolicy = vm.retentionPolicy || vm.retentionPolicyList[0].id;
          });
        }, function(res) {});
      };
      getRetentionPeriodList = function() {
        return ruleSetService.getRetentionPeriodList().then(function(res) {
          vm.retentionPeriodList = res;
          return $timeout(function() {
            return vm.retentionPeriod = vm.retentionPeriod || vm.retentionPeriodList[0].id;
          });
        }, function(res) {});
      };
      getVersionList = function() {
        vm.afterLoad = false;
        return dataModuleService.getModuleVersionList(vm.parameter.objectId).then(function(res) {
          vm.afterLoad = true;
          return vm.versionList = res;
        }, function(res) {
          vm.afterLoad = true;
        });
      };
      getRule = function() {
        return ruleSetService.getRule(vm.parameter.objectId).then(function(res) {
          vm.ruleProperty = res.fields;
          vm.codingPolicy = res.codingPolicy;
          if (vm.codingPolicy.id) {
            vm.createRule = false;
          } else {
            vm.createRule = true;
          }
        }, function(res) {});
      };
      getProperty = function() {
        return ruleSetService.getProperty(vm.parameter.objectId).then(function(res) {
          return vm.ruleType = res;
        }, function(res) {});
      };
      serfToCreateModule = function() {
        return $state.go('infoArchives.projectEdit.dataModule', {
          objectId: vm.parameter.objectId,
          create: true
        });
      };
      showAdd = function(e) {
        var i, j, len, ref, rows;
        e.stopPropagation();
        ref = vm.ruleProperty;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          rows.showEdit = false;
        }
        return vm.showLastAdd = true;
      };
      deleteRule = function(index) {
        return vm.ruleProperty.splice(index, 1);
      };
      saveRule = function() {
        saveRetentionPeriodAndPolicy();
        return checkRule();
      };
      saveRetentionPeriodAndPolicy = function() {
        var _approveErmsCoding, _approveErmsPeriod, _approveErmsPolicy;
        if (vm.approveErmsPeriod) {
          _approveErmsPeriod = 1;
        } else {
          _approveErmsPeriod = 0;
        }
        if (vm.approveErmsCoding) {
          _approveErmsCoding = 1;
        } else {
          _approveErmsCoding = 0;
        }
        if (vm.approveErmsPolicy) {
          _approveErmsPolicy = 1;
        } else {
          _approveErmsPolicy = 0;
        }
        vm.result.isCodingFollowDajRule = _approveErmsCoding;
        vm.result.isPeriodFollowDajRule = _approveErmsPeriod;
        vm.result.isPolicyFollowDajRule = _approveErmsPolicy;
        vm.result.retentionPeriod = vm.retentionPeriod;
        vm.result.retentionPolicy = vm.retentionPolicy;
        return ruleSetService.saveRetentionPeriodAndPolicy(vm.result).then(function(res) {
          return getProjectInfo();
        }, function(res) {});
      };
      saveRetentionPeriod = function() {
        return ruleSetService.saveRetentionPeriod(vm.retentionPeriod, vm.parameter.objectId).then(function(res) {
          return getRetentionPeriodId();
        }, function(res) {});
      };
      saveRetentionPolicy = function() {
        return ruleSetService.saveRetentionPolicy(vm.retentionPolicy, vm.parameter.objectId).then(function(res) {
          return getRetentionPolicyId();
        }, function(res) {});
      };
      showEdit = function(e, index) {
        var i, j, len, ref, rows;
        e.stopPropagation();
        ref = vm.ruleProperty;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          rows.showEdit = false;
        }
        vm.showLastAdd = false;
        return vm.ruleProperty[index].showEdit = true;
      };
      changeAttr = function(index) {
        var i, j, len, ref, results, rows;
        ref = vm.ruleType;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (angular.isUndefined(index) && (rows.attrName === vm.entity.attrName)) {
            vm.entity.attrType = rows.attrType;
            if (vm.language === 'cn') {
              vm.entity.attrDisplayName = rows.attrNameZh;
              break;
            } else {
              vm.entity.attrDisplayName = rows.attrNameEn;
              break;
            }
          } else if ((index >= 0) && (rows.attrName === vm.ruleProperty[index].attrName)) {
            vm.ruleProperty[index].attrType = rows.attrType;
            if (vm.language === 'cn') {
              vm.ruleProperty[index].attrDisplayName = rows.attrNameZh;
              break;
            } else {
              vm.ruleProperty[index].attrDisplayName = rows.attrNameEn;
              break;
            }
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
      addRule = function(info) {
        if (info.fieldType >= 0) {
          vm.ruleProperty.push(info);
          vm.entity = {
            fieldType: 0
          };
          return vm.showLastAdd = false;
        }
      };
      checkRule = function() {
        var i, j, len, ref, rows;
        ref = vm.ruleProperty;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.fieldType === 0 && !rows.attrName) {
            mdToastService.showToast(STRING_ENTER_ATTR_NAME);
            rows.isIncorrect = true;
            return;
          } else if (rows.fieldType === 1 && !rows.fieldValue) {
            mdToastService.showToast(STRING_ATTR_VALUE_NOTNULL);
            rows.isIncorrect = true;
            return;
          } else if (rows.fieldType === 2 && !rows.fieldSize) {
            mdToastService.showToast(STRING_ENTER_LENGTH_OF_SERIAL_NUM);
            rows.isIncorrect = true;
            return;
          } else {
            rows.isIncorrect = false;
          }
        }
        if (!vm.createRule) {
          return ruleSetService.saveRule(vm.ruleProperty, vm.codingPolicy, vm.parameter.objectId).then(function(res) {}, function(res) {});
        } else {
          return ruleSetService.createRule(vm.ruleProperty, vm.parameter.objectId).then(function(res) {
            vm.createRule = false;
          }, function(res) {});
        }
      };
      vm.addRule = addRule;
      vm.changeAttr = changeAttr;
      vm.showEdit = showEdit;
      vm.saveRule = saveRule;
      vm.deleteRule = deleteRule;
      vm.showAdd = showAdd;
      vm.serfToCreateModule = serfToCreateModule;
      init();
    }
  ]);

}).call(this);
