(function() {
  'use strict';
  angular.module('myApp', ['ngAnimate', 'ngTouch', 'ngSanitize', 'ui.router', 'pascalprecht.translate', 'restangular', 'ngLocale', 'ngMaterial', 'ui.grid', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav', 'ui.grid.pagination', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.moveColumns', 'ui.grid.resizeColumns', 'ui.grid.saveState', 'ui.grid.autoResize', 'ui.bootstrap', 'ngMessages', 'anim-in-out', 'ui.select']).constant('Cookies', Cookies).constant('_', _).constant('Base64', Base64).constant('hsTpl', {}).constant('commonConifg', {}).config([
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
        templateUrl: "webComponents/login/login.html?" + window.hsConfig.bust,
        controller: "loginController",
        controllerAs: "vm",
        data: {
          access_level: 1
        }
      }).state("infoArchives", {
        url: "/",
        views: {
          '': {
            templateUrl: "webComponents/infoArchives.html?" + window.hsConfig.bust,
            controller: "infoArchivesController",
            controllerAs: "vm"
          }
        },
        data: {
          access_level: 2
        }
      }).state("infoArchives.dataBase", {
        url: "dataBase/:objectId?currentPage",
        templateUrl: "webComponents/dataBase/dataBase.html?" + window.hsConfig.bust,
        controller: "dataBaseController",
        controllerAs: "vm",
        data: {
          access_level: 2
        }
      }).state("infoArchives.dataError", {
        url: "batch?systemSource&unit&dataType&dateFrom&dateTo&dataError&currentPage",
        templateUrl: "webComponents/dataError/dataError.html?" + window.hsConfig.bust,
        controller: "dataErrorController",
        controllerAs: "vm",
        data: {
          access_level: 2
        }
      }).state("infoArchives.projectManage", {
        url: "projectManage",
        templateUrl: "webComponents/projectManage/projectManage.html?" + window.hsConfig.bust,
        controller: "projectManageController",
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
  ]).config([
    '$logProvider', 'RestangularProvider', '$httpProvider', '$provide', 'hsTpl', function($logProvider, RestangularProvider, $httpProvider, $provide, hsTpl) {
      if (window.hsConfig.debugEnabled) {
        $logProvider.debugEnabled(true);
        RestangularProvider.setBaseUrl(window.hsConfig.baseUrl);
      } else {
        $logProvider.debugEnabled(false);
        $provide.decorator('$log', [
          '$delegate', function($delegate) {
            var origInfo, origLog;
            origInfo = $delegate.info;
            origLog = $delegate.log;
            $delegate.info = function() {
              if ($logProvider.debugEnabled()) {
                return origInfo.apply(null, arguments);
              }
            };
            $delegate.log = function() {
              if ($logProvider.debugEnabled()) {
                return origLog.apply(null, arguments);
              }
            };
            return $delegate;
          }
        ]);
        RestangularProvider.setBaseUrl(window.hsConfig.baseUrl);
      }
      RestangularProvider.setJsonp(true);
      return RestangularProvider.setDefaultRequestParams('jsonp', {
        callback: 'JSON_CALLBACK'
      });
    }
  ]).config([
    '$translateProvider', 'Cookies', function($translateProvider, Cookies) {
      var lang;
      $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.json'
      });
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
      $translateProvider.fallbackLanguage(['en', 'cn']);
      $translateProvider.useStorage('languageStorage');
      lang = Cookies.get('hs_swap_NG_TRANSLATE_LANG_KEY') || 'en';
      return $translateProvider.preferredLanguage(lang);
    }
  ]).config([
    '$mdDateLocaleProvider', function($mdDateLocaleProvider) {
      $mdDateLocaleProvider.months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
      $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
      return $mdDateLocaleProvider.shortDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    }
  ]).run([
    '$templateCache', function($templateCache) {
      return $templateCache.put('ui-grid/pagination', "<div role=\"contentinfo\" class=\"ui-grid-pager-panel\" ui-grid-pager ng-show=\"grid.options.enablePaginationControls\">" + "<div role=\"navigation\" style=\"float:right;margint-bor\" class=\"ui-grid-pager-container\">" + "<div role=\"menubar\" class=\"ui-grid-pager-control \">" + "<ul uib-pagination boundary-links=\"true\"  total-items=\"grid.options.totalItems\" items-per-page=\"50\" ng-model=\"grid.options.paginationCurrentPage\" class=\"pagination-sm\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\">" + "</ul>", "</div>" + "</div>" + "</div>");
    }
  ]).run([
    'hsAuth', '$rootScope', '$location', function(hsAuth, $rootScope, $location) {
      return $rootScope.$on('$stateChangeStart', function(evt, next, curr) {
        if (next.data.access_level !== 1) {
          if (!hsAuth.isLogin()) {
            return $location.path('/login');
          }
        }
      });
    }
  ]).factory('languageStorage', [
    'Cookies', function(Cookies) {
      return {
        put: function(name, value) {
          return Cookies.set('hs_swap_NG_TRANSLATE_LANG_KEY', value, {
            expires: 365
          });
        },
        get: function(name) {
          return Cookies.get('hs_swap_NG_TRANSLATE_LANG_KEY');
        }
      };
    }
  ]);

}).call(this);
