(function() {
  'use strict';
  angular.module("myApp").service("loginService", [
    '$q', 'Restangular', 'hsAPI', 'Cookies', '$log', 'hsAuth', '$state', function($q, Restangular, hsAPI, Cookies, $log, hsAuth, $state) {
      var getCurrentUser, userLogin, userLogout;
      userLogin = function(c_user, cookiePara) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['userLogin']).get({
          username: c_user.loginName,
          password: c_user.password
        }).then(function(res) {
          var c_currentUser;
          $log.info('用户登录', res);
          if (res.code === '1') {
            c_currentUser = {
              accessKey: res.data.accessUser,
              accessToken: res.data.accessToken
            };
            hsAuth.setUser(c_currentUser, cookiePara);
            return deferred.resolve('用户登录：登录成功');
          } else {
            return deferred.reject(res.message);
          }
        }, function(res) {
          return deferred.reject('用户登录：系统错误，请稍候再试');
        });
        return deferred.promise;
      };
      userLogout = function() {
        var deferred;
        deferred = $q.defer();
        hsAuth.removeUser();
        $state.go('login');
        deferred.resolve('用户注销成功');
        return deferred.promise;
      };
      getCurrentUser = function() {
        var deferred;
        $log.info("getCurrentUser", hsAuth.getObjectId());
        deferred = $q.defer();
        Restangular.one(hsAPI['getCurrentUser']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken()
        }).then(function(res) {
          $log.info(res);
          switch (res.code) {
            case '1':
              return deferred.resolve(res.data);
            default:
              return deferred.reject(res.message);
          }
        }, function(res) {
          return deferred.reject('error' + res);
        });
        return deferred.promise;
      };
      this.userLogin = userLogin;
      this.userLogout = userLogout;
      this.getCurrentUser = getCurrentUser;
    }
  ]);

}).call(this);
