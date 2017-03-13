(function() {
  'use strict';
  angular.module("myApp").controller("projectManageController", [
    '$scope', '$log', '$state', 'projectManageService', 'mdDialogService', '$timeout', '$mdToast', function($scope, $log, $state, projectManageService, mdDialogService, $timeout, $mdToast) {
      var deleteProject, editModule, editProject, getProjectList, init, newProject, vm;
      vm = this;
      init = function() {
        getProjectList();
      };
      getProjectList = function() {
        return projectManageService.getProjectList().then(function(res) {
          return vm.projectLists = res.data;
        }, function(res) {});
      };
      newProject = function(event) {
        return mdDialogService.initCustomDialog('newProjectController', 'webComponents/common/hsTemplates/doc/projectManage/newProjectManage.html?' + window.hsConfig.bust, event, {
          parameter: 'test-parameter'
        }).then(function(res) {
          if (res) {
            res.createDate = '2017年01月23日创建';
            vm.projectLists.push(res);
            return mdDialogService.initCustomDialog('newProjectAlertController', 'webComponents/common/hsTemplates/doc/projectManage/newProjectAlert.html?' + window.hsConfig.bust, event, null).then(function(res) {});
          }
        }, function(res) {
          return console.log('canceled');
        });
      };
      editProject = function(event, item) {
        return mdDialogService.initCustomDialog('editProjectController', 'webComponents/common/hsTemplates/doc/projectManage/editProjectManage.html?' + window.hsConfig.bust, event, {
          item: item
        }).then(function(res) {
          return item = res;
        }, function(res) {});
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
      deleteProject = function(event, item, index) {
        return mdDialogService.initConfirmDialog(event, '删除项目', '确定要删除该项目吗?').then(function() {
          vm.loading = true;
          return projectManageService.deleteProject(index).then(function(res) {
            vm.projectLists.splice(index, 1);
            return vm.loading = false;
          }, function(res) {});
        });
      };
      vm.deleteProject = deleteProject;
      vm.editModule = editModule;
      vm.editProject = editProject;
      vm.newProject = newProject;
      init();
    }
  ]).controller('newProjectController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'parameter', 'projectManageService', function($scope, $log, $stateParams, $mdDialog, parameter, projectManageService) {
      var cancel, init, loadDataBase, newProject, vm;
      vm = this;
      vm.parameter = parameter;
      vm.entity = {};
      init = function() {
        console.log(parameter);
        vm.ruleType = [
          {
            name: '呵呵哒'
          }, {
            name: '哈哈'
          }
        ];
        vm.years = [1991, 1998, 2010, 2017];
        return vm.keepTime = ['3年', '5年', '10年'];
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      newProject = function() {
        vm.loading = true;
        return projectManageService.newProject(vm.entity).then(function(res) {
          vm.loading = false;
          return $mdDialog.hide(vm.entity);
        }, function(res) {
          vm.loading = false;
        });
      };
      loadDataBase = function() {
        return projectManageService.getDataBaseList().then(function(res) {
          return vm.dataBases = res.data;
        }, function(res) {});
      };
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
  ]).controller('editProjectController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'item', 'mdDialogService', '$timeout', function($scope, $log, $stateParams, $mdDialog, item, mdDialogService, $timeout) {
      var cancel, editModule, editProject, editProperty, hideMessage, init, newModule, vm;
      vm = this;
      init = function() {
        vm.showMessage = true;
        vm.entity = item;
        if (!vm.entity.module) {
          return vm.entity.module = [];
        }
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      editProperty = function(event, propertyName, propertyValue) {
        if (propertyName === '项目名称' || propertyName === '业务编号') {
          return mdDialogService.initPromptDialog(event, propertyName, propertyValue).then(function(res) {
            if (propertyName === '项目名称') {
              return vm.entity.name = res;
            } else if (propertyName === '业务编号') {
              return vm.entity.number = res;
            }
          }, function(res) {});
        } else {
          return mdDialogService.initCustomDialog('editSelectController', 'webComponents/common/hsTemplates/doc/projectManage/editSelect.html?' + window.hsConfig.bust, event, {
            propertyName: propertyName,
            propertyValue: propertyValue
          }).then(function(res) {
            if (propertyName === '数据库类型') {
              return vm.entity.dataBaseType = res;
            } else if (propertyName === '门类号') {
              return vm.entity.ruleType = res;
            } else if (propertyName === '年度') {
              return vm.entity.year = res;
            } else if (propertyName === '系统保留时间') {
              return vm.entity.keepTime = res;
            }
          }, function(res) {});
        }
      };
      newModule = function(event) {
        return mdDialogService.initCustomDialog('customeModuleController', 'webComponents/common/hsTemplates/doc/projectManage/customeModule.html?' + window.hsConfig.bust, event, {
          module: null
        }).then(function(res) {
          vm.entity.module.push(res);
        }, function(res) {});
      };
      editProject = function() {
        return $mdDialog.hide(vm.entity);
      };
      editModule = function(event, module) {
        return mdDialogService.initCustomDialog('customeModuleController', 'webComponents/common/hsTemplates/doc/projectManage/customeModule.html?' + window.hsConfig.bust, event, {
          module: module
        }).then(function(res) {
          var i, j, len, ref, rows;
          if (res.updateVersion) {
            vm.entity.module.push(res);
          } else {
            ref = vm.entity.module;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
              rows = ref[i];
              if (vm.entity.module[i].version === res.version) {
                vm.entity.module[i] = res;
              }
            }
          }
        }, function(res) {});
      };
      hideMessage = function() {
        return vm.showMessage = false;
      };
      vm.hideMessage = hideMessage;
      vm.editModule = editModule;
      vm.editProject = editProject;
      vm.newModule = newModule;
      vm.editProperty = editProperty;
      vm.cancel = cancel;
      init();
    }
  ]).controller('editSelectController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'propertyName', 'propertyValue', 'projectManageService', function($scope, $log, $stateParams, $mdDialog, propertyName, propertyValue, projectManageService) {
      var cancel, editProperty, init, loadDataBase, vm;
      vm = this;
      vm.propertyName = propertyName;
      vm.propertyValue = propertyValue;
      init = function() {
        vm.ruleType = [
          {
            name: '呵呵哒'
          }, {
            name: '哈哈'
          }
        ];
        vm.years = [1991, 1998, 2010, 2017];
        return vm.keepTime = ['3年', '5年', '10年'];
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      loadDataBase = function() {
        return projectManageService.getDataBaseList().then(function(res) {
          return vm.dataBases = res.data;
        }, function(res) {});
      };
      editProperty = function() {
        return $mdDialog.hide(vm.propertyValue);
      };
      vm.editProperty = editProperty;
      vm.loadDataBase = loadDataBase;
      vm.cancel = cancel;
      init();
    }
  ]).controller('customeModuleController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'projectManageService', '$timeout', 'mdDialogService', 'module', function($scope, $log, $stateParams, $mdDialog, projectManageService, $timeout, mdDialogService, module) {
      var cancel, deleteNode, editProject, findMaxId, init, initId, jsonToObj, listenEvent, modelPush, searchId, updateFileData, updateMetaData, updateName, vm;
      vm = this;
      $scope.saveData = [];
      initId = void 0;
      $scope.module = module;
      init = function() {
        listenEvent();
        if (!module) {
          initId = 1;
          return $scope.nodes = {
            "name": "record",
            "id": initId,
            "type": "record",
            "fileData": {
              defaultData: [],
              customData: []
            },
            "metaData": {
              defaultData: [],
              customData: []
            },
            "children": []
          };
        } else {
          $scope.nodes = angular.copy(module.data[0]);
          jsonToObj($scope.nodes);
          return initId = findMaxId($scope.nodes);
        }
      };
      listenEvent = function() {
        $scope.$on('node:delete', function(e, d) {
          return mdDialogService.initConfirmDialog(e, '删除节点', '确定要删除该节点吗?').then(function() {
            return $timeout(function() {
              return deleteNode($scope.nodes, d.id);
            });
          }, function() {});
        });
        $scope.$on('node:updateName', function(e, d) {
          return mdDialogService.initPromptDialog(event, '节点名', d.name).then(function(res) {
            if (res) {
              return updateName($scope.nodes, d.id, res);
            } else {
              return mdDialogService.initAlertDialog('节点名不能为空', '', '知道了', e);
            }
          }, function(res) {});
        });
        $scope.$on('add:node', function(e, d) {
          return $timeout(function() {
            return searchId($scope.nodes, d.id, 'node');
          });
        });
        $scope.$on('add:block', function(e, d) {
          return $timeout(function() {
            return searchId($scope.nodes, d.id, 'block');
          });
        });
        $scope.$on('node:addCustomData', function(e, d) {
          return mdDialogService.initCustomDialog('editCustomDataController', 'webComponents/common/hsTemplates/doc/projectManage/editCustomData.html?' + window.hsConfig.bust, e, {
            info: d
          }).then(function(res) {
            if (res) {
              updateMetaData($scope.nodes, d.id, res);
            }
          }, function(res) {
            return console.log('canceled');
          });
        });
        return $scope.$on('node:addFile', function(e, d) {
          return mdDialogService.initCustomDialog('editFileDataController', 'webComponents/common/hsTemplates/doc/projectManage/editFileData.html?' + window.hsConfig.bust, e, {
            info: d
          }).then(function(res) {
            if (res) {
              updateFileData($scope.nodes, d.id, res);
            }
          }, function(res) {
            return console.log('canceled');
          });
        });
      };
      findMaxId = function(node) {
        var forFindId, id;
        id = 1;
        forFindId = function(node) {
          var i, j, len, ref, results, rows;
          if (node.id > id) {
            id = node.id;
          }
          if (node.children) {
            ref = node.children;
            results = [];
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
              rows = ref[i];
              if (rows.id > id) {
                id = rows.id;
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
        if (node.id === id) {
          $timeout(function() {
            node = {};
          });
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.id === id) {
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
        if (node.id === id) {
          $timeout(function() {
            node.name = name;
            $scope.$broadcast('update:name', name, id);
          });
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.id === id) {
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
      searchId = function(node, id, type) {
        var i, j, len, ref, rows;
        if (node.id === id) {
          $timeout(function() {
            initId = initId + 1;
            return node.children.push({
              "name": type,
              "id": initId,
              "type": type,
              "children": [],
              "fileData": {
                defaultData: [],
                customData: []
              },
              "metaData": {
                defaultData: [],
                customData: []
              }
            });
          });
          return;
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.id === id) {
              $timeout(function() {
                initId = initId + 1;
                return rows.children.push({
                  "name": type,
                  "id": initId,
                  "type": type,
                  "children": [],
                  "fileData": {
                    defaultData: [],
                    customData: []
                  },
                  "metaData": {
                    defaultData: [],
                    customData: []
                  }
                });
              });
              break;
              return;
            } else {
              searchId(rows, id, type);
            }
          }
        }
      };
      modelPush = function(node, parent_path) {
        var i, j, len, node_b, ref, results, rows;
        if (parent_path) {
          node.path = angular.copy(parent_path);
          node.path.push(node.id);
        } else {
          node.path = [node.id];
        }
        node_b = angular.copy(node);
        delete node_b.children;
        $scope.saveData.push(node_b);
        if (node.children.length > 0) {
          ref = node.children;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            rows.path = angular.copy(node.path);
            results.push(modelPush(rows, rows.path));
          }
          return results;
        }
      };
      updateFileData = function(node, id, data) {
        var i, j, len, ref, rows;
        if (node.id === id) {
          $timeout(function() {
            return node.fileData = data;
          });
          return;
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.id === id) {
              $timeout(function() {
                return rows.fileData = data;
              });
              return;
            } else {
              updateFileData(rows, id, data);
            }
          }
        }
      };
      updateMetaData = function(node, id, data) {
        var i, j, len, ref, rows;
        if (node.id === id) {
          $timeout(function() {
            return node.metaData = data;
          });
          return;
        }
        if (node.children) {
          ref = node.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.id === id) {
              $timeout(function() {
                return rows.metaData = data;
              });
              return;
            } else {
              updateMetaData(rows, id, data);
            }
          }
        }
      };
      jsonToObj = function(node) {
        var i, j, k, len, len1, ref, ref1, results, rows;
        node.children = [];
        ref = module.data;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if (rows.path[rows.path.length - 2] === node.id) {
            node.children.push(rows);
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
      cancel = function() {
        return $mdDialog.cancel();
      };
      editProject = function(event, update) {
        var customData, fileData, i, j, k, l, len, len1, len2, len3, len4, m, model, myDate, n, ref, ref1, ref2, ref3, ref4, rows, y;
        model = {};
        $scope.saveData = [];
        modelPush($scope.nodes);
        model.data = angular.copy($scope.saveData);
        model.metaData = [];
        model.fileData = [];
        ref = model.data;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          rows.parentId = rows.path[rows.path.length - 2];
          ref1 = rows.metaData.customData;
          for (y = k = 0, len1 = ref1.length; k < len1; y = ++k) {
            customData = ref1[y];
            customData.id = rows.id;
            model.metaData.push(customData);
          }
          ref2 = rows.metaData.defaultData;
          for (y = l = 0, len2 = ref2.length; l < len2; y = ++l) {
            customData = ref2[y];
            customData.id = rows.id;
            model.metaData.push(customData);
          }
          ref3 = rows.fileData.customData;
          for (y = m = 0, len3 = ref3.length; m < len3; y = ++m) {
            fileData = ref3[y];
            fileData.id = rows.id;
            model.fileData.push(fileData);
          }
          ref4 = rows.fileData.defaultData;
          for (y = n = 0, len4 = ref4.length; n < len4; y = ++n) {
            fileData = ref4[y];
            fileData.id = rows.id;
            model.fileData.push(fileData);
          }
        }
        myDate = new Date();
        if (!update) {
          if (!module) {
            model.version = 1;
            model.createDate = myDate.toLocaleDateString();
            model.modifyDate = myDate.toLocaleDateString();
          } else {
            model.version = module.version;
            model.createDate = module.createDate;
            model.modifyDate = myDate.toLocaleDateString();
          }
          model.updateVersion = false;
        } else {
          model.createDate = myDate.toLocaleDateString();
          model.modifyDate = myDate.toLocaleDateString();
          model.updateVersion = true;
          model.version = module.version + 1;
        }
        return $mdDialog.hide(model);
      };
      vm.editProject = editProject;
      vm.cancel = cancel;
      init();
    }
  ]).controller('editCustomDataController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'info', 'mdDialogService', function($scope, $log, $stateParams, $mdDialog, info, mdDialogService) {
      var addCustomData, cancel, deleteCustomdata, init, saveCustomData, vm;
      vm = this;
      init = function() {
        vm.typeLists = ['char', 'int', 'string', 'boolean'];
        vm.entity = info;
        if (vm.entity.type === 'record') {
          vm.entity.metaData.defaultData = [
            {
              index: 1,
              dataName: 'ID',
              type: 'char',
              length: 8,
              isRequired: true
            }, {
              index: 2,
              dataName: '名称',
              type: 'char',
              length: 30,
              isRequired: true
            }, {
              index: 3,
              dataName: '业务编号',
              type: 'char',
              length: 6,
              isRequired: true
            }
          ];
        }
        return vm.keepData = angular.copy(vm.entity.metaData.customData);
      };
      cancel = function() {
        vm.entity.metaData.customData = vm.keepData;
        return $mdDialog.cancel();
      };
      addCustomData = function() {
        return vm.entity.metaData.customData.push({
          dataName: '自定义元数据',
          type: 'char',
          length: 1,
          isRequired: true
        });
      };
      deleteCustomdata = function(index) {
        return vm.entity.metaData.customData.splice(index, 1);
      };
      saveCustomData = function() {
        return $mdDialog.hide(vm.entity.metaData);
      };
      vm.saveCustomData = saveCustomData;
      vm.deleteCustomdata = deleteCustomdata;
      vm.addCustomData = addCustomData;
      vm.cancel = cancel;
      init();
    }
  ]).controller('editFileDataController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'info', 'mdDialogService', function($scope, $log, $stateParams, $mdDialog, info, mdDialogService) {
      var addCustomData, cancel, deleteCustomdata, init, saveCustomData, vm;
      vm = this;
      init = function() {
        vm.typeLists = ['char', 'int', 'string', 'boolean'];
        vm.entity = info;
        if (vm.entity.type === 'record') {
          vm.entity.fileData.defaultData = [
            {
              index: 1,
              dataName: 'ID',
              type: 'char',
              length: 8,
              isRequired: true
            }, {
              index: 2,
              dataName: '名称',
              type: 'char',
              length: 30,
              isRequired: true
            }, {
              index: 3,
              dataName: '业务编号',
              type: 'char',
              length: 6,
              isRequired: true
            }
          ];
        }
        return vm.keepData = angular.copy(vm.entity.fileData.customData);
      };
      cancel = function() {
        vm.entity.fileData.customData = vm.keepData;
        return $mdDialog.cancel();
      };
      addCustomData = function() {
        return vm.entity.fileData.customData.push({
          dataName: '自定义元数据',
          type: 'char',
          length: 1,
          isRequired: true
        });
      };
      deleteCustomdata = function(index) {
        return vm.entity.fileData.customData.splice(index, 1);
      };
      saveCustomData = function() {
        return $mdDialog.hide(vm.entity.fileData);
      };
      vm.saveCustomData = saveCustomData;
      vm.deleteCustomdata = deleteCustomdata;
      vm.addCustomData = addCustomData;
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);
