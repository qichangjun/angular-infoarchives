(function() {
  'use strict';
  angular.module("myApp").config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
      if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
      }
      $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
      $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
      $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
      $locationProvider.hashPrefix('!');
      $stateProvider.state("login", {
        url: "/login",
        templateUrl: "modules/login/login.html?" + window.hsConfig.bust,
        controller: "loginController",
        controllerAs: "vm",
        data: {
          access_level: 1
        }
      }).state("previewRecord", {
        url: "/previewRecord?templateId&recordId&businessCode&name",
        templateUrl: "modules/previewRecord/previewRecord.html?" + window.hsConfig.bust,
        controller: "previewRecordController",
        controllerAs: "vm",
        data: {
          access_level: 1
        }
      }).state("infoArchives", {
        url: "/",
        views: {
          '': {
            templateUrl: "modules/main/infoArchives.html?" + window.hsConfig.bust,
            controller: "infoArchivesController",
            controllerAs: "vm"
          }
        },
        data: {
          access_level: 2
        }
      }).state("infoArchives.connectMap", {
        url: "connectMap",
        templateUrl: "modules/connectMap/connectMap.html?" + window.hsConfig.bust,
        controller: "connectMapController",
        controllerAs: "vm",
        data: {
          access_level: 2
        }
      }).state("infoArchives.statistics", {
        url: "statistics?year&systemName&unit",
        templateUrl: "modules/statistics/statistics.html?" + window.hsConfig.bust,
        controller: "statisticsController",
        controllerAs: "vm",
        data: {
          access_level: 2
        }
      }).state("infoArchives.dataBase", {
        url: "dataBase/:objectId?currentPage&dataPath&sip&dataSize&startData&dataError&chartType",
        templateUrl: "modules/dataBase/dataBase.html?" + window.hsConfig.bust,
        controller: "dataBaseController",
        controllerAs: "vm",
        data: {
          access_level: 2
        }
      }).state("infoArchives.batch", {
        url: "batch/:projectId?exception_handle_behavior&batch_status&start_date&end_date&currentPage&pageSize&sortWay&sortField",
        templateUrl: "modules/batch/batch.html?" + window.hsConfig.bust,
        controller: "batchController",
        controllerAs: "vm",
        data: {
          access_level: 2
        }
      }).state("infoArchives.projectManage", {
        url: "projectManage",
        templateUrl: "modules/projectManage/projectManage.html?" + window.hsConfig.bust,
        controller: "projectManageController",
        controllerAs: "vm",
        data: {
          access_level: 2
        }
      }).state("infoArchives.projectEdit", {
        url: "projectEdit/",
        templateUrl: "modules/projectManage/projectEdit/projectEdit.html?" + window.hsConfig.bust,
        controller: "projectEditController",
        controllerAs: "vm",
        data: {
          access_level: 2
        }
      }).state("infoArchives.projectEdit.moduleTemplate", {
        url: "moduleTemplate/:objectId?templateId",
        templateUrl: "modules/projectManage/projectEdit/moduleTemplate/moduleTemplate.html?" + window.hsConfig.bust,
        controller: "moduleTemplateController",
        controllerAs: "vm",
        data: {
          access_level: 3
        }
      }).state("infoArchives.projectEdit.basicData", {
        url: "basicData/:objectId",
        templateUrl: "modules/projectManage/projectEdit/basicData/basicData.html?" + window.hsConfig.bust,
        controller: "basicDataController",
        controllerAs: "vm",
        data: {
          access_level: 3
        }
      }).state("infoArchives.projectEdit.ruleSet", {
        url: "ruleSet/:objectId",
        templateUrl: "modules/projectManage/projectEdit/ruleSet/ruleSet.html?" + window.hsConfig.bust,
        controller: "ruleSetController",
        controllerAs: "vm",
        data: {
          access_level: 3
        }
      }).state("infoArchives.projectEdit.dataModule", {
        url: "dataModule/:objectId?create",
        templateUrl: "modules/projectManage/projectEdit/dataModule/dataModule.html?" + window.hsConfig.bust,
        controller: "dataModuleController",
        controllerAs: "vm",
        data: {
          access_level: 3
        }
      }).state("infoArchives.serviceWatch", {
        url: "serviceWatch",
        templateUrl: "modules/serviceWatch/serviceWatch.html?" + window.hsConfig.bust,
        controller: "serviceWatchController",
        controllerAs: "vm",
        data: {
          access_level: 2
        }
      }).state("infoArchives.userManage", {
        url: "userManage",
        templateUrl: "modules/userManage/userManage.html?" + window.hsConfig.bust,
        controller: "userManageController",
        controllerAs: "vm",
        data: {
          access_level: 2
        }
      });
      return $urlRouterProvider.when('', [
        '$injector', function($injector) {
          var state;
          state = $injector.get('$state');
          return state.go('infoArchives.dataBase');
        }
      ]).otherwise(function($injector, $location) {
        var state;
        state = $injector.get('$state');
        state.go('infoArchives.dataBase');
        return $location.path();
      });
    }
  ]);

}).call(this);
