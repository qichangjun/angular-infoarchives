(function() {
  'use strict';
  angular.module("myApp").service("loginService", [
    '$q', 'Restangular', 'hsAPI', 'Cookies', '$log', 'hsAuth', function($q, Restangular, hsAPI, Cookies, $log, hsAuth) {
      var getCurrentUser, userLogin, userLogout;
      userLogin = function(c_user, cookiePara) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['userLogin']).get({
          userLoginName: c_user.loginName,
          userPassword: c_user.password
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
        }, function(res) {
          return deferred.notify('用户登录：查询中，进度' + res);
        });
        return deferred.promise;
      };
      userLogout = function() {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['userLogout']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken()
        }).then(function(res) {
          $log.info('用户注销', res);
          if (res.code === '1') {
            hsAuth.removeUser();
            return deferred.resolve('用户注销成功');
          } else {
            return deferred.reject(res.message);
          }
        }, function(res) {
          return deferred.reject('用户注销：系统错误，请稍候再试');
        });
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
