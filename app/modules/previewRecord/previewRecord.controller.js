(function() {
  'use strict';
  angular.module("myApp").controller('previewRecordController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'dataBaseService', 'moduleTemplateService', 'mdDialogService', function($scope, $log, $stateParams, $mdDialog, dataBaseService, moduleTemplateService, mdDialogService) {
      var PAHT_OF_TEMPLATE_MDDIALOG, cancel, getJsonData, getShowTemplate, init, initProcess, showProcessDetail, vm;
      vm = this;
      vm.parameter = $stateParams;
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/dataBase/template/mdDialog/';
      init = function() {
        getJsonData();
      };
      getJsonData = function() {
        return dataBaseService.getRecordJson(vm.parameter.recordId).then(function(res) {
          $scope.jsonData = res.jsonRecord;
          return getShowTemplate();
        }, function(res) {});
      };
      initProcess = function() {
        var i, j, len, ref, results, rows;
        ref = vm.processLists;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          rows = ref[i];
          if ((i + 1) % 5 === 1 && parseInt((i + 1) / 5) % 2 !== 0) {
            results.push(rows["class"] = '_last');
          } else if ((i + 1) % 5 === 1 && parseInt((i + 1) / 5) % 2 === 0) {
            results.push(rows["class"] = '_first');
          } else if ((((i + 1) % 5) === 0 && parseInt((i + 1) / 5) % 2 !== 0) || (i === vm.processLists.length - 1 && parseInt((i + 1) / 5) % 2 === 0)) {
            results.push(rows["class"] = 'last');
          } else if ((((i + 1) % 5) === 0 && parseInt((i + 1) / 5) % 2 === 0) || (i === vm.processLists.length - 1 && parseInt((i + 1) / 5) % 2 !== 0)) {
            results.push(rows["class"] = 'first');
          } else if (parseInt((i + 1) / 5) % 2 === 0) {
            results.push(rows["class"] = 'middle');
          } else {
            results.push(rows["class"] = '_middle');
          }
        }
        return results;
      };
      getShowTemplate = function() {
        return moduleTemplateService.getTemplate(vm.parameter.templateId).then(function(res) {
          var i, items, j, k, l, len, len1, len2, ref, ref1, ref2, rows, x;
          if (res) {
            $scope.data = JSON.parse(res.showTemplate);
            if ($scope.data) {
              ref = $scope.data;
              for (i = j = 0, len = ref.length; j < len; i = ++j) {
                rows = ref[i];
                if (rows.data && rows.data.length > 0) {
                  ref1 = rows.data;
                  for (x = k = 0, len1 = ref1.length; k < len1; x = ++k) {
                    items = ref1[x];
                    items.value = jsonPath($scope.jsonData, items.jsonPath);
                  }
                }
              }
            }
            vm.process_lists = jsonPath($scope.jsonData, '$..*.node');
            vm.processLists = [];
            if (vm.process_lists) {
              ref2 = vm.process_lists;
              for (i = l = 0, len2 = ref2.length; l < len2; i = ++l) {
                rows = ref2[i];
                if (rows instanceof Array) {
                  vm.processLists = vm.processLists.concat(rows);
                } else {
                  vm.processLists.push(rows);
                }
              }
              return initProcess();
            }
          }
        }, function(res) {});
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      showProcessDetail = function(info) {
        return mdDialogService.initCustomDialog('showProcessDetailController', PAHT_OF_TEMPLATE_MDDIALOG + 'showProcessDetail.html?' + window.hsConfig.bust, event, {
          info: info
        }).then(function(res) {}, function(res) {});
      };
      vm.showProcessDetail = showProcessDetail;
      vm.cancel = cancel;
      init();
    }
  ]).controller('showProcessDetailController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'dataBaseService', 'info', function($scope, $log, $stateParams, $mdDialog, dataBaseService, info) {
      var cancel, getBlock, init, vm;
      vm = this;
      init = function() {
        vm.entity = info;
        vm.blockLists = [];
        getBlock(info);
      };
      getBlock = function(_json) {
        var key, results;
        results = [];
        for (key in _json) {
          if (key === 'block') {
            if (!_json[key] instanceof Array) {
              vm.blockLists.push(_json[key]);
            } else {
              vm.blockLists = vm.blockLists.concat(_json[key]);
            }
            results.push(getBlock(_json[key]));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);
