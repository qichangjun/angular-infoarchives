(function() {
  'use strict';
  angular.module("myApp").controller("moduleTemplateController", [
    '$scope', '$log', '$state', '$timeout', '$stateParams', '$rootScope', 'mdDialogService', 'uuid', function($scope, $log, $state, $timeout, $stateParams, $rootScope, mdDialogService, uuid) {
      var PAHT_OF_TEMPLATE_MDDIALOG, addContainer, checkData, edtiStyle, init, openMenu, vm;
      vm = this;
      $scope.i = 0;
      PAHT_OF_TEMPLATE_MDDIALOG = 'modules/projectManage/projectEdit/moduleTemplate/template/mdDialog/';
      init = function() {
        var i;
        $scope.models = {
          selected: null,
          templates: [],
          lists: [
            {
              name: 'A',
              id: '32323232',
              data: [],
              style: {
                width: '400',
                height: '400',
                backgroundColor: '#fff'
              }
            }, {
              name: 'B',
              id: '4344232',
              data: [],
              style: {
                width: '200',
                height: '400',
                backgroundColor: '#fff'
              }
            }
          ]
        };
        i = 0;
        while (i < 50) {
          $scope.models.templates.push({
            type: "item",
            id: '属性' + i,
            style: {
              width: 150
            }
          });
          i++;
        }
      };
      checkData = function() {
        return console.log($scope.models.lists);
      };
      edtiStyle = function(info) {
        return mdDialogService.initCustomDialog('editStyleController', PAHT_OF_TEMPLATE_MDDIALOG + 'editStyle.html?' + window.hsConfig.bust, event, {
          info: info
        }).then(function(res) {
          if (res) {
            vm.projectLists.push(res);
          }
          return newProjectAlert();
        }, function(res) {});
      };
      openMenu = function($mdMenu, ev) {
        var originatorEv;
        originatorEv = ev;
        return $mdMenu.open(ev);
      };
      addContainer = function() {
        $scope.models.lists.push({
          name: $scope.i,
          id: uuid.v4(),
          data: [],
          style: {
            width: '400',
            height: '400',
            backgroundColor: '#fff'
          }
        });
        return $scope.i = $scope.i + 1;
      };
      $scope.$on("angular-resizable.resizeEnd", function(event, args) {
        return $timeout(function() {
          var i, j, len, ref, results, rows;
          ref = $scope.models.lists;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            if (rows.id.toString() === args.id.toString()) {
              if (args.width) {
                rows.style.width = args.width;
              }
              if (args.height) {
                results.push(rows.style.height = args.height);
              } else {
                results.push(void 0);
              }
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
      });
      vm.addContainer = addContainer;
      vm.openMenu = openMenu;
      vm.edtiStyle = edtiStyle;
      vm.checkData = checkData;
      init();
    }
  ]).controller('editStyleController', [
    '$scope', '$log', '$stateParams', '$mdDialog', 'info', function($scope, $log, $stateParams, $mdDialog, info) {
      var cancel, init, vm;
      vm = this;
      vm.entity = info.style;
      console.log(vm.entity);
      init = function() {};
      cancel = function() {
        return $mdDialog.cancel();
      };
      vm.cancel = cancel;
      init();
    }
  ]);

}).call(this);
