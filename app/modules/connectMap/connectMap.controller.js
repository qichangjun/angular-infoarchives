(function() {
  'use strict';
  angular.module("myApp").controller("connectMapController", [
    '$scope', '$log', '$state', 'mdDialogService', '$timeout', '$mdToast', 'hsAuth', 'connectMapService', 'statisticsService', 'serviceWatchService', 'batchService', '$interval', 'commonMethodSerivce', '$filter', '$translate', 'projectManageService', function($scope, $log, $state, mdDialogService, $timeout, $mdToast, hsAuth, connectMapService, statisticsService, serviceWatchService, batchService, $interval, commonMethodSerivce, $filter, $translate, projectManageService) {
      var filterByte, getOverAll, getProjectList, getSystemInfo, init, listenEvent, vm;
      vm = this;
      vm.completeNum = 0;
      vm.unitNum = 11;
      vm.detailLists = [];
      $scope.data = {
        name: '',
        type: 'root',
        children: []
      };
      init = function() {
        getProjectList();
        listenEvent();
        return getOverAll();
      };
      getOverAll = function() {
        return statisticsService.getOverAll().then(function(res) {
          return vm.overAllInfo = res;
        }, function(res) {});
      };
      getProjectList = function() {
        return projectManageService.getProjectList().then(function(res) {
          var _resList, i, j, len, rows;
          _resList = res;
          vm.systemLength = _resList.length;
          for (i = j = 0, len = _resList.length; j < len; i = ++j) {
            rows = _resList[i];
            $scope.data.children.push({
              name: rows.projectName,
              type: 'unit',
              dataBase: rows.databaseName,
              id: rows.id
            });
          }
          vm.unitNum = $scope.data.children.length;
          return angular.forEach($scope.data.children, function(item) {
            return getSystemInfo(item.id);
          });
        }, function(res) {});
      };
      filterByte = function(bytes) {
        var i, k, sizes;
        if (bytes === 0 || !bytes) {
          return '0 B';
        }
        k = 1024;
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseInt(bytes / Math.pow(k, i)) + ' ' + sizes[i];
      };
      getSystemInfo = function(id) {
        return connectMapService.getSystemInfo(id).then(function(res) {
          var i, j, len, ref, rows;
          ref = $scope.data.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.id === id) {
              rows.children = [
                {
                  name: $translate.instant("PROJECT_CONNECTMAP_SYSTEM_DATABASE_TYPE") + '：' + rows.dataBase,
                  type: 'item',
                  detailType: 'dataBase',
                  detailInfo: res
                }, {
                  name: $translate.instant("PROJECT_CONNECTMAP_LATEST_UPDATE_TIME") + '：' + $filter('date')(res.latestUpdateDate, 'yyyy.MM.dd'),
                  type: 'item',
                  detailType: 'updateTime',
                  detailInfo: res
                }, {
                  name: $translate.instant("MODULES_DATABASE_ARCHIVED_DATA") + '：' + res.recordCount + '，' + filterByte(res.recordCapacity),
                  type: 'item',
                  detailType: 'recordNum',
                  detailInfo: res
                }
              ];
            }
          }
          return vm.completeNum++;
        }, function(res) {});
      };
      listenEvent = function() {
        $scope.$on('node:clickItem', function(e, d) {
          return $timeout(function() {
            var _height, _nameLists, _typeLists, item;
            _nameLists = (function() {
              var j, len, ref, results;
              ref = vm.detailLists;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                item = ref[j];
                results.push(item.name);
              }
              return results;
            })();
            _typeLists = (function() {
              var j, len, ref, results;
              ref = vm.detailLists;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                item = ref[j];
                results.push(item.type);
              }
              return results;
            })();
            if (d.detailType === 'dataBase' || d.detailType === 'recordNum') {
              _height = 43.5;
            } else {
              _height = 38;
            }
            vm.detailLists = [
              {
                x: d.x - _height,
                y: d.y + commonMethodSerivce.stringGetLength(d.name) * 9.5 + 450,
                name: d.parent.name,
                type: d.detailType,
                info: d.detailInfo
              }
            ];
          });
        });
        return $scope.$on('node:update', function(e, data) {
          return $timeout(function() {
            vm.detailLists = [];
          });
        });
      };
      init();
    }
  ]);

}).call(this);
