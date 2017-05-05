(function() {
  'use strict';
  angular.module("myApp").controller("dataModuleController", [
    '$scope', '$log', '$stateParams', '$mdDialog', 'projectManageService', '$timeout', 'mdDialogService', 'dataModuleService', 'uuid', 'basicDataService', 'commonMethodSerivce', '$translate', function($scope, $log, $stateParams, $mdDialog, projectManageService, $timeout, mdDialogService, dataModuleService, uuid, basicDataService, commonMethodSerivce, $translate) {
      var PAHT_OF_TEMPLATE_MDDIALOG, TYPE_BLOCK, TYPE_FILE, TYPE_NODE, TYPE_RECORD, addContainer, checkHasNode, deleteAttr, deleteNode, editFile, editProject, exportModule, exportSample, getModuleInfo, getProjectInfo, getSysAttr, getVersionList, init, initSysAttr, jsonToObj, listenEvent, modelPush, module, nameList, searchIdAddFile, searchIdDeleteFile, searchParent, unupdateAbleAlert, updateAbleAlert, updateName, updateParentNode, vm;
      vm = this;
      vm.parameter = $stateParams;
      vm.attr = {};
      module = null;
      $scope.saveData = [];
      vm.moduleEditAble = true;
      vm.slider = {
        value: 10,
        options: {
          vertical: true,
          translate: function() {
            return '';
          },
          onChange: function() {
            return $scope.$broadcast('svg:changeSize', vm.slider.value / 10);
          },
          floor: 5,
          ceil: 15
        }
      };
      nameList = [];
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/projectManage/projectEdit/dataModule/template/mdDialog/';
      TYPE_FILE = 'file';
      TYPE_RECORD = 'record';
      TYPE_BLOCK = 'block';
      TYPE_NODE = 'node';
      init = function() {
        listenEvent();
        return getSysAttr();
      };
      getSysAttr = function() {
        dataModuleService.getSysAttr(TYPE_NODE).then(function(res) {
          var i, j, len, ref, results, rows;
          vm.nodeSysAttrLists = res;
          ref = vm.nodeSysAttrLists;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            results.push(rows.isSys = '1');
          }
          return results;
        }, function(res) {});
        dataModuleService.getSysAttr(TYPE_RECORD).then(function(res) {
          var i, j, len, ref, rows;
          vm.recordSysAttrLists = res;
          ref = vm.recordSysAttrLists;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            rows.isSys = '1';
          }
          return getProjectInfo();
        }, function(res) {});
        return dataModuleService.getSysAttr(TYPE_FILE).then(function(res) {
          var i, j, len, ref, results, rows;
          vm.fileSysAttrLists = res;
          ref = vm.fileSysAttrLists;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            results.push(rows.isSys = '1');
          }
          return results;
        }, function(res) {});
      };
      initSysAttr = function(parentCode, attrLists) {
        var i, j, len, nodeAttrs, rows;
        nodeAttrs = angular.copy(attrLists);
        for (i = j = 0, len = nodeAttrs.length; j < len; i = ++j) {
          rows = nodeAttrs[i];
          rows.containerCode = parentCode;
        }
        return nodeAttrs;
      };
      getProjectInfo = function() {
        return basicDataService.getProjectInfo(vm.parameter.objectId).then(function(res) {
          vm.projectName = res.projectName;
          return getVersionList();
        }, function(res) {});
      };
      getVersionList = function() {
        vm.afterLoad = false;
        return dataModuleService.getModuleVersionList(vm.parameter.objectId).then(function(res) {
          vm.afterLoad = true;
          vm.versionList = res;
          if (vm.versionList.length === 0) {
            vm.updateAble = false;
            $scope.nodes = {
              "name": vm.projectName,
              "code": uuid.v4(),
              "type": "record",
              "children": []
            };
            module = {};
            module.attrRules = [];
            module.attrRules = module.attrRules.concat(initSysAttr($scope.nodes.code, vm.recordSysAttrLists));
            if (vm.parameter.create) {
              vm.versionList.push({
                versionNo: 1.0
              });
              return vm.currentVesion = 1.0;
            }
          } else {
            vm.updateAble = true;
            vm.currentVesion = vm.versionList[vm.versionList.length - 1].id;
            return getModuleInfo();
          }
        }, function(res) {
          vm.afterLoad = true;
        });
      };
      getModuleInfo = function() {
        return dataModuleService.getModuleInfo(vm.currentVesion).then(function(res) {
          var i, j, len, ref, rows;
          if (vm.currentVesion !== vm.versionList[vm.versionList.length - 1].id) {
            vm.moduleEditAble = false;
          } else {
            vm.moduleEditAble = true;
          }
          module = res;
          ref = module.containers;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.type === TYPE_RECORD) {
              $scope.nodes = angular.copy(rows);
            }
          }
          return jsonToObj($scope.nodes);
        }, function(res) {});
      };
      listenEvent = function() {
        $scope.$on('node:delete', function(e, d) {
          event.stopPropagation();
          return swal({
            title: $translate.instant('MODULES_PROJECTMANAGE_DELETE_NODE'),
            text: $translate.instant("MODULES_PROJECTMANAGE_SURE_WANT_TO_DELETE_NODE"),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#40B98E",
            confirmButtonText: $translate.instant("MODULES_PROJECTMANAGE_CONFIRM"),
            cancelButtonText: $translate.instant("MODULES_PROJECTMANAGE_CANCEL")
          }, function() {
            return $timeout(function() {
              deleteNode($scope.nodes, d.code);
              vm.hasNode = false;
              checkHasNode($scope.nodes);
              if (!vm.hasNode) {
                return updateParentNode($scope.nodes, d.parent.code);
              }
            });
          });
        });
        $scope.$on('node:updateName', function(e, d) {
          var brothersName, item;
          nameList = [];
          searchParent($scope.nodes, d.parent.code);
          brothersName = (function() {
            var j, len, results;
            results = [];
            for (j = 0, len = nameList.length; j < len; j++) {
              item = nameList[j];
              results.push(item.name);
            }
            return results;
          })();
          return mdDialogService.initCustomDialog('updateNodeNameController', PAHT_OF_TEMPLATE_MDDIALOG + 'updateNodeName.html?' + window.hsConfig.bust, event, {
            nodeName: '',
            brothersName: brothersName
          }).then(function(res) {
            if (res && !commonMethodSerivce.includeInArr(res, brothersName)) {
              return updateName($scope.nodes, d.code, res);
            } else if (res && commonMethodSerivce.includeInArr(res, brothersName)) {
              return mdDialogService.initAlertDialog($translate.instant('MODULES_PROJECTMANAGE_NODE_NAME_CAN_NOT_BE_REPEATED'), '', $translate.instant('MODULES_PROJECTMANAGE_GOT_IT'), e);
            } else {
              return mdDialogService.initAlertDialog($translate.instant('MODULES_PROJECTMANAGE_NODE_NAME_CAN_NOT_BE_EMPTY'), '', $translate.instant('MODULES_PROJECTMANAGE_GOT_IT'), e);
            }
          }, function(res) {});
        });
        $scope.$on('add:node', function(e, d) {
          return $timeout(function() {
            nameList = [];
            searchParent($scope.nodes, d.code);
            return addContainer($scope.nodes, d.code, TYPE_NODE, nameList.length);
          });
        });
        $scope.$on('add:block', function(e, d) {
          return $timeout(function() {
            nameList = [];
            searchParent($scope.nodes, d.code);
            return addContainer($scope.nodes, d.code, TYPE_BLOCK, nameList.length);
          });
        });
        $scope.$on('node:addCustomData', function(e, d) {
          return mdDialogService.initCustomDialog('editCustomDataController', PAHT_OF_TEMPLATE_MDDIALOG + 'editCustomData.html?' + window.hsConfig.bust, e, {
            property: module.attrRules,
            containerId: d.code,
            containerType: d.type
          }).then(function(res) {
            module.attrRules = res;
          }, function(res) {
            return console.log('canceled');
          });
        });
        $scope.$on('node:addFile', function(e, d) {
          return mdDialogService.initCustomDialog('addFileNameController', PAHT_OF_TEMPLATE_MDDIALOG + 'addFileName.html?' + window.hsConfig.bust, e).then(function(res) {
            var code;
            code = uuid.v4();
            module.attrRules.push({
              parentCode: d.code,
              name: res,
              type: TYPE_FILE,
              code: code
            });
            module.attrRules = module.attrRules.concat(initSysAttr(code, vm.fileSysAttrLists));
            searchIdAddFile($scope.nodes, d.code);
            if (angular.isUndefined(d.hasFile)) {
              d.hasFile = 1;
            } else {
              d.hasFile++;
            }
            $scope.$broadcast('node:updateNodes', d);
            return editFile(e, d);
          }, function(res) {
            return console.log('cancel');
          });
        });
        return $scope.$on('node:editFile', function(e, d) {
          return editFile(e, d);
        });
      };
      editFile = function(e, d) {
        var fileLists, item;
        fileLists = (function() {
          var j, len, ref, results;
          ref = module.attrRules;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            item = ref[j];
            if (item.parentCode && item.parentCode === d.code) {
              results.push(item);
            }
          }
          return results;
        })();
        return mdDialogService.initCustomDialog('editFileDataController', PAHT_OF_TEMPLATE_MDDIALOG + 'editFileData.html?' + window.hsConfig.bust, e, {
          fileLists: fileLists,
          property: module.attrRules
        }).then(function(res) {
          var i;
          module.attrRules = res.attr;
          i = 0;
          while (i < module.attrRules.length) {
            if (commonMethodSerivce.includeInArr(module.attrRules[i].code, res.deleteList)) {
              module.attrRules.splice(i, 1);
            } else {
              i++;
            }
          }
          searchIdDeleteFile($scope.nodes, d.code, res.deleteList.length);
          d.hasFile = d.hasFile - res.deleteList.length;
          if (d.hasFile === 0) {
            d.hasFile = void 0;
          }
          return $scope.$broadcast('node:updateNodes', d);
        }, function(res) {
          return console.log('canceled');
        });
      };
      updateParentNode = function(node, code) {
        var i, j, len, ref, results, rows;
        if (node.code === code) {
          node.hasNode = false;
          return;
        }
        if (node.children) {
          ref = node.children;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.code === code) {
              results.push(rows.hasNode = false);
            } else {
              results.push(updateParentNode(rows, code));
            }
          }
          return results;
        }
      };
      searchParent = function(node, parentCode) {
        var i, j, len, ref, results, rows;
        if (node.code === parentCode) {
          return nameList = angular.copy(node.children);
        } else if (node.children) {
          ref = node.children;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.code === parentCode) {
              results.push(nameList = angular.copy(rows.children));
            } else {
              results.push(searchParent(rows, parentCode));
            }
          }
          return results;
        }
      };
      searchIdDeleteFile = function(node, id, length) {
        var i, j, len, ref, rows;
        if (node.code === id) {
          node.hasFile = node.hasFile * 1 - length;
          if (node.hasFile < 0) {
            node.hasFile = void 0;
          }
          return;
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.code === id) {
              rows.hasFile = rows.hasFile * 1 - length;
              if (rows.hasFile < 0) {
                rows.hasFile = void 0;
              }
              return;
            } else {
              searchIdDeleteFile(rows, id, length);
            }
          }
        }
      };
      deleteNode = function(node, id) {
        var i, j, len, ref, rows;
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.code === id) {
              deleteAttr(rows.code);
              node.children.splice(i, 1);
              $scope.$broadcast('node:deleteNode', node);
              return;
            } else {
              deleteNode(rows, id);
            }
          }
        }
      };
      deleteAttr = function(code) {
        var i, results;
        i = 0;
        results = [];
        while (i < module.attrRules.length) {
          if (code === module.attrRules[i].containerCode) {
            results.push(module.attrRules.splice(i, 1));
          } else {
            results.push(i++);
          }
        }
        return results;
      };
      checkHasNode = function(node) {
        var i, j, len, ref, rows;
        if (node.type === 'node') {
          vm.hasNode = true;
          return;
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.type === 'node') {
              vm.hasNode = true;
              return;
            } else {
              checkHasNode(rows);
            }
          }
        }
      };
      updateName = function(node, id, name) {
        var i, j, len, ref, results, rows;
        if (node.code === id) {
          $timeout(function() {
            node.name = name;
            $scope.$broadcast('update:name', name, id);
          });
        }
        if (node.children) {
          ref = node.children;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.code === id) {
              results.push($timeout(function() {
                rows.name = name;
                $scope.$broadcast('update:name', name, id);
              }));
            } else {
              results.push(updateName(rows, id, name));
            }
          }
          return results;
        }
      };
      addContainer = function(node, id, type, name) {
        var code, i, j, len, ref, rows;
        if (node.code === id) {
          code = uuid.v4();
          node.children.push({
            "name": $translate.instant("MODULES_CONTAINER_TYPE_" + type.toUpperCase()) + name,
            "code": code,
            "type": type,
            "children": []
          });
          if (type === TYPE_FILE) {
            module.attrRules = module.attrRules.concat(initSysAttr(code, vm.fileSysAttrLists));
          } else if (type === TYPE_NODE) {
            module.attrRules = module.attrRules.concat(initSysAttr(code, vm.nodeSysAttrLists));
            node.hasNode = true;
            vm.hasNode = true;
          }
          return;
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.code === id) {
              code = uuid.v4();
              rows.children.push({
                "name": $translate.instant("MODULES_CONTAINER_TYPE_" + type.toUpperCase()) + name,
                "code": code,
                "type": type,
                "children": []
              });
              if (type === TYPE_FILE) {
                module.attrRules = module.attrRules.concat(initSysAttr(code, vm.fileSysAttrLists));
              } else if (type === TYPE_NODE) {
                module.attrRules = module.attrRules.concat(initSysAttr(code, vm.nodeSysAttrLists));
                rows.hasNode = true;
                vm.hasNode = true;
              }
              break;
              return;
            } else {
              addContainer(rows, id, type, name);
            }
          }
        }
      };
      searchIdAddFile = function(node, id) {
        var i, j, len, ref, rows;
        if (node.code === id) {
          if (angular.isUndefined(node.hasFile)) {
            node.hasFile = 1;
          } else if (typeof node.hasFile === 'number') {
            node.hasFile = node.hasFile + 1;
          }
          return;
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.code === id) {
              if (angular.isUndefined(rows.hasFile)) {
                rows.hasFile = 1;
              } else if (typeof rows.hasFile === 'number') {
                rows.hasFile = rows.hasFile + 1;
              }
              return;
            } else {
              searchIdAddFile(rows, id);
            }
          }
        }
      };
      modelPush = function(node, parent_path) {
        var i, j, len, node_b, ref, results, rows;
        if (parent_path) {
          node.path = angular.copy(parent_path);
          node.path.push(node.code);
        } else {
          node.path = [node.code];
        }
        node_b = angular.copy(node);
        delete node_b.children;
        $scope.saveData.push(node_b);
        if (node.children.length > 0) {
          ref = node.children;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            rows.orderNo = i + 1;
            rows.path = angular.copy(node.path);
            results.push(modelPush(rows, rows.path));
          }
          return results;
        }
      };
      jsonToObj = function(node) {
        var i, j, k, len, len1, ref, ref1, results, rows;
        node.children = [];
        ref = module.containers;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.parentCode === node.code) {
            if (rows.type !== TYPE_FILE) {
              if (rows.type === TYPE_NODE) {
                node.hasNode = true;
                vm.hasNode = true;
              }
              node.children.push(rows);
            } else {
              if (angular.isUndefined(node.hasFile)) {
                node.hasFile = 1;
              } else if (typeof node.hasFile === 'number') {
                node.hasFile = node.hasFile + 1;
              }
              module.attrRules.push(rows);
            }
          }
        }
        if (node.children.length > 0) {
          ref1 = node.children;
          results = [];
          for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
            rows = ref1[i];
            results.push(jsonToObj(rows));
          }
          return results;
        }
      };
      editProject = function(event) {
        var codeLists, i, j, len, modelData, rows;
        $scope.saveData = [];
        modelPush($scope.nodes);
        modelData = angular.copy($scope.saveData);
        i = 0;
        while (i < module.attrRules.length) {
          if (module.attrRules[i].type === TYPE_FILE && module.attrRules[i].parentCode) {
            modelData.push(module.attrRules[i]);
            module.attrRules.splice(i, 1);
          } else {
            i++;
          }
        }
        codeLists = [];
        for (i = j = 0, len = modelData.length; j < len; i = ++j) {
          rows = modelData[i];
          if (rows.path) {
            rows.parentCode = rows.path[rows.path.length - 2];
          }
          codeLists.push(rows.code);
        }
        i = 0;
        while (i < modelData.length) {
          if (modelData[i].type === TYPE_RECORD || commonMethodSerivce.includeInArr(modelData[i].parentCode, codeLists)) {
            i++;
          } else {
            deleteAttr(modelData[i].code);
            modelData.splice(i, 1);
          }
        }
        while (i < module.attrRules.length) {
          if (commonMethodSerivce.includeInArr(module.attrRules[i].containerCode, codeLists)) {
            i++;
          } else {
            module.attrRules.splice(i, 1);
          }
        }
        if (!vm.updateAble) {
          return dataModuleService.createModule(modelData, module.attrRules, vm.parameter.objectId).then(function(res) {
            unupdateAbleAlert(modelData);
            return getVersionList();
          }, function(res) {});
        } else {
          return updateAbleAlert(modelData, module.attrRules, module.template);
        }
      };
      updateAbleAlert = function(data, attrRules, template) {
        return swal({
          title: $translate.instant("MODULES_PROJECTMANAGE_IS_THERE_AN_UPGRADE"),
          text: $translate.instant("MODULES_PROJECTMANAGE_DATA_TEMPLATES_NEED_TO_BE_UPGRADED"),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#40B98E",
          confirmButtonText: $translate.instant("MODULES_PROJECTMANAGE_UPGRADE"),
          cancelButtonText: $translate.instant("MODULES_PROJECTMANAGE_NOT_UPGRADE")
        }, function(isConfirm) {
          if (isConfirm) {
            return dataModuleService.updateVersion(data, attrRules, template).then(function(res) {
              return getVersionList();
            }, function(res) {});
          } else {
            return dataModuleService.editModule(data, attrRules, template).then(function(res) {
              return getVersionList();
            }, function(res) {});
          }
        });
      };
      unupdateAbleAlert = function(model) {
        return swal({
          title: $translate.instant("MODULES_PROJECTMANAGE_GOOD_JOB"),
          text: $translate.instant("MODULES_PROJECTMANAGE_TEMPLATE_UPGRADE_COMPLETED"),
          type: "success",
          confirmButtonColor: "#40B98E",
          confirmButtonText: $translate.instant("MODULES_PROJECTMANAGE_CONFIRM")
        }, function() {
          getVersionList();
        });
      };
      exportModule = function(e) {
        e.stopPropagation();
        return dataModuleService.exportModuke(vm.currentVesion).then(function(res) {
          return window.location.href = res.downloadUrl;
        }, function(res) {});
      };
      exportSample = function(e) {
        e.stopPropagation();
        return dataModuleService.exportSample(vm.currentVesion).then(function(res) {
          return window.location.href = res.downloadUrl;
        }, function(res) {});
      };
      vm.exportSample = exportSample;
      vm.exportModule = exportModule;
      vm.getModuleInfo = getModuleInfo;
      vm.editProject = editProject;
      init();
    }
  ]).controller('editCustomDataController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'property', 'mdDialogService', 'containerId', 'mdToastService', 'commonMethodSerivce', 'containerType', '$translate', function($scope, $log, $stateParams, $mdDialog, property, mdDialogService, containerId, mdToastService, commonMethodSerivce, containerType, $translate) {
      var MESSAGE_PROPERTY_NOT_NULL, addCustomData, cancel, deleteCustomdata, init, saveCustomData, vm;
      vm = this;
      MESSAGE_PROPERTY_NOT_NULL = $translate.instant('MODULES_PROJECTMANAGE_PROPERTY_NOT_BE_NULL');
      vm.typeLists = [
        {
          value: 'date',
          name: $translate.instant('MODULES_PROJECTMANAGE_DATE')
        }, {
          value: 'string',
          name: $translate.instant('MODULES_PROJECTMANAGE_STRING')
        }, {
          value: 'int',
          name: $translate.instant('MODULES_PROJECTMANAGE_NUMBER')
        }, {
          value: 'boolean',
          name: $translate.instant('MODULES_PROJECTMANAGE_BOOLEAN')
        }
      ];
      init = function() {
        var i, j, len, ref, rows;
        vm.entity = angular.copy(property);
        vm.containerId = containerId;
        vm.containerType = containerType;
        vm.systemAttrs = [];
        ref = vm.entity;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.containerCode === vm.containerId && (rows.isSys === 1 || rows.isSys === '1')) {
            vm.systemAttrs.push(rows);
          }
        }
        return vm.systemAttrs.sort(commonMethodSerivce.sortArrBy("attrName"));
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      addCustomData = function() {
        return vm.entity.push({
          attrNameZh: '',
          attrNameEn: '',
          attrType: 'string',
          attrName: '',
          attrLength: 1,
          isRequired: "1",
          containerCode: vm.containerId,
          isSys: "0"
        });
      };
      deleteCustomdata = function(index) {
        return vm.entity.splice(index, 1);
      };
      saveCustomData = function() {
        var attrName_List, item;
        attrName_List = (function() {
          var j, len, ref, results;
          ref = vm.entity;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            item = ref[j];
            if (item.containerCode === vm.containerId) {
              results.push(item.attrName);
            }
          }
          return results;
        })();
        if (commonMethodSerivce.isArrRepeat(attrName_List) && (attrName_List.indexOf("") === -1)) {
          return $mdDialog.hide(vm.entity);
        } else {
          return mdToastService.showToast(MESSAGE_PROPERTY_NOT_NULL);
        }
      };
      vm.saveCustomData = saveCustomData;
      vm.deleteCustomdata = deleteCustomdata;
      vm.addCustomData = addCustomData;
      vm.cancel = cancel;
      init();
    }
  ]).controller('editFileDataController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'property', 'mdDialogService', 'fileLists', 'mdToastService', 'commonMethodSerivce', '$translate', function($scope, $log, $stateParams, $mdDialog, property, mdDialogService, fileLists, mdToastService, commonMethodSerivce, $translate) {
      var MESSAGE_PROPERTY_NOT_NULL, addCustomData, cancel, deleteCustomdata, deleteFile, init, saveCustomData, vm;
      vm = this;
      MESSAGE_PROPERTY_NOT_NULL = 'property should not be null or repeat';
      vm.typeLists = [
        {
          value: 'date',
          name: $translate.instant('MODULES_PROJECTMANAGE_DATE')
        }, {
          value: 'string',
          name: $translate.instant('MODULES_PROJECTMANAGE_STRING')
        }, {
          value: 'int',
          name: $translate.instant('MODULES_PROJECTMANAGE_NUMBER')
        }, {
          value: 'boolean',
          name: $translate.instant('MODULES_PROJECTMANAGE_BOOLEAN')
        }
      ];
      init = function() {
        var i, j, len, ref, rows;
        vm.entity = angular.copy(property);
        vm.fileLists = fileLists;
        vm.currentFileId = vm.fileLists[0].code;
        vm.deleteLists = [];
        vm.systemAttrs = [];
        ref = vm.entity;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.containerCode === vm.currentFileId && (rows.isSys === 1 || rows.isSys === '1')) {
            vm.systemAttrs.push(rows);
          }
        }
        return vm.systemAttrs.sort(commonMethodSerivce.sortArrBy("attrName"));
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      addCustomData = function() {
        return vm.entity.push({
          attrNameZh: '',
          attrNameEn: '',
          attrType: 'string',
          attrLength: 1,
          attrName: '',
          isRequired: "1",
          containerCode: vm.currentFileId,
          isSys: "0"
        });
      };
      deleteCustomdata = function(index) {
        return vm.entity.splice(index, 1);
      };
      saveCustomData = function() {
        var attrName_List, item;
        attrName_List = (function() {
          var j, len, ref, results;
          ref = vm.entity;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            item = ref[j];
            if (item.containerCode === vm.currentFileId) {
              results.push(item.attrName);
            }
          }
          return results;
        })();
        if (commonMethodSerivce.isArrRepeat(attrName_List) && (attrName_List.indexOf("") === -1)) {
          return $mdDialog.hide({
            deleteList: vm.deleteLists,
            attr: vm.entity
          });
        } else {
          return mdToastService.showToast(MESSAGE_PROPERTY_NOT_NULL);
        }
      };
      deleteFile = function() {
        var i, j, len, ref, rows;
        ref = vm.fileLists;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.code === vm.currentFileId) {
            vm.deleteLists.push(rows.code);
            vm.fileLists.splice(i, 1);
            break;
          }
        }
        i = 0;
        while (i < vm.entity.length) {
          if (vm.entity[i].containerCode === vm.currentFileId) {
            vm.entity.splice(i, 1);
          } else {
            i++;
          }
        }
        if (vm.fileLists.length === 0) {
          return $mdDialog.hide({
            deleteList: vm.deleteLists,
            attr: vm.entity
          });
        } else {
          return vm.currentFileId = vm.fileLists[0].code;
        }
      };
      vm.deleteFile = deleteFile;
      vm.saveCustomData = saveCustomData;
      vm.deleteCustomdata = deleteCustomdata;
      vm.addCustomData = addCustomData;
      vm.cancel = cancel;
      init();
    }
  ]).controller('addFileNameController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'mdDialogService', function($scope, $log, $stateParams, $mdDialog, mdDialogService) {
      var cancel, init, newFileName, vm;
      vm = this;
      init = function() {};
      cancel = function() {
        return $mdDialog.cancel();
      };
      newFileName = function() {
        return $mdDialog.hide(vm.fileName);
      };
      vm.newFileName = newFileName;
      vm.cancel = cancel;
      init();
    }
  ]).controller('updateNodeNameController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'nodeName', 'commonMethodSerivce', 'brothersName', 'mdToastService', '$translate', function($scope, $log, $stateParams, $mdDialog, nodeName, commonMethodSerivce, brothersName, mdToastService, $translate) {
      var cancel, init, update, vm;
      vm = this;
      init = function() {
        var i, j, len, rows;
        for (i = j = 0, len = brothersName.length; j < len; i = ++j) {
          rows = brothersName[i];
          if (rows === nodeName) {
            brothersName.splice(i, 1);
            break;
          }
        }
        return vm.nodeName = nodeName;
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      update = function() {
        if (!commonMethodSerivce.includeInArr(vm.nodeName, brothersName)) {
          return $mdDialog.hide(vm.nodeName);
        } else {
          return mdToastService.showToast($translate.instant('MODULES_PROJECTMANAGE_NODE_NAME_CAN_NOT_BE_REPEATED'));
        }
      };
      vm.update = update;
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);
