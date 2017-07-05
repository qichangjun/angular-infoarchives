(function() {
  'use strict';
  angular.module("myApp").service("loginService", [
    '$q', 'Restangular', 'hsAPI', 'Cookies', '$log', 'hsAuth', '$state', 'adminRestangular', 'mdToastService', '$translate', function($q, Restangular, hsAPI, Cookies, $log, hsAuth, $state, adminRestangular, mdToastService, $translate) {
      var getCurrentUser, getUserInfo, userLogin, userLogout;
      userLogin = function(c_user, cookiePara) {
        var deferred;
        deferred = $q.defer();
        Restangular.all(hsAPI['userLogin']).post({
          username: c_user.loginName,
          password: c_user.password
        }).then(function(res) {
          var c_currentUser;
          $log.info('用户登录', res);
          if (res.code === '1') {
            c_currentUser = {
              accessKey: res.data,
              accessToken: res.data
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
        adminRestangular.one(hsAPI['userLogout']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken(),
          id: hsAuth.getUserId()
        }).then(function(res) {
          $log.info(res);
          switch (res.code) {
            case '1':
              deferred.resolve(res.data);
              return hsAuth.removeUser();
            default:
              return deferred.reject(res.message);
          }
        }, function(res) {
          return deferred.reject('error' + res);
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
      getUserInfo = function() {
        var deferred;
        deferred = $q.defer();
        adminRestangular.one(hsAPI['getUserId']).get({
          accessUser: hsAuth.getAccessKey(),
          accessToken: hsAuth.getAccessToken()
        }).then(function(res) {
          $log.info(res);
          switch (res.code) {
            case '1':
              return deferred.resolve(res.data);
            case '0':
              return mdToastService.showToast(res.message);
            default:
              mdToastService.showToast(res.message);
              return deferred.reject(res.message);
          }
        }, function(res) {
          mdToastService.showToast($translate.instant('MODULES_SHOWTOAST_SERVER_ERROR'));
          return deferred.reject('error' + res);
        });
        return deferred.promise;
      };
      this.getUserInfo = getUserInfo;
      this.userLogin = userLogin;
      this.userLogout = userLogout;
      this.getCurrentUser = getCurrentUser;
    }
  ]);

}).call(this);
