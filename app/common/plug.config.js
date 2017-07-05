(function() {
  'use strict';
  angular.module("myApp").config([
    '$logProvider', 'RestangularProvider', '$httpProvider', '$provide', 'hsTpl', function($logProvider, RestangularProvider, $httpProvider, $provide, hsTpl) {
      if (window.hsConfig.debugEnabled) {
        $logProvider.debugEnabled(true);
        return RestangularProvider.setBaseUrl(window.hsConfig.baseUrl);
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
        return RestangularProvider.setBaseUrl(window.hsConfig.baseUrl);
      }
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
      lang = Cookies.get('hs_swap_NG_TRANSLATE_LANG_KEY') || 'cn';
      console.log(lang);
      return $translateProvider.preferredLanguage(lang);
    }
  ]).config([
    '$mdDateLocaleProvider', 'cfpLoadingBarProvider', function($mdDateLocaleProvider, cfpLoadingBarProvider) {
      $mdDateLocaleProvider.months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
      $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
      $mdDateLocaleProvider.shortDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      return cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    }
  ]).config([
    'hsTpl', function(hsTpl) {
      hsTpl.hsCellTemplate = '<div class="hs-ui-grid-cell-contents "> <div ng-if="!row.entity.isCreate" class="hs-ui-grid-cell" title="{{COL_FIELD CUSTOM_FILTERS}}"> {{COL_FIELD CUSTOM_FILTERS}} </div> <div ng-if="row.entity.isCreate"> <input type="text" ng-model="MODEL_COL_FIELD" /> </div> </div>';
      return hsTpl.hsRowTemplate = '<div  ng-show="!row.entity.isCreate" ng-mouseenter="row.entity.isHover=true" ng-mouseleave="row.entity.isHover=false" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell hs-ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,\'select-hover-color\':row.entity.isHover}" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ng-dblclick="grid.appScope.vm.dbClick(row.entity,$event)" context-menu="grid.appScope.vm.selectRow(row.entity)" data-target="{{grid.appScope.vm.myMenu}}" ng-click="grid.appScope.cancelSelect(row.entity)" ui-grid-cell> </div> <div ng-show="row.entity.isCreate" ng-mouseenter="row.entity.isHover=true" ng-mouseleave="row.entity.isHover=false" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,\'select-hover-color\':row.entity.isHover }" role="{{col.isRowHeader ? \'rowheader\' :\'gridcell\'}}" ui-grid-cell-creating > </div>';
    }
  ]);

}).call(this);
