(function() {
  'use strict';
  angular.module("myApp").directive('commonUploadFile', [
    '$log', '$translate', '$rootScope', '$location', '$state', '$stateParams', 'Upload', 'hsAuth', 'hsAPI', function($log, $translate, $rootScope, $location, $state, $stateParams, Upload, hsAuth, hsAPI) {
      var ctrlFun, directive;
      ctrlFun = function($scope, $element, $attrs) {
        var init, vm;
        vm = this;
        $scope.$state = $state;
        $scope.files = [];
        $scope.uploadFiles = function(files, reUpload) {
          if (!reUpload) {
            $scope.files = $scope.files.concat(files);
          }
          return angular.forEach(files, function(file) {
            file.upload = Upload.upload({
              url: window.hsConfig.baseUrl + hsAPI[$scope.uploadUrl],
              data: {
                accessUser: hsAuth.getAccessKey(),
                accessToken: hsAuth.getAccessToken(),
                file: file,
                name: file.name,
                type: file.type,
                lastModifiedDate: file.lastModifiedDate,
                size: file.size
              },
              ignoreLoadingBar: true
            });
            return file.upload.then(function(res) {
              file.result = res.data;
              return file.status = 1;
            }, function(res) {
              console.log(res);
              return file.status = 0;
            }, function(evt) {
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
              return file.status = 2;
            });
          });
        };
        init = function() {};
        init();
      };
      return directive = {
        restrict: 'AE',
        scope: {
          files: '=',
          uploadUrl: '='
        },
        templateUrl: 'common/directive/commonUploadFile/commonUploadFile.html?' + window.hsConfig.bust,
        controller: ['$scope', '$element', '$attrs', ctrlFun],
        controllerAs: 'vm'
      };
    }
  ]);

}).call(this);
