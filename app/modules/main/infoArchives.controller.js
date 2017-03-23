(function() {
  'use strict';
  angular.module("myApp").controller("infoArchivesController", [
    '$scope', '$log', 'infoArchivesService', '$state', '$timeout', 'loginService', 'mdToastService', '$translate', 'Cookies', '$locale', 'uibDatepickerPopupConfig', '$rootScope', function($scope, $log, infoArchivesService, $state, $timeout, loginService, mdToastService, $translate, Cookies, $locale, uibDatepickerPopupConfig, $rootScope) {
      var changeLanguage, changeRoute, init, loginOut, vm;
      vm = this;
      vm.currentsState = $state.current.name;
      $rootScope.$on('$stateChangeStart', function(evt, next, curr) {
        return vm.currentsState = next.name;
      });
      init = function() {
        var locales;
        locales = {
          zh: {
            "DATETIME_FORMATS": {
              "AMPMS": ["\u4e0a\u5348", "\u4e0b\u5348"],
              "DAY": ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
              "ERANAMES": ["\u516c\u5143\u524d", "\u516c\u5143"],
              "ERAS": ["\u516c\u5143\u524d", "\u516c\u5143"],
              "FIRSTDAYOFWEEK": 6,
              "MONTH": ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
              "SHORTDAY": ["\u5468\u65e5", "\u5468\u4e00", "\u5468\u4e8c", "\u5468\u4e09", "\u5468\u56db", "\u5468\u4e94", "\u5468\u516d"],
              "SHORTMONTH": ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
              "WEEKENDRANGE": [5, 6],
              "fullDate": "y\u5e74M\u6708d\u65e5EEEE",
              "longDate": "y\u5e74M\u6708d\u65e5",
              "medium": "y\u5e74M\u6708d\u65e5 ah:mm:ss",
              "mediumDate": "y\u5e74M\u6708d\u65e5",
              "mediumTime": "ah:mm:ss",
              "short": "yy/M/d ah:mm",
              "shortDate": "yy/M/d",
              "shortTime": "ah:mm"
            },
            "NUMBER_FORMATS": {
              "CURRENCY_SYM": "\u00a5",
              "DECIMAL_SEP": ".",
              "GROUP_SEP": ",",
              "PATTERNS": [
                {
                  "gSize": 3,
                  "lgSize": 3,
                  "maxFrac": 3,
                  "minFrac": 0,
                  "minInt": 1,
                  "negPre": "-",
                  "negSuf": "",
                  "posPre": "",
                  "posSuf": ""
                }, {
                  "gSize": 3,
                  "lgSize": 3,
                  "maxFrac": 2,
                  "minFrac": 2,
                  "minInt": 1,
                  "negPre": "-\u00a4\u00a0",
                  "negSuf": "",
                  "posPre": "\u00a4\u00a0",
                  "posSuf": ""
                }
              ]
            },
            "id": "zh-cn",
            "pluralCat": function(n, opt_precision) {
              return PLURAL_CATEGORY.OTHER;
            }
          }
        };
        angular.copy(locales['zh'], $locale);
        uibDatepickerPopupConfig.currentText = '今天';
        uibDatepickerPopupConfig.clearText = '清除';
        uibDatepickerPopupConfig.closeText = '确定';
        vm.language = Cookies.get('hs_swap_NG_TRANSLATE_LANG_KEY');
        vm.navList = infoArchivesService.getSideBarList();
        $translate.use(vm.language);
      };
      changeRoute = function(url) {
        return $state.go(url);
      };
      loginOut = function() {
        vm.loading = true;
        return loginService.userLogout().then(function(res) {
          vm.loading = false;
          mdToastService.showToast(res);
          return $state.go('login');
        }, function(res) {
          mdToastService.showToast(res);
          return vm.loading = false;
        });
      };
      changeLanguage = function() {
        return $translate.use(vm.language);
      };
      vm.changeLanguage = changeLanguage;
      vm.loginOut = loginOut;
      vm.changeRoute = changeRoute;
      init();
    }
  ]);

}).call(this);