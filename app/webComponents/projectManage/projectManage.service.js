(function() {
  'use strict';
  angular.module("myApp").service("projectManageService", [
    '$log', '$q', '$timeout', '$mdToast', function($log, $q, $timeout, $mdToast) {
      var deleteProject, getDataBaseList, getProjectList, newProject;
      $log.info("projectManageService");
      getProjectList = function() {
        var deferred, res;
        deferred = $q.defer();
        res = {};
        res.data = [
          {
            name: '刑侦审批系统',
            createDate: '2017年01月23日创建',
            number: 11,
            dataBaseType: 'oracle',
            ruleType: '门类号',
            year: '2010',
            keepTime: '10年'
          }, {
            name: '医学出生证明系统',
            createDate: '2017年01月23日创建',
            number: 11,
            dataBaseType: 'oracle',
            ruleType: '门类号',
            year: '2010',
            keepTime: '10年'
          }
        ];
        deferred.resolve(res);
        return deferred.promise;
      };
      getDataBaseList = function() {
        var deferred, res;
        deferred = $q.defer();
        res = {};
        res.data = [
          {
            name: 'oracle',
            objectId: '1'
          }, {
            name: 'mySql',
            objectId: '2'
          }, {
            name: 'mongodb',
            objectId: '3'
          }
        ];
        return $timeout(function() {
          deferred.resolve(res);
          return deferred.promise;
        }, 1000);
      };
      newProject = function(parameter) {
        var deferred;
        console.log(parameter);
        deferred = $q.defer();
        return $timeout(function() {
          $mdToast.show($mdToast.simple().textContent('操作成功').position('top right').hideDelay(3000));
          deferred.resolve(true);
          return deferred.promise;
        }, 1000);
      };
      deleteProject = function(index) {
        var deferred;
        deferred = $q.defer();
        return $timeout(function() {
          var res;
          res = {};
          deferred.resolve(res);
          return deferred.promise;
        }, 1000);
      };
      this.deleteProject = deleteProject;
      this.newProject = newProject;
      this.getDataBaseList = getDataBaseList;
      this.getProjectList = getProjectList;
    }
  ]);

}).call(this);
