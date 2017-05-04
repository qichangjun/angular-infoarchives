(function() {
  'use strict';
  angular.module("myApp").controller("serviceWatchController", [
    '$scope', '$log', '$state', 'mdDialogService', '$timeout', '$mdToast', 'JobRestangular', 'serviceWatchService', 'batchService', 'hsTpl', '$interval', function($scope, $log, $state, mdDialogService, $timeout, $mdToast, JobRestangular, serviceWatchService, batchService, hsTpl, $interval) {
      var checkMission, getList, init, loadRate, startService, stopService, vm;
      vm = this;
      vm.gridOptions = {};
      loadRate = null;
      init = function() {
        getList();
      };
      getList = function() {
        return serviceWatchService.getList().then(function(res) {
          var i, j, len, ref, results, rows, str;
          vm.gridOptions.data = res.data;
          ref = vm.gridOptions.data;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            str = Date.parse(new Date()).toString();
            rows.keepTime = (str - rows.startDate) / 1000;
            rows.keepDay = Math.floor(rows.keepTime / 86400);
            rows.keepHour = Math.floor(rows.keepTime % 86400 / 3600);
            results.push(rows.keepMinute = Math.floor(rows.keepTime % 86400 % 3600 / 60));
          }
          return results;
        }, function(res) {});
      };
      startService = function(row, e) {
        e.stopPropagation();
        if (row.jobStatus === 'PAUSED') {
          row.isChanging = true;
          return serviceWatchService.startService(row.id).then(function(res) {
            row.isChanging = false;
            getList();
          }, function(res) {
            row.isChanging = false;
          });
        }
      };
      stopService = function(row, e) {
        e.stopPropagation();
        if (row.jobStatus !== 'PAUSED') {
          row.isChanging = true;
          return serviceWatchService.stopService(row.id).then(function(res) {
            row.isChanging = false;
            getList();
          }, function(res) {
            row.isChanging = false;
          });
        }
      };
      checkMission = function(row, e) {
        var parameter;
        $interval.cancel(row.getRate);
        $scope.$on("$destroy", function() {
          return $interval.cancel(row.getRate);
        });
        if (row.jobName === 'ERMS导入服务') {
          serviceWatchService.getErmsMissionList().then(function(res) {
            return row.ermsLists = [res];
          });
          return;
          row.getRate = $interval(function() {
            if (!row.showMission) {
              $interval.cancel(row.getRate);
              return;
            }
            return serviceWatchService.getErmsMissionList().then(function(res) {
              return row.ermsLists = [res];
            }, function(res) {});
          }, 5000, 0);
        } else if (row.jobName !== 'ERMS导入服务') {
          if (row.jobName === 'AIP封装') {
            parameter = {
              batch_status: 4
            };
          } else if (row.jobName === 'AIU封装') {
            parameter = {
              batch_status: 0
            };
          } else if (row.jobName === 'SIP封装') {
            parameter = {
              batch_status: 2
            };
          }
          batchService.getGridData(parameter).then(function(res) {
            row.missionList = res.content;
            row.missionList.aipCount = row.missionList.aipCount || 0;
            row.missionList.aiu2sipSuccessCount = row.missionList.aiu2sipSuccessCount || 0;
            row.missionList.packageCount = row.missionList.packageCount || 0;
            row.missionList.aiuCount = row.missionList.aiuCount || 0;
            if (row.missionList.batchStatus === 4) {
              return row.missionList.progress = (row.missionList.aipCount / row.missionList.aiu2sipSuccessCount) * 100;
            } else if (row.missionList.batchStatus === 0) {
              return row.missionList.progress = (row.missionList.aiuCount / row.missionList.packageCount) * 100;
            } else if (row.missionList.batchStatus === 2) {
              return row.missionList.progress = (row.missionList.aiu2sipSuccessCount / row.missionList.aiuCount) * 100;
            }
          }, function(res) {});
          row.getRate = $interval(function() {
            if (!row.showMission) {
              $interval.cancel(row.getRate);
              return;
            }
            return batchService.getGridData(parameter).then(function(res) {
              row.missionList = res.content;
              row.missionList.aipCount = row.missionList.aipCount || 0;
              row.missionList.aiu2sipSuccessCount = row.missionList.aiu2sipSuccessCount || 0;
              row.missionList.packageCount = row.missionList.packageCount || 0;
              row.missionList.aiuCount = row.missionList.aiuCount || 0;
              if (row.missionList.batchStatus === 4) {
                return row.missionList.progress = (row.missionList.aipCount / row.missionList.aiu2sipSuccessCount) * 100;
              } else if (row.missionList.batchStatus === 0) {
                return row.missionList.progress = (row.missionList.aiuCount / row.missionList.packageCount) * 100;
              } else if (row.missionList.batchStatus === 2) {
                return row.missionList.progress = (row.missionList.aiu2sipSuccessCount / row.missionList.aiuCount) * 100;
              }
            }, function(res) {});
          }, 5000, 0);
        } else {
          console.error('未知的jobName:' + row.jobName);
        }
      };
      vm.checkMission = checkMission;
      vm.stopService = stopService;
      vm.startService = startService;
      init();
    }
  ]);

}).call(this);
