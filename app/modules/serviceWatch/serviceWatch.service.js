(function() {
  'use strict';
  angular.module("myApp").service("serviceWatchService", [
    '$log', '$q', '$timeout', '$mdToast', 'MockRestangular', 'hsAPI', 'mdToastService', 'hsAuth', 'JobRestangular', 'hsTpl', function($log, $q, $timeout, $mdToast, MockRestangular, hsAPI, mdToastService, hsAuth, JobRestangular, hsTpl) {
      var getErmsMissionList, getList, serviceList, startService, stopService;
      getList = function() {
        var deferred;
        deferred = $q.defer();
        JobRestangular.one(hsAPI['getServiceList']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          jobGroup: 2
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
          } else {
            deferred.reject(res);
            return mdToastService.showToast(res.message);
          }
        }, function(res) {
          deferred.reject(res);
          return mdToastService.showToast('服务器内部出错');
        });
        return deferred.promise;
      };
      startService = function(id) {
        var deferred;
        deferred = $q.defer();
        JobRestangular.one(hsAPI['startService']).withHttpConfig({
          ignoreLoadingBar: true
        }).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          id: id
        }).then(function(res) {
          if (res.code === '1') {
            deferred.resolve(res.data);
            return mdToastService.showToast(res.message);
          } else {
            deferred.reject(res);
            return mdToastService.showToast(res.message);
          }
        }, function(res) {
          deferred.reject(res);
          return mdToastService.showToast('服务器内部出错');
        });
        return deferred.promise;
      };
      stopService = function(id) {
        var deferred;
        deferred = $q.defer();
        JobRestangular.one(hsAPI['stopService']).withHttpConfig({
          ignoreLoadingBar: true
        }).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          id: id
        }).then(function(res) {
          if (res.code === '1') {
            deferred.resolve(res.data);
            return mdToastService.showToast(res.message);
          } else {
            deferred.reject(res);
            return mdToastService.showToast(res.message);
          }
        }, function(res) {
          deferred.reject(res);
          return mdToastService.showToast('服务器内部出错');
        });
        return deferred.promise;
      };
      serviceList = [
        {
          name: 'id',
          headerCellFilter: 'translate',
          displayName: 'ID',
          minWidth: 200,
          cellTemplate: 'modules/serviceWatch/template/ui-grid-template/grid-service-id.html'
        }, {
          name: 'jobName',
          headerCellFilter: 'translate',
          displayName: 'MODULES_SERVICEWATCH_JOB_NAME',
          minWidth: 200,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'glueRemark',
          headerCellFilter: 'translate',
          displayName: 'MODULES_SERVICEWATCH_DESCRIPTION',
          width: 150,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'startDate',
          headerCellFilter: 'translate',
          displayName: 'MODULES_SERVICEWATCH_START_TIME',
          minWidth: 150,
          cellTemplate: 'modules/serviceWatch/template/ui-grid-template/grid-service-startDate.html'
        }, {
          name: 'endDate',
          headerCellFilter: 'translate',
          displayName: 'MODULES_SERVICEWATCH_CONTINUOUS_RUNNING_TIME',
          minWidth: 150,
          cellTemplate: 'modules/serviceWatch/template/ui-grid-template/grid-service-keepTim.html'
        }, {
          name: 'aiuCount',
          headerCellFilter: 'translate',
          displayName: 'MODULES_SERVICEWATCH_CURRENT_STATE',
          minWidth: 100,
          cellTemplate: 'modules/serviceWatch/template/ui-grid-template/grid-service-status.html'
        }, {
          name: 'operation',
          headerCellFilter: 'translate',
          displayName: 'MODULES_SERVICEWATCH_OPERATION',
          minWidth: 60,
          cellTemplate: 'modules/serviceWatch/template/ui-grid-template/grid-service-operation.html'
        }
      ];
      getErmsMissionList = function() {
        var deferred;
        deferred = $q.defer();
        MockRestangular.one(hsAPI['getErmsMissionList']).withHttpConfig({
          ignoreLoadingBar: true
        }).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken()
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
          } else {
            deferred.reject(res);
            return mdToastService.showToast(res.message);
          }
        }, function(res) {
          deferred.reject(res);
          return mdToastService.showToast('服务器内部出错');
        });
        return deferred.promise;
      };
      this.getErmsMissionList = getErmsMissionList;
      this.stopService = stopService;
      this.startService = startService;
      this.serviceList = serviceList;
      this.getList = getList;
    }
  ]);

}).call(this);
