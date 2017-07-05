(function() {
  'use strict';
  angular.module("myApp").directive('commonUploadFile', [
    '$log', '$translate', '$rootScope', '$location', '$state', '$stateParams', 'Upload', 'hsAuth', 'hsAPI', 'mdToastService', function($log, $translate, $rootScope, $location, $state, $stateParams, Upload, hsAuth, hsAPI, mdToastService) {
      var ctrlFun, directive;
      ctrlFun = function($scope, $element, $attrs) {
        var init, vm;
        vm = this;
        $scope.$state = $state;
        $scope.files = [];
        $scope.uploadFiles = function(files, reUpload) {
          return angular.forEach(files, function(file) {
            file.upload = Upload.upload({
              url: window.hsConfig.adminBaseUrl + hsAPI['commonUpload'],
              data: {
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
              if (!reUpload) {
                $scope.files = $scope.files.concat(files);
              } else {
                $scope.files = files;
              }
              mdToastService.showToast(res.data.message);
              file.result = res.data;
              return file.status = 1;
            }, function(res) {
              mdToastService.showToast(res.data.message);
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
          showProcess: '=',
          files: '=',
          uploadUrl: '=',
          imgSrc: '='
        },
        templateUrl: 'common/directive/commonUploadFile/commonUploadFile.html?' + window.hsConfig.bust,
        controller: ['$scope', '$element', '$attrs', ctrlFun],
        controllerAs: 'vm'
      };
    }
  ]);

}).call(this);
