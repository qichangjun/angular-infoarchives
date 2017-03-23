(function() {
  'use strict';
  angular.module("myApp").factory('languageStorage', [
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
