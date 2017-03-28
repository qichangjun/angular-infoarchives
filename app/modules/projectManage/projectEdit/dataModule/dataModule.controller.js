// Generated by CoffeeScript 1.9.1
(function() {
  'use strict';
  angular.module("myApp").controller("dataModuleController", [
    '$scope', '$log', '$stateParams', '$mdDialog', 'projectManageService', '$timeout', 'mdDialogService', 'dataModuleService', function($scope, $log, $stateParams, $mdDialog, projectManageService, $timeout, mdDialogService, dataModuleService) {
      var addContainer, deleteNode, editFile, editProject, findMaxId, getModuleInfo, getVersionList, init, initId, jsonToObj, listenEvent, modelPush, module, searchIdAddFile, unupdateAbleAlert, updateAbleAlert, updateName, vm;
      vm = this;
      vm.parameter = $stateParams;
      module = null;
      $scope.saveData = [];
      initId = void 0;
      $scope.module = module;
      init = function() {
        listenEvent();
        return getVersionList();
      };
      getVersionList = function() {
        vm.afterLoad = false;
        return dataModuleService.getModuleVersionList(vm.parameter.objectId).then(function(res) {
          vm.afterLoad = true;
          vm.versionList = res.template;
          if (vm.versionList.length === 0) {
            vm.updateAble = false;
            initId = 1;
            $scope.nodes = {
              "name": "record",
              "objectId": initId,
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
            vm.currentVesion = vm.versionList[vm.versionList.length - 1].versionNo;
            vm.parameter.moduleId = vm.versionList[vm.versionList.length - 1].objectId;
            return getModuleInfo();
          }
        }, function(res) {
          vm.afterLoad = true;
        });
      };
      getModuleInfo = function() {
        return dataModuleService.getModuleInfo(vm.parameter.moduleId).then(function(res) {
          module = res;
          $scope.nodes = angular.copy(module.containers[0]);
          jsonToObj($scope.nodes);
          return initId = findMaxId($scope.nodes);
        }, function(res) {});
      };
      listenEvent = function() {
        $scope.$on('node:delete', function(e, d) {
          return mdDialogService.initConfirmDialog(e, '删除节点', '确定要删除该节点吗?').then(function() {
            return $timeout(function() {
              return deleteNode($scope.nodes, d.objectId);
            });
          }, function() {});
        });
        $scope.$on('node:updateName', function(e, d) {
          return mdDialogService.initPromptDialog(event, '节点名', d.name).then(function(res) {
            if (res) {
              return updateName($scope.nodes, d.objectId, res);
            } else {
              return mdDialogService.initAlertDialog('节点名不能为空', '', '知道了', e);
            }
          }, function(res) {});
        });
        $scope.$on('add:node', function(e, d) {
          return $timeout(function() {
            return addContainer($scope.nodes, d.objectId, 'node');
          });
        });
        $scope.$on('add:block', function(e, d) {
          return $timeout(function() {
            return addContainer($scope.nodes, d.objectId, 'block');
          });
        });
        $scope.$on('node:addCustomData', function(e, d) {
          return mdDialogService.initCustomDialog('editCustomDataController', 'modules/projectManage/projectEdit/dataModule/template/mdDialog/editCustomData.html?' + window.hsConfig.bust, e, {
            property: module.attrRules,
            containerId: d.objectId
          }).then(function(res) {
            module.attrRules = res;
          }, function(res) {
            return console.log('canceled');
          });
        });
        $scope.$on('node:addFile', function(e, d) {
          return mdDialogService.initCustomDialog('addFileNameController', 'modules/projectManage/projectEdit/dataModule/template/mdDialog/addFileName.html?' + window.hsConfig.bust, e).then(function(res) {
            var hasFile;
            initId = initId + 1;
            module.attrRules.push({
              pid: d.objectId,
              name: res,
              type: 'file',
              objectId: initId
            });
            hasFile = searchIdAddFile($scope.nodes, d.objectId);
            $scope.$broadcast('update:fileNum', d, hasFile);
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
        var fileLists, i, j, len, ref, rows;
        fileLists = [];
        ref = module.attrRules;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.pid === d.objectId) {
            fileLists.push(rows);
          }
        }
        return mdDialogService.initCustomDialog('editFileDataController', 'modules/projectManage/projectEdit/dataModule/template/mdDialog/editFileData.html?' + window.hsConfig.bust, e, {
          fileLists: fileLists,
          property: module.attrRules
        }).then(function(res) {
          return module.attrRules = res;
        }, function(res) {
          return console.log('canceled');
        });
      };
      findMaxId = function(node) {
        var forFindId, id;
        id = 1;
        forFindId = function(node) {
          var i, j, len, ref, results, rows;
          if (node.objectId > id) {
            id = node.objectId;
          }
          if (node.children) {
            ref = node.children;
            results = [];
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
              rows = ref[i];
              if (rows.objectId > id) {
                id = rows.objectId;
              }
              results.push(forFindId(rows));
            }
            return results;
          }
        };
        forFindId(node);
        return id;
      };
      deleteNode = function(node, id) {
        var i, j, len, ref, rows;
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.objectId === id) {
              node.children.splice(i, 1);
              return;
            } else {
              deleteNode(rows, id);
            }
          }
        }
      };
      updateName = function(node, id, name) {
        var i, j, len, ref, rows;
        if (node.objectId === id) {
          $timeout(function() {
            node.name = name;
            $scope.$broadcast('update:name', name, id);
          });
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.objectId === id) {
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
      addContainer = function(node, id, type) {
        var i, j, len, ref, rows;
        if (node.objectId === id) {
          $timeout(function() {
            initId = initId * 1 + 1;
            return node.children.push({
              "name": type,
              "objectId": initId,
              "type": type,
              "children": [],
              "isNew": true
            });
          });
          return;
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.objectId === id) {
              $timeout(function() {
                initId = initId * 1 + 1;
                return rows.children.push({
                  "name": type,
                  "objectId": initId,
                  "type": type,
                  "children": [],
                  "isNew": true
                });
              });
              break;
              return;
            } else {
              addContainer(rows, id, type);
            }
          }
        }
      };
      searchIdAddFile = function(node, id) {
        var i, j, len, ref, rows;
        if (node.objectId === id) {
          if (node.hasFile === void 0) {
            node.hasFile = 1;
          } else if (typeof node.hasFile === 'number') {
            node.hasFile = node.hasFile + 1;
          }
          return node.hasFile;
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.objectId === id) {
              if (rows.hasFile === void 0) {
                rows.hasFile = 1;
              } else if (typeof rows.hasFile === 'number') {
                rows.hasFile = rows.hasFile + 1;
              }
              return rows.hasFile;
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
          node.path.push(node.objectId);
        } else {
          node.path = [node.objectId];
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
          if (rows.pid === node.objectId) {
            if (rows.type !== 'file') {
              node.children.push(rows);
            } else {
              if (node.hasFile === void 0) {
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
            rows.pid = rows.path[rows.path.length - 2];
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
        return mdDialogService.initCustomDialog('updateAbleAlertController', 'modules/projectManage/projectEdit/dataModule/template/mdDialog/updateModule.html?' + window.hsConfig.bust, event, null).then(function(res) {
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
        return mdDialogService.initCustomDialog('newProjectAlertController', 'modules/projectManage/projectEdit/dataModule/template/mdDialog/newModule.html?' + window.hsConfig.bust, event, null).then(function(res) {
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
    '$scope', '$log', '$stateParams', '$mdDialog', 'property', 'mdDialogService', 'containerId', function($scope, $log, $stateParams, $mdDialog, property, mdDialogService, containerId) {
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
          attributeType: 'string',
          attributeLength: 1,
          required: true,
          containerId: vm.containerId,
          systemAttribute: false
        });
      };
      deleteCustomdata = function(index) {
        return vm.entity.splice(index, 1);
      };
      saveCustomData = function() {
        return $mdDialog.hide(vm.entity);
      };
      vm.saveCustomData = saveCustomData;
      vm.deleteCustomdata = deleteCustomdata;
      vm.addCustomData = addCustomData;
      vm.cancel = cancel;
      init();
    }
  ]).controller('editFileDataController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'property', 'mdDialogService', 'fileLists', function($scope, $log, $stateParams, $mdDialog, property, mdDialogService, fileLists) {
      var addCustomData, cancel, deleteCustomdata, init, saveCustomData, vm;
      vm = this;
      init = function() {
        vm.typeLists = ['date', 'int', 'string', 'boolean'];
        vm.entity = property;
        vm.fileLists = fileLists;
        return vm.currentFileId = vm.fileLists[0].objectId;
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      addCustomData = function() {
        return vm.entity.push({
          displayName: '自定义元数据',
          attributeType: 'string',
          attributeLength: 1,
          required: true,
          containerId: vm.currentFileId,
          systemAttribute: false
        });
      };
      deleteCustomdata = function(index) {
        return vm.entity.splice(index, 1);
      };
      saveCustomData = function() {
        return $mdDialog.hide(vm.entity);
      };
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
  ]);

}).call(this);

//# sourceMappingURL=dataModule.controller.js.map
