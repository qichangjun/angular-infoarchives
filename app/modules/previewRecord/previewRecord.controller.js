(function() {
  'use strict';
  angular.module("myApp").controller('previewRecordController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'dataBaseService', 'moduleTemplateService', 'mdDialogService', 'previewRecordService', function($scope, $log, $stateParams, $mdDialog, dataBaseService, moduleTemplateService, mdDialogService, previewRecordService) {
      var PAHT_OF_TEMPLATE_MDDIALOG, cancel, getJsonData, getShowTemplate, goToPreview, init, initProcess, showProcessDetail, vm;
      vm = this;
      vm.parameter = $stateParams;
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/dataBase/template/mdDialog/';
      vm.testWord = '浙江省收件凭证.pdf';
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
                    console.log(items.value);
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
              initProcess();
            }
            return console.log($scope.data);
          }
        }, function(res) {});
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      showProcessDetail = function(info) {
        return mdDialogService.initCustomDialog('showProcessDetailController', PAHT_OF_TEMPLATE_MDDIALOG + 'showProcessDetail.html?' + window.hsConfig.bust, event, {
          templateId: vm.parameter.templateId,
          recordCode: vm.parameter.recordId,
          info: info
        }).then(function(res) {}, function(res) {});
      };
      goToPreview = function(url) {
        return mdDialogService.initCustomDialog('previewFileController', PAHT_OF_TEMPLATE_MDDIALOG + 'previewFile.html?' + window.hsConfig.bust, event, {
          recordCode: vm.parameter.recordId,
          url: url
        }).then(function(res) {}, function(res) {});
      };
      vm.goToPreview = goToPreview;
      vm.showProcessDetail = showProcessDetail;
      vm.cancel = cancel;
      init();
    }
  ]).controller('showProcessDetailController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'dataBaseService', 'info', 'dataModuleService', 'templateId', 'recordCode', 'mdDialogService', function($scope, $log, $stateParams, $mdDialog, dataBaseService, info, dataModuleService, templateId, recordCode, mdDialogService) {
      var PAHT_OF_TEMPLATE_MDDIALOG, cancel, getBlock, getModuleInfo, goToPreview, init, vm;
      vm = this;
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/dataBase/template/mdDialog/';
      init = function() {
        vm.entity = info;
        vm.blockLists = [];
        getBlock(info);
        getModuleInfo();
      };
      getModuleInfo = function() {
        return dataModuleService.getModuleInfo(templateId).then(function(res) {
          var attrRules, i, j, len, property, ref, results, rows;
          ref = vm.blockLists;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.property) {
              results.push((function() {
                var k, len1, ref1, results1;
                ref1 = rows.property;
                results1 = [];
                for (k = 0, len1 = ref1.length; k < len1; k++) {
                  property = ref1[k];
                  results1.push((function() {
                    var l, len2, ref2, results2;
                    ref2 = res.attrRules;
                    results2 = [];
                    for (l = 0, len2 = ref2.length; l < len2; l++) {
                      attrRules = ref2[l];
                      if (property.name === attrRules.attrName) {
                        property.attrNameZh = attrRules.attrNameZh;
                        results2.push(property.attrNameEn = attrRules.attrNameEn);
                      } else {
                        results2.push(void 0);
                      }
                    }
                    return results2;
                  })());
                }
                return results1;
              })());
            } else {
              results.push(void 0);
            }
          }
          return results;
        }, function(res) {});
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
      goToPreview = function(url) {
        return mdDialogService.initCustomDialog('previewFileController', PAHT_OF_TEMPLATE_MDDIALOG + 'previewFile.html?' + window.hsConfig.bust, event, {
          recordCode: recordCode,
          url: url
        }).then(function(res) {}, function(res) {});
      };
      vm.goToPreview = goToPreview;
      vm.cancel = cancel;
      init();
    }
  ]).controller('previewFileController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'previewRecordService', 'recordCode', 'url', '$sce', function($scope, $log, $stateParams, $mdDialog, previewRecordService, recordCode, url, $sce) {
      var cancel, getUrl, init, vm;
      vm = this;
      init = function() {
        getUrl();
      };
      getUrl = function() {
        return previewRecordService.getDocId(recordCode, url).then(function(res) {
          return vm.previewUrl = $sce.trustAsResourceUrl(window.hsConfig.filePreviewBaseUrl + res);
        }, function(res) {});
      };
      cancel = function() {
        return $mdDialog.cancel();
      };
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);
