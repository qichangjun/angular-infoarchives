(function() {
  'use strict';
  angular.module("myApp").service("initGrid", [
    '$q', 'Restangular', 'i18nService', 'hsTranslateService', '$stateParams', 'hsTpl', function($q, Restangular, i18nService, hsTranslateService, $stateParams, hsTpl) {
      var $scope, getGrid, getList, getScope, listUrl, parameter;
      $scope = {};
      parameter = {};
      listUrl = '';
      getScope = function(scope) {
        $scope = scope;
        listUrl = $scope.listUrl;
        return scope;
      };
      getGrid = function() {
        i18nService.setCurrentLang('zh-cn');
        return $scope.gridOptions = {
          enableFiltering: true,
          rowTemplate: hsTpl.hsRowTemplate,
          rowHeight: 55,
          selectionRowHeaderWidth: 40,
          saveSort: false,
          enablePaginationControls: true,
          gridMenuTitleFilter: hsTranslateService.translate,
          enableRowSelection: true,
          enableSelectAll: true,
          enableHorizontalScrollbar: false,
          paginationPageSizes: [5, 15, 20],
          paginationPageSize: Number($stateParams.pageSize) || 50,
          paginationCurrentPage: Number($stateParams.currentPage) || 1,
          useExternalPagination: true,
          useExternalSorting: true,
          onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
              if (sortColumns.length === 0) {
                parameter.sortWay = null;
              } else {
                parameter.sortWay = sortColumns[0].sort.direction.toLocaleUpperCase();
                parameter.sortField = sortColumns[0].name;
              }
              return $scope.$emit('getList:changePageAndSort', parameter);
            });
            gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
              if (!(parameter.currentPage === newPage && parameter.pageSize === pageSize)) {
                parameter.currentPage = newPage;
                parameter.pageSize = pageSize;
                return $scope.$emit('getList:changePageAndSort', parameter);
              }
            });
            if (gridApi.colMovable && $scope.gridApi.saveState) {
              gridApi.colMovable.on.columnPositionChanged($scope, function(colDef, originalPosition, newPosition) {
                var gridHeader;
                gridHeader = {};
                gridHeader = $scope.gridApi.saveState.save();
                if (gridHeader.selection) {
                  gridHeader.selection = [];
                }
                return localStorage.setItem("ui_grid_header_file", JSON.stringify(gridHeader));
              });
            }
            if (gridApi.core.on.columnVisibilityChanged && $scope.gridApi.saveState) {
              gridApi.core.on.columnVisibilityChanged($scope, function(changedColumn) {
                var gridHeader;
                if (!$scope.restore) {
                  gridHeader = {};
                  gridHeader = $scope.gridApi.saveState.save();
                  if (gridHeader.selection) {
                    gridHeader.selection = [];
                  }
                  return localStorage.setItem("ui_grid_header_file", JSON.stringify(gridHeader));
                }
              });
            }
            if (gridApi.colResizable && $scope.gridApi.saveState) {
              gridApi.colResizable.on.columnSizeChanged($scope, function(colDef, deltaChange) {
                var gridHeader;
                if (!$scope.restore) {
                  gridHeader = {};
                  gridHeader = $scope.gridApi.saveState.save();
                  if (gridHeader.selection) {
                    gridHeader.selection = [];
                  }
                  return localStorage.setItem("ui_grid_header_file", JSON.stringify(gridHeader));
                }
              });
            }
            return $scope.cancelSelect = function(row) {
              if (gridApi.selection) {
                if (gridApi.selection.getSelectedRows().length === 1 && gridApi.selection.getSelectedRows()[0] === row) {
                  gridApi.selection.clearSelectedRows();
                } else if (gridApi.selection.getSelectedRows().length === 1 && gridApi.selection.getSelectedRows()[0] !== row) {
                  gridApi.selection.clearSelectedRows();
                  gridApi.selection.selectRow(row);
                } else if (gridApi.selection.getSelectedRows().length < 1) {
                  gridApi.selection.selectRow(row);
                } else if (gridApi.selection.getSelectedRows().length > 1) {
                  gridApi.selection.clearSelectedRows();
                  gridApi.selection.selectRow(row);
                }
              }
            };
          }
        };
      };
      getList = function(info) {
        var deferred;
        deferred = $q.defer();
        info.accessUser = hsAuth.getAccessKey();
        info.accessToken = hsAuth.getAccessToken();
        info.parentId = info.objectId;
        $scope.vm.afterLoad = false;
        $scope.gridOptions.data = [];
        Restangular.one(hsAPI[listUrl]).get(info).then(function(res) {
          switch (res.code) {
            case '1':
              $scope.vm.afterLoad = true;
              deferred.resolve(res);
              $scope.gridOptions.data = res.data.resultSet;
              $scope.gridOptions.totalItems = Number(res.data.pageInfo.totalCount);
              return $scope.gridOptions.currentPage = Number(res.data.pageInfo.currentPage);
            case '10005':
              $scope.vm.afterLoad = true;
              deferred.resolve(res);
              $scope.gridOptions.data = [];
              return $scope.gridOptions.totalItems = 0;
            default:
              return deferred.reject(res.message);
          }
        }, function(res) {
          $log.info(res);
          return deferred.reject('项目信息查询：系统错误，请稍候再试');
        });
        return deferred.promise;
      };
      this.getList = getList;
      this.getScope = getScope;
      this.getGrid = getGrid;
    }
  ]);

}).call(this);
