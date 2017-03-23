(function() {
  'use strict';
  angular.module("myApp").controller("loginController", [
    'loginService', '$timeout', '$state', 'hsAuth', 'mdToastService', 'Cookies', function(loginService, $timeout, $state, hsAuth, mdToastService, Cookies) {
      var init, login, vm;
      vm = this;
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
          mdToastService.showToast(res);
          Cookies.set('hs_swap_NG_TRANSLATE_LANG_KEY', user.language, {
            expires: 365
          });
          vm.loading = false;
          $state.go('infoArchives.dataBase');
        }, function(res) {
          mdToastService.showToast(res);
          vm.loading = false;
        });
      };
      vm.login = login;
      init();
    }
  ]);

}).call(this);
