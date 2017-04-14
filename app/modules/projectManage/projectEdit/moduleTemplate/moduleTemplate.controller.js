// Generated by CoffeeScript 1.9.1
(function() {
  'use strict';
  angular.module("myApp").controller("moduleTemplateController", [
    '$scope', '$log', '$state', '$timeout', '$stateParams', '$rootScope', 'mdDialogService', function($scope, $log, $state, $timeout, $stateParams, $rootScope, mdDialogService) {
      var PAHT_OF_TEMPLATE_MDDIALOG, checkData, edtiStyle, init, openMenu, vm;
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
              data: [],
              style: {
                width: '400',
                height: '400',
                backgroundColor: '#fff'
              }
            }, {
              name: 'B',
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
        while (i < 10) {
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

//# sourceMappingURL=moduleTemplate.controller.js.map