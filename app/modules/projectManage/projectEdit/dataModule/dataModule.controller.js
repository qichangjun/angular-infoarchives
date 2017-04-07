(function() {
  'use strict';
  angular.module("myApp").controller("dataModuleController", [
    '$scope', '$log', '$stateParams', '$mdDialog', 'projectManageService', '$timeout', 'mdDialogService', 'dataModuleService', 'uuid', 'basicDataService', 'commonMethodSerivce', function($scope, $log, $stateParams, $mdDialog, projectManageService, $timeout, mdDialogService, dataModuleService, uuid, basicDataService, commonMethodSerivce) {
      var PAHT_OF_TEMPLATE_MDDIALOG, PAHT_OF_TEMPLATE_MDDIALOG_DELETE, addContainer, deleteNode, editFile, editProject, getModuleInfo, getProjectInfo, getVersionList, init, jsonToObj, listenEvent, modelPush, module, nameList, searchIdAddFile, searchIdDeleteFile, searchParent, unupdateAbleAlert, updateAbleAlert, updateName, vm;
      vm = this;
      vm.parameter = $stateParams;
      module = null;
      $scope.saveData = [];
      vm.moduleEditAble = true;
      nameList = [];
      PAHT_OF_TEMPLATE_MDDIALOG_DELETE = 'modules/projectManage/template/mdDialog/';
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/projectManage/projectEdit/dataModule/template/mdDialog/';
      init = function() {
        getProjectInfo();
        return listenEvent();
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
            if (rows.type === 'record') {
              $scope.nodes = angular.copy(rows);
            }
          }
          return jsonToObj($scope.nodes);
        }, function(res) {});
      };
      listenEvent = function() {
        $scope.$on('node:delete', function(e, d) {
          event.stopPropagation();
          return mdDialogService.initCustomDialog('deleteAlertController', PAHT_OF_TEMPLATE_MDDIALOG_DELETE + 'deleteAlert.html?' + window.hsConfig.bust, event, {
            title: '删除节点',
            content: '确定要删除该节点吗?'
          }).then(function() {
            return $timeout(function() {
              return deleteNode($scope.nodes, d.code);
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
            nodeName: d.name,
            brothersName: brothersName
          }).then(function(res) {
            if (res && !commonMethodSerivce.includeInArr(res, brothersName)) {
              return updateName($scope.nodes, d.code, res);
            } else if (res && commonMethodSerivce.includeInArr(res, brothersName)) {
              return mdDialogService.initAlertDialog('节点名不能重复', '', '知道了', e);
            } else {
              return mdDialogService.initAlertDialog('节点名不能为空', '', '知道了', e);
            }
          }, function(res) {});
        });
        $scope.$on('add:node', function(e, d) {
          return $timeout(function() {
            nameList = [];
            searchParent($scope.nodes, d.code);
            return addContainer($scope.nodes, d.code, 'node', nameList.length);
          });
        });
        $scope.$on('add:block', function(e, d) {
          return $timeout(function() {
            nameList = [];
            searchParent($scope.nodes, d.code);
            return addContainer($scope.nodes, d.code, 'block', nameList.length);
          });
        });
        $scope.$on('node:addCustomData', function(e, d) {
          return mdDialogService.initCustomDialog('editCustomDataController', PAHT_OF_TEMPLATE_MDDIALOG + 'editCustomData.html?' + window.hsConfig.bust, e, {
            property: module.attrRules,
            containerId: d.code
          }).then(function(res) {
            module.attrRules = res;
          }, function(res) {
            return console.log('canceled');
          });
        });
        $scope.$on('node:addFile', function(e, d) {
          return mdDialogService.initCustomDialog('addFileNameController', PAHT_OF_TEMPLATE_MDDIALOG + 'addFileName.html?' + window.hsConfig.bust, e).then(function(res) {
            module.attrRules.push({
              parentCode: d.code,
              name: res,
              type: 'file',
              code: uuid.v4()
            });
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
              node.children.splice(i, 1);
              $scope.$broadcast('node:deleteNode', node);
              return;
            } else {
              deleteNode(rows, id);
            }
          }
        }
      };
      updateName = function(node, id, name) {
        var i, j, len, ref, rows;
        if (node.code === id) {
          $timeout(function() {
            node.name = name;
            $scope.$broadcast('update:name', name, id);
          });
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.code === id) {
              $timeout(function() {
                rows.name = name;
                return $scope.$broadcast('update:name', name, id);
              });
              return;
            } else {
              updateName(rows, id, name);
            }
          }
        }
      };
      addContainer = function(node, id, type, name) {
        var i, j, len, ref, rows;
        if (node.code === id) {
          $timeout(function() {
            return node.children.push({
              "name": type + name,
              "code": uuid.v4(),
              "type": type,
              "children": []
            });
          });
          return;
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.code === id) {
              $timeout(function() {
                return rows.children.push({
                  "name": type + name,
                  "code": uuid.v4(),
                  "type": type,
                  "children": []
                });
              });
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
            if (rows.type !== 'file') {
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
        var i, j, len, model, ref, rows;
        model = {};
        $scope.saveData = [];
        modelPush($scope.nodes);
        model.data = angular.copy($scope.saveData);
        i = 0;
        while (i < module.attrRules.length) {
          if (module.attrRules[i].type === 'file') {
            model.data.push(module.attrRules[i]);
            module.attrRules.splice(i, 1);
          } else {
            i++;
          }
        }
        ref = model.data;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.path) {
            rows.parentCode = rows.path[rows.path.length - 2];
          }
        }
        if (!vm.updateAble) {
          return dataModuleService.createModule(model.data, module.attrRules, vm.parameter.objectId).then(function(res) {
            unupdateAbleAlert(model);
            return getVersionList();
          }, function(res) {});
        } else {
          return updateAbleAlert(model.data, module.attrRules, module.template);
        }
      };
      updateAbleAlert = function(data, attrRules, template) {
        return mdDialogService.initCustomDialog('updateAbleAlertController', PAHT_OF_TEMPLATE_MDDIALOG + 'updateModule.html?' + window.hsConfig.bust, event, null).then(function(res) {
          return dataModuleService.updateVersion(data, attrRules, template).then(function(res) {
            return getVersionList();
          }, function(res) {});
        }, function(res) {
          return dataModuleService.editModule(data, attrRules, template).then(function(res) {
            return getVersionList();
          }, function(res) {});
        });
      };
      unupdateAbleAlert = function(model) {
        return mdDialogService.initCustomDialog('newProjectAlertController', PAHT_OF_TEMPLATE_MDDIALOG + 'newModule.html?' + window.hsConfig.bust, event, null).then(function(res) {
          getVersionList();
        });
      };
      vm.getModuleInfo = getModuleInfo;
      vm.editProject = editProject;
      init();
    }
  ]).controller('updateAbleAlertController', [
    '$scope', '$log', '$stateParams', '$mdDialog', function($scope, $log, $stateParams, $mdDialog) {
      var cancel, init, update, vm;
      vm = this;
      init = function() {};
      cancel = function() {
        return $mdDialog.cancel();
      };
      update = function() {
        return $mdDialog.hide(true);
      };
      vm.update = update;
      vm.cancel = cancel;
      init();
    }
  ]).controller('editCustomDataController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'property', 'mdDialogService', 'containerId', 'mdToastService', 'commonMethodSerivce', function($scope, $log, $stateParams, $mdDialog, property, mdDialogService, containerId, mdToastService, commonMethodSerivce) {
      var addCustomData, cancel, deleteCustomdata, init, saveCustomData, vm;
      vm = this;
      init = function() {
        vm.typeLists = ['date', 'int', 'string', 'boolean'];
        vm.entity = property;
        return vm.containerId = containerId;
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      addCustomData = function() {
        return vm.entity.push({
          displayName: '自定义元数据',
          attrType: 'string',
          attrName: 'defualt',
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
            if (item.attrName && item.containerCode === vm.containerId) {
              results.push(item.attrName);
            }
          }
          return results;
        })();
        if (commonMethodSerivce.isArrRepeat(attrName_List)) {
          return $mdDialog.hide(vm.entity);
        } else {
          return mdToastService.showToast('属性名不能重复');
        }
      };
      vm.saveCustomData = saveCustomData;
      vm.deleteCustomdata = deleteCustomdata;
      vm.addCustomData = addCustomData;
      vm.cancel = cancel;
      init();
    }
  ]).controller('editFileDataController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'property', 'mdDialogService', 'fileLists', 'mdToastService', 'commonMethodSerivce', function($scope, $log, $stateParams, $mdDialog, property, mdDialogService, fileLists, mdToastService, commonMethodSerivce) {
      var addCustomData, cancel, deleteCustomdata, deleteFile, init, saveCustomData, vm;
      vm = this;
      init = function() {
        vm.typeLists = ['date', 'int', 'string', 'boolean'];
        vm.entity = property;
        vm.fileLists = fileLists;
        vm.currentFileId = vm.fileLists[0].code;
        return vm.deleteLists = [];
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      addCustomData = function() {
        return vm.entity.push({
          displayName: '自定义元数据',
          attrType: 'string',
          attrLength: 1,
          attrName: 'default',
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
            if (item.attrName && item.containerCode === vm.currentFileId) {
              results.push(item.attrName);
            }
          }
          return results;
        })();
        if (commonMethodSerivce.isArrRepeat(attrName_List)) {
          return $mdDialog.hide({
            deleteList: vm.deleteLists,
            attr: vm.entity
          });
        } else {
          return mdToastService.showToast('属性名不能重复');
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
    '$scope', '$log', '$stateParams', '$mdDialog', 'nodeName', 'commonMethodSerivce', 'brothersName', 'mdToastService', function($scope, $log, $stateParams, $mdDialog, nodeName, commonMethodSerivce, brothersName, mdToastService) {
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
        console.log(vm.nodeName, brothersName);
        if (!commonMethodSerivce.includeInArr(vm.nodeName, brothersName)) {
          return $mdDialog.hide(vm.nodeName);
        } else {
          return mdToastService.showToast('节点名不能重复');
        }
      };
      vm.update = update;
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);
