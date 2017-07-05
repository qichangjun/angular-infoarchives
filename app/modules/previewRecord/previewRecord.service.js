(function() {
  'use strict';
  angular.module("myApp").service("previewRecordService", [
    '$log', '$q', '$timeout', '$mdToast', 'MockRestangular', 'hsAPI', 'mdToastService', 'hsAuth', 'JobRestangular', 'hsTpl', 'Restangular', 'commonMethodSerivce', '$translate', function($log, $q, $timeout, $mdToast, MockRestangular, hsAPI, mdToastService, hsAuth, JobRestangular, hsTpl, Restangular, commonMethodSerivce, $translate) {
      var getDocId;
      getDocId = function(recordCode, url) {
        var deferred;
        deferred = $q.defer();
        Restangular.one(hsAPI['getDocId']).get({
          accessToken: hsAuth.getAccessToken(),
          recordCode: recordCode,
          url: url
        }).then(function(res) {
          if (res.code === '1') {
            return deferred.resolve(res.data);
          } else if (res.code === '0') {
            mdToastService.showToast(res.message);
            return commonMethodSerivce.logOut();
          } else {
            deferred.reject(res);
            return mdToastService.showToast(res.message);
          }
        }, function(res) {
          deferred.reject(res);
          return mdToastService.showToast($translate.instant('MODULES_SHOWTOAST_SERVER_ERROR'));
        });
        return deferred.promise;
      };
      this.getDocId = getDocId;
    }
  ]);

}).call(this);
