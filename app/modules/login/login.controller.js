(function() {
  'use strict';
  angular.module("myApp").controller("loginController", [
    'loginService', '$timeout', '$state', 'hsAuth', 'mdToastService', 'Cookies', '$translate', function(loginService, $timeout, $state, hsAuth, mdToastService, Cookies, $translate) {
      var changeLanguage, init, login, vm;
      vm = this;
      vm.user = {};
      vm.user.language = $translate.use() || 'cn';
      init = function() {};
      login = function(user) {
        var cookiePara;
        if (vm.remember) {
          cookiePara = {
            expires: 7
          };
        } else {
          cookiePara = {};
        }
        vm.loading = true;
        return loginService.userLogin(user, cookiePara).then(function(res) {
          var url;
          mdToastService.showToast(res);
          Cookies.set('hs_swap_NG_TRANSLATE_LANG_KEY', user.language, {
            expires: 365
          });
          url = Cookies.getJSON('before_login_url');
          if (url) {
            window.location.href = url;
          } else {
            $state.go('infoArchives.dataBase');
          }
          vm.loading = false;
        }, function(res) {
          mdToastService.showToast(res);
          vm.loading = false;
        });
      };
      changeLanguage = function(language) {
        return $translate.use(language);
      };
      vm.changeLanguage = changeLanguage;
      vm.login = login;
      init();
    }
  ]);

}).call(this);
