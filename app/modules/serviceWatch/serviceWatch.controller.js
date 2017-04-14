(function() {
  'use strict';
  angular.module("myApp").controller("serviceWatchController", [
    '$scope', '$log', '$state', 'mdDialogService', '$timeout', '$mdToast', 'JobRestangular', 'serviceWatchService', 'batchService', 'hsTpl', '$interval', function($scope, $log, $state, mdDialogService, $timeout, $mdToast, JobRestangular, serviceWatchService, batchService, hsTpl, $interval) {
      var checkMission, getList, init, startService, stopService, vm;
      vm = this;
      vm.gridOptions = {};
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
            rows.keepMinute = Math.floor(rows.keepTime % 86400 / 3600);
            results.push(rows.missionList = []);
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
        var loadRate, parameter;
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
          return row.missionList = res.content;
        }, function(res) {});
        $interval.cancel(loadRate);
        $scope.$on("$destroy", function() {
          return $interval.cancel(loadRate);
        });
        return loadRate = $interval(function() {
          if (!row.showMission) {
            $interval.cancel(loadRate);
            return;
          }
          return batchService.getGridData(parameter).then(function(res) {
            return row.missionList = res.content;
          }, function(res) {});
        }, 5000, 0);
      };
      vm.checkMission = checkMission;
      vm.stopService = stopService;
      vm.startService = startService;
      init();
    }
  ]);

}).call(this);
