(function() {
  'use strict';
  angular.module("myApp").controller("infoArchivesController", [
    '$scope', '$log', 'infoArchivesService', '$state', '$timeout', 'loginService', 'mdToastService', '$translate', 'Cookies', function($scope, $log, infoArchivesService, $state, $timeout, loginService, mdToastService, $translate, Cookies) {
      var changeLanguage, changeRoute, init, loginOut, vm;
      vm = this;
      vm.currentsState = $state.current.name;
      init = function() {
        vm.language = Cookies.get('hs_swap_NG_TRANSLATE_LANG_KEY');
        vm.navList = infoArchivesService.getSideBarList();
        $translate.use(vm.language);
      };
      changeRoute = function(url) {
        $state.go(url);
        return vm.currentsState = url;
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
