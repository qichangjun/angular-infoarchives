(function() {
  'use strict';
  angular.module("myApp").controller("dataBaseController", [
    '$scope', '$log', 'dataBaseService', '$stateParams', '$state', 'initGrid', '$timeout', 'batchService', '$mdSidenav', 'mdDialogService', 'uuid', function($scope, $log, dataBaseService, $stateParams, $state, initGrid, $timeout, batchService, $mdSidenav, mdDialogService, uuid) {
      var PAHT_OF_TEMPLATE_MDDIALOG, biggerSvg, changeChartType, checkData, closeSideBar, createFilterFor, filterData, getBasicInfo, getItems, getTreeData, getUnits, init, listenEvent, querySearch, smallerSvg, vm;
      vm = this;
      vm.parameter = $stateParams;
      if (!vm.parameter.chartType) {
        vm.parameter.chartType = 'unit';
      }
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/dataBase/template/mdDialog/';
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
          floor: 10,
          ceil: 50
        }
      };
      init = function() {
        getTreeData();
        listenEvent();
        getBasicInfo();
      };
      getTreeData = function() {
        $scope.data = {
          name: '数据仓库',
          children: [],
          objectId: uuid.v4()
        };
        return $timeout(function() {
          vm.loading = true;
          if (vm.parameter.chartType === 'unit') {
            return dataBaseService.getUnitData().then(function(res) {
              var i, items, j, k, len, len1, ref, rows, x;
              for (i = j = 0, len = res.length; j < len; i = ++j) {
                rows = res[i];
                rows.objectId = uuid.v4();
                if (rows.children) {
                  ref = rows.children;
                  for (x = k = 0, len1 = ref.length; k < len1; x = ++k) {
                    items = ref[x];
                    items.objectId = uuid.v4();
                  }
                }
              }
              $scope.data = {
                name: '数据仓库',
                children: res,
                objectId: uuid.v4()
              };
              getUnits();
              getItems();
              return vm.loading = false;
            }, function(res) {
              vm.loading = false;
            });
          } else if (vm.parameter.chartType === 'source') {
            return dataBaseService.getSourceData().then(function(res) {
              var i, items, j, k, len, len1, ref, rows, x;
              for (i = j = 0, len = res.length; j < len; i = ++j) {
                rows = res[i];
                rows.objectId = uuid.v4();
                if (rows.children) {
                  ref = rows.children;
                  for (x = k = 0, len1 = ref.length; k < len1; x = ++k) {
                    items = ref[x];
                    items.objectId = uuid.v4();
                  }
                }
              }
              $scope.data = {
                name: '数据仓库',
                children: res,
                objectId: uuid.v4()
              };
              getUnits();
              getItems();
              return vm.loading = false;
            }, function(res) {
              vm.loading = false;
            });
          }
        });
      };
      getBasicInfo = function() {
        return dataBaseService.getBasicInfo().then(function(res) {
          return vm.basicInfo = res;
        }, function(res) {});
      };
      getItems = function() {
        var i, items, j, len, ref, results1, rows, x;
        vm.itemLists = [];
        if ($scope.data) {
          ref = $scope.data.children;
          results1 = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (vm.parameter.unit && vm.parameter.unit.objectId !== 'all') {
              if (rows.objectId === vm.parameter.unit.objectId) {
                results1.push((function() {
                  var k, len1, ref1, results2;
                  ref1 = rows.children;
                  results2 = [];
                  for (x = k = 0, len1 = ref1.length; k < len1; x = ++k) {
                    items = ref1[x];
                    results2.push(vm.itemLists.push(items));
                  }
                  return results2;
                })());
              } else {
                results1.push(void 0);
              }
            } else {
              results1.push((function() {
                var k, len1, ref1, results2;
                ref1 = rows.children;
                results2 = [];
                for (x = k = 0, len1 = ref1.length; k < len1; x = ++k) {
                  items = ref1[x];
                  results2.push(vm.itemLists.push(items));
                }
                return results2;
              })());
            }
          }
          return results1;
        }
      };
      getUnits = function() {
        var i, j, len, ref, results1, rows;
        vm.unitLists = [];
        ref = $scope.data.children;
        results1 = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          results1.push(vm.unitLists.push(rows));
        }
        return results1;
      };
      listenEvent = function() {
        return $scope.$on('treeChart:selectNode', function(ev, d) {
          var parameter;
          if (d.type === 'items') {
            vm.parameter.unit = {
              objectId: d.parent.objectId,
              name: d.parent.name
            };
            vm.parameter.item = {
              objectId: d.objectId,
              name: d.name
            };
            getItems();
            filterData();
            if (vm.parameter.chartType === 'unit') {
              parameter = {};
              parameter.source_unit = d.parent.name;
              parameter.business_matter = d.name;
              vm.loadingDetail = true;
              dataBaseService.getRecordDetail(parameter).then(function(res) {
                vm.loadingDetail = false;
                vm.entity = res;
                vm.entity.unitName = parameter.source_unit;
                return vm.entity.itemName = parameter.business_matter;
              }, function(res) {
                vm.loadingDetail = false;
              });
            } else if (vm.parameter.chartType === 'source') {
              parameter = {};
              parameter.system_name = d.parent.name;
              parameter.business_matter = d.name;
              vm.loadingDetail = true;
              dataBaseService.getRecordDetail(parameter).then(function(res) {
                vm.loadingDetail = false;
                vm.entity = res;
                vm.entity.systemName = parameter.system_name;
                return vm.entity.itemName = parameter.business_matter;
              }, function(res) {
                vm.loadingDetail = false;
              });
            }
            $mdSidenav('tree-data-node-detail').open();
            return $timeout(function() {
              return vm.parameter.item = {
                objectId: d.objectId,
                name: d.name
              };
            });
          } else if (!d) {
            vm.entity = {};
            vm.parameter.item = null;
            vm.parameter.unit = null;
            return $mdSidenav('tree-data-node-detail').close();
          }
        });
      };
      changeChartType = function(chartType) {
        vm.slider.value = 10;
        $state.go('.', vm.parameter, {
          notify: false
        });
        getTreeData();
        return $timeout(function() {
          vm.parameter.unit = null;
          return vm.parameter.item = null;
        });
      };
      checkData = function(event) {
        return mdDialogService.initCustomDialog('checkDataController', PAHT_OF_TEMPLATE_MDDIALOG + 'checkData.html?' + window.hsConfig.bust, event, {
          info: vm.entity
        }).then(function(res) {}, function(res) {});
      };
      closeSideBar = function() {
        return $mdSidenav('tree-data-node-detail').close();
      };
      filterData = function() {
        var _item, _unit;
        if (!vm.parameter.unit) {
          _unit = 'all';
        } else {
          _unit = vm.parameter.unit.objectId || 'all';
        }
        if (!vm.parameter.item) {
          _item = 'all';
        } else {
          _item = vm.parameter.item.objectId || 'all';
        }
        $scope.$broadcast('tree:filter', _unit, _item);
        getItems();
        return vm.entity = {};
      };
      biggerSvg = function() {
        return $scope.$broadcast('svg:bigger');
      };
      smallerSvg = function() {
        return $scope.$broadcast('svg:smaller');
      };
      querySearch = function(query, lists) {
        var results;
        results = query ? lists.filter(createFilterFor(query)) : lists;
        return results;
      };
      createFilterFor = function(query) {
        var lowercaseQuery;
        lowercaseQuery = angular.lowercase(query);
        return function(state) {
          return state.name.indexOf(lowercaseQuery) >= 0;
        };
      };
      vm.querySearch = querySearch;
      vm.smallerSvg = smallerSvg;
      vm.biggerSvg = biggerSvg;
      vm.getTreeData = getTreeData;
      vm.filterData = filterData;
      vm.closeSideBar = closeSideBar;
      vm.checkData = checkData;
      vm.changeChartType = changeChartType;
      init();
    }
  ]).controller('checkDataController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'dataBaseService', 'i18nService', 'hsTpl', 'mdDialogService', '$timeout', 'info', '$window', '$state', function($scope, $log, $stateParams, $mdDialog, dataBaseService, i18nService, hsTpl, mdDialogService, $timeout, info, $window, $state) {
      var PAHT_OF_TEMPLATE_MDDIALOG, cancel, downloadFile, exportList, getGridData, init, initGrid, previewDoc, previewRecord, vm;
      vm = this;
      vm.parameter = {};
      vm.parameter.currentPage = 1;
      vm.parameter.pageSize = 50;
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/dataBase/template/mdDialog/';
      vm.parameter.business_matter = info.itemName;
      vm.parameter.source_unit = info.unitName;
      vm.parameter.system_name = info.systemName;
      init = function() {
        getGridData();
        return initGrid();
      };
      initGrid = function() {
        i18nService.setCurrentLang('zh-cn');
        return $scope.gridOptions = {
          totalItems: vm.parameter.pageSize * vm.parameter.currentPage,
          selectionRowHeaderWidth: 40,
          enableRowSelection: true,
          enableSelectAll: true,
          paginationPageSize: Number(vm.parameter.pageSize),
          paginationCurrentPage: Number(vm.parameter.currentPage),
          rowTemplate: hsTpl.hsRowTemplate,
          useExternalPagination: true,
          useExternalSorting: true,
          rowHeight: 40,
          columnDefs: dataBaseService.recordList,
          columnVirtualizationThreshold: dataBaseService.recordList.length,
          onRegisterApi: function(gridApi) {
            $scope.cancelSelect = function(row) {
              if (gridApi.selection) {
                if (gridApi.selection.getSelectedRows().length === 1 && gridApi.selection.getSelectedRows()[0] === row) {
                  return gridApi.selection.clearSelectedRows();
                } else if (gridApi.selection.getSelectedRows().length === 1 && gridApi.selection.getSelectedRows()[0] !== row) {
                  gridApi.selection.clearSelectedRows();
                  return gridApi.selection.selectRow(row);
                } else if (gridApi.selection.getSelectedRows().length < 1) {
                  return gridApi.selection.selectRow(row);
                } else if (gridApi.selection.getSelectedRows().length > 1) {
                  gridApi.selection.clearSelectedRows();
                  return gridApi.selection.selectRow(row);
                }
              }
            };
            $scope.gridApi = gridApi;
            gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
              if (!(vm.parameter.currentPage === newPage && vm.parameter.pageSize === pageSize)) {
                vm.parameter.currentPage = newPage;
                vm.parameter.pageSize = pageSize;
                return getGridData();
              }
            });
            return gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
              if (sortColumns.length === 0) {
                vm.parameter.sortWay = null;
                vm.parameter.sortField = null;
              } else {
                vm.parameter.sortWay = sortColumns[0].sort.direction.toLocaleUpperCase();
                vm.parameter.sortField = sortColumns[0].name;
              }
              return getGridData();
            });
          }
        };
      };
      getGridData = function() {
        return $timeout(function() {
          var endDate, startDate;
          vm.loading = true;
          $scope.gridOptions.data = [];
          if (vm.parameter.startDate) {
            startDate = new Date(vm.parameter.startDate);
            startDate.setHours(0);
            startDate.setMinutes(0);
            startDate.setSeconds(0);
            vm.parameter.startDate = startDate;
          }
          if (vm.parameter.endDate) {
            endDate = new Date(vm.parameter.endDate);
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setSeconds(59);
            vm.parameter.endDate = endDate;
          }
          return dataBaseService.getGridData(vm.parameter).then(function(res) {
            var column, i, j, k, len, len1, ref, ref1, results1, rows;
            vm.loading = false;
            $scope.gridOptions.data = res.content;
            ref = $scope.gridOptions.data;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
              rows = ref[i];
              if (rows.licenseNumber === 'null') {
                rows.licenseNumber = null;
              }
            }
            $scope.gridOptions.totalItems = res.totalElements;
            ref1 = $scope.gridOptions.columnDefs;
            results1 = [];
            for (k = 0, len1 = ref1.length; k < len1; k++) {
              column = ref1[k];
              results1.push(column.enableColumnMenu = false);
            }
            return results1;
          }, function(res) {});
        }, 500);
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      previewDoc = function(event) {
        $window.open($state.href('previewRecord', {
          templateId: $scope.gridApi.selection.getSelectedRows()[0].templateId,
          recordId: $scope.gridApi.selection.getSelectedRows()[0].recordCode,
          businessCode: $scope.gridApi.selection.getSelectedRows()[0].businessCode,
          name: $scope.gridApi.selection.getSelectedRows()[0].name
        }));
      };
      previewRecord = function(info) {
        $window.open($state.href('previewRecord', {
          templateId: info.templateId,
          recordId: info.recordCode,
          businessCode: info.businessCode,
          name: info.name
        }));
      };
      exportList = function() {
        return dataBaseService.exportList(vm.parameter).then(function(res) {
          return window.location.href = res.downloadUrl;
        }, function(res) {});
      };
      downloadFile = function() {
        var _ids, i, j, len, ref, rows;
        _ids = [];
        ref = $scope.gridApi.selection.getSelectedRows();
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          _ids.push(rows.id);
        }
        return dataBaseService.downloadFile(_ids).then(function(res) {
          return window.location.href = res.downloadUrl;
        }, function(res) {});
      };
      vm.previewRecord = previewRecord;
      vm.downloadFile = downloadFile;
      vm.exportList = exportList;
      vm.getGridData = getGridData;
      vm.previewDoc = previewDoc;
      vm.cancel = cancel;
      init();
    }
  ]).controller('previewDocController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'dataBaseService', 'recordId', 'templateId', 'moduleTemplateService', 'mdDialogService', 'businessCode', function($scope, $log, $stateParams, $mdDialog, dataBaseService, recordId, templateId, moduleTemplateService, mdDialogService, businessCode) {
      var PAHT_OF_TEMPLATE_MDDIALOG, cancel, getJsonData, getShowTemplate, init, initProcess, showProcessDetail, vm;
      vm = this;
      vm.parameter = {};
      vm.parameter.templateId = templateId;
      vm.parameter.recordCode = recordId;
      vm.businessCode = businessCode;
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/dataBase/template/mdDialog/';
      init = function() {
        getJsonData();
      };
      getJsonData = function() {
        return dataBaseService.getRecordJson(vm.parameter.recordCode).then(function(res) {
          $scope.jsonData = res.jsonRecord;
          return getShowTemplate();
        }, function(res) {});
      };
      initProcess = function() {
        var i, j, len, ref, results1, rows;
        ref = vm.processLists;
        results1 = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if ((i + 1) % 5 === 1 && parseInt((i + 1) / 5) % 2 !== 0) {
            results1.push(rows["class"] = '_last');
          } else if ((i + 1) % 5 === 1 && parseInt((i + 1) / 5) % 2 === 0) {
            results1.push(rows["class"] = '_first');
          } else if ((((i + 1) % 5) === 0 && parseInt((i + 1) / 5) % 2 !== 0) || (i === vm.processLists.length - 1 && parseInt((i + 1) / 5) % 2 === 0)) {
            results1.push(rows["class"] = 'last');
          } else if ((((i + 1) % 5) === 0 && parseInt((i + 1) / 5) % 2 === 0) || (i === vm.processLists.length - 1 && parseInt((i + 1) / 5) % 2 !== 0)) {
            results1.push(rows["class"] = 'first');
          } else if (parseInt((i + 1) / 5) % 2 === 0) {
            results1.push(rows["class"] = 'middle');
          } else {
            results1.push(rows["class"] = '_middle');
          }
        }
        return results1;
      };
      getShowTemplate = function() {
        return moduleTemplateService.getTemplate(vm.parameter.templateId).then(function(res) {
          var i, items, j, k, l, len, len1, len2, ref, ref1, ref2, rows, x;
          if (res) {
            $scope.data = JSON.parse(res.showTemplate);
            if ($scope.data) {
              ref = $scope.data;
              for (i = j = 0, len = ref.length; j < len; i = ++j) {
                rows = ref[i];
                if (rows.data && rows.data.length > 0) {
                  ref1 = rows.data;
                  for (x = k = 0, len1 = ref1.length; k < len1; x = ++k) {
                    items = ref1[x];
                    items.value = jsonPath($scope.jsonData, items.jsonPath);
                    console.log(items);
                  }
                }
              }
            }
            vm.process_lists = jsonPath($scope.jsonData, '$..*.node');
            vm.processLists = [];
            if (vm.process_lists) {
              ref2 = vm.process_lists;
              for (i = l = 0, len2 = ref2.length; l < len2; i = ++l) {
                rows = ref2[i];
                if (rows instanceof Array) {
                  vm.processLists = vm.processLists.concat(rows);
                } else {
                  vm.processLists.push(rows);
                }
              }
              return initProcess();
            }
          }
        }, function(res) {});
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      showProcessDetail = function(info) {
        return mdDialogService.initCustomDialog('showProcessDetailController', PAHT_OF_TEMPLATE_MDDIALOG + 'showProcessDetail.html?' + window.hsConfig.bust, event, {
          info: info
        }).then(function(res) {}, function(res) {});
      };
      vm.showProcessDetail = showProcessDetail;
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);
