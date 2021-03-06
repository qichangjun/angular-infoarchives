(function() {
  'use strict';
  angular.module("myApp").controller("moduleTemplateController", [
    '$scope', '$log', '$state', '$timeout', '$stateParams', '$rootScope', 'mdDialogService', 'uuid', 'moduleTemplateService', 'dataModuleService', '$translate', function($scope, $log, $state, $timeout, $stateParams, $rootScope, mdDialogService, uuid, moduleTemplateService, dataModuleService, $translate) {
      var PAHT_OF_TEMPLATE_MDDIALOG, addContainer, addProcessContainer, changeVersion, deleteItem, getAttributeList, getTemplate, getVersionList, init, jsonToObj, openMenu, previewForm, serfToCreateModule, toggle, vm;
      vm = this;
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/projectManage/projectEdit/moduleTemplate/template/mdDialog/';
      vm.parameter = $stateParams;
      vm.loadingAttrLists = true;
      vm.language = $translate.use();
      vm.containerType = ['record', 'process'];
      vm.itemTypes = ['metadata', 'file', 'repeatBlock'];
      init = function() {
        $scope.models = {
          selected: null,
          templates: [],
          lists: []
        };
        getVersionList();
      };
      getVersionList = function() {
        return dataModuleService.getModuleVersionList(vm.parameter.objectId).then(function(res) {
          vm.versionList = res || [];
          if (vm.versionList.length > 0) {
            vm.parameter.templateId = res[res.length - 1].id;
            $state.go('.', vm.parameter, {
              notify: false
            });
            getAttributeList();
            return getTemplate();
          }
        }, function(res) {});
      };
      changeVersion = function() {
        $state.go('.', vm.parameter, {
          notify: false
        });
        getAttributeList();
        return getTemplate();
      };
      getTemplate = function() {
        return moduleTemplateService.getTemplate(vm.parameter.templateId).then(function(res) {
          if (res && res.showTemplate) {
            return $scope.models.lists = JSON.parse(res.showTemplate);
          } else {
            return $scope.models.lists = [
              {
                type: 'record',
                name: '信息',
                id: uuid.v4(),
                data: []
              }
            ];
          }
        }, function(res) {});
      };
      jsonToObj = function(node, module) {
        var i, j, k, len, len1, ref, results, rows;
        node.children = [];
        for (i = j = 0, len = module.length; j < len; i = ++j) {
          rows = module[i];
          if (rows.parentCode === node.code) {
            node.children.push(rows);
          }
        }
        if (node.children.length > 0) {
          ref = node.children;
          results = [];
          for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
            rows = ref[i];
            results.push(jsonToObj(rows, module));
          }
          return results;
        }
      };
      getAttributeList = function() {
        return moduleTemplateService.getAttributeList(vm.parameter.templateId).then(function(res) {
          var attrs, i, j, k, len, len1, ref, rows, x;
          vm.loadingAttrLists = false;
          for (i = j = 0, len = res.length; j < len; i = ++j) {
            rows = res[i];
            ref = rows.attributes;
            for (x = k = 0, len1 = ref.length; k < len1; x = ++k) {
              attrs = ref[x];
              attrs.containerCode = rows.code;
            }
            if (rows.type === 'record') {
              $scope.models.templates = angular.copy(rows);
            }
          }
          jsonToObj($scope.models.templates, res);
          return $scope.models.templates = [$scope.models.templates];
        }, function(res) {
          vm.loadingAttrLists = false;
        });
      };
      addContainer = function() {
        return $scope.models.lists.push({
          type: 'record',
          name: '信息',
          id: uuid.v4(),
          data: []
        });
      };
      addProcessContainer = function() {
        return $scope.models.lists.push({
          type: 'process',
          name: '业务过程信息',
          id: uuid.v4(),
          data: []
        });
      };
      previewForm = function() {
        return mdDialogService.initCustomDialog('previewTemplateFormCon', PAHT_OF_TEMPLATE_MDDIALOG + 'previewTemplateForm.html?' + window.hsConfig.bust, event, {
          data: $scope.models.lists,
          templateId: vm.parameter.templateId
        }).then(function(res) {
          getTemplate();
        }, function(res) {});
      };
      toggle = function(scope) {
        return scope.toggle();
      };
      openMenu = function($mdMenu, ev) {
        var originatorEv;
        originatorEv = ev;
        return $mdMenu.open(ev);
      };
      serfToCreateModule = function() {
        return $state.go('infoArchives.projectEdit.dataModule', {
          objectId: vm.parameter.objectId,
          create: true
        });
      };
      deleteItem = function(item, model) {
        var children, i, j, k, len, len1, ref, rows, x;
        for (i = j = 0, len = model.length; j < len; i = ++j) {
          rows = model[i];
          if (item.containerCode === rows.code) {
            rows.attributes.push(item);
            return;
          } else if (rows.children) {
            ref = rows.children;
            for (x = k = 0, len1 = ref.length; k < len1; x = ++k) {
              children = ref[x];
              if (children.code === item.containerCode) {
                children.attributes.push(item);
              } else {
                deleteItem(item, children);
              }
            }
          } else {
            return;
          }
        }
      };
      vm.openMenu = openMenu;
      vm.deleteItem = deleteItem;
      vm.serfToCreateModule = serfToCreateModule;
      vm.changeVersion = changeVersion;
      vm.toggle = toggle;
      vm.previewForm = previewForm;
      vm.addProcessContainer = addProcessContainer;
      vm.addContainer = addContainer;
      init();
    }
  ]).controller('previewTemplateFormCon', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'data', 'moduleTemplateService', 'templateId', '$translate', function($scope, $log, $stateParams, $mdDialog, data, moduleTemplateService, templateId, $translate) {
      var cancel, i, init, saveTemplate, vm;
      vm = this;
      vm.language = $translate.use();
      $scope.data = data;
      vm.processLists = [];
      i = 0;
      while (i < 13) {
        vm.processLists.push({
          title: '申请' + i,
          detail: '申请人：葛航勇',
          date: '2015.10.20 14:50:07'
        });
        i++;
      }
      init = function() {
        var j, len, ref, rows;
        ref = vm.processLists;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if ((i + 1) % 5 === 1 && parseInt((i + 1) / 5) % 2 !== 0) {
            rows["class"] = '_last';
          } else if ((i + 1) % 5 === 1 && parseInt((i + 1) / 5) % 2 === 0) {
            rows["class"] = '_first';
          } else if ((((i + 1) % 5) === 0 && parseInt((i + 1) / 5) % 2 !== 0) || (i === vm.processLists.length - 1 && parseInt((i + 1) / 5) % 2 === 0)) {
            rows["class"] = 'last';
          } else if ((((i + 1) % 5) === 0 && parseInt((i + 1) / 5) % 2 === 0) || (i === vm.processLists.length - 1 && parseInt((i + 1) / 5) % 2 !== 0)) {
            rows["class"] = 'first';
          } else if (parseInt((i + 1) / 5) % 2 === 0) {
            rows["class"] = 'middle';
          } else {
            rows["class"] = '_middle';
          }
        }
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      saveTemplate = function() {
        return moduleTemplateService.createTemplate($scope.data, templateId).then(function(res) {
          return $mdDialog.hide();
        }, function(res) {});
      };
      vm.saveTemplate = saveTemplate;
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);
