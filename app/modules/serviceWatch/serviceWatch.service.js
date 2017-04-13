(function() {
  'use strict';
  angular.module("myApp").service("serviceWatchService", [
    '$log', '$q', '$timeout', '$mdToast', 'MockRestangular', 'hsAPI', 'mdToastService', 'hsAuth', 'JobRestangular', 'hsTpl', function($log, $q, $timeout, $mdToast, MockRestangular, hsAPI, mdToastService, hsAuth, JobRestangular, hsTpl) {
      var getList, serviceList, startService, stopService;
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
          displayName: 'JOB名称',
          minWidth: 100,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'glueRemark',
          headerCellFilter: 'translate',
          displayName: '描述',
          width: 50,
          cellTemplate: hsTpl.hsCellTemplate
        }, {
          name: 'startDate',
          headerCellFilter: 'translate',
          displayName: '启动时间',
          minWidth: 150,
          cellTemplate: 'modules/serviceWatch/template/ui-grid-template/grid-service-startDate.html'
        }, {
          name: 'endDate',
          headerCellFilter: 'translate',
          displayName: '持续运行时间',
          minWidth: 150,
          cellTemplate: 'modules/serviceWatch/template/ui-grid-template/grid-service-keepTim.html'
        }, {
          name: 'aiuCount',
          headerCellFilter: 'translate',
          displayName: '当前状态',
          minWidth: 50,
          cellTemplate: 'modules/serviceWatch/template/ui-grid-template/grid-service-status.html'
        }, {
          name: 'operation',
          headerCellFilter: 'translate',
          displayName: '操作',
          minWidth: 50,
          cellTemplate: 'modules/serviceWatch/template/ui-grid-template/grid-service-operation.html'
        }
      ];
      this.stopService = stopService;
      this.startService = startService;
      this.serviceList = serviceList;
      this.getList = getList;
    }
  ]);

}).call(this);
