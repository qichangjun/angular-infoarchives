(function() {
  angular.module("myApp").factory('hsAuth', [
    '$log', 'Cookies', function($log, Cookies) {
      var _user, getAccessKey, getAccessToken, getUser, isLogin, removeUser, service, setUser;
      _user = Cookies.getJSON('hs_dmportal_current_user');
      isLogin = function() {
        if (_user) {
          return true;
        } else {
          return false;
        }
      };
      getAccessKey = function() {
        return _user.accessKey;
      };
      getAccessToken = function() {
        return _user.accessToken;
      };
      getUser = function() {
        return Cookies.getJSON('hs_dmportal_current_user');
      };
      setUser = function(user, para) {
        para = para || {};
        Cookies.set('hs_dmportal_current_user', user, para);
        return _user = Cookies.getJSON('hs_dmportal_current_user');
      };
      removeUser = function() {
        return Cookies.remove('hs_dmportal_current_user');
      };
      return service = {
        setUser: setUser,
        isLogin: isLogin,
        getAccessKey: getAccessKey,
        getAccessToken: getAccessToken,
        getUser: getUser,
        removeUser: removeUser
      };
    }
  ]);

}).call(this);
