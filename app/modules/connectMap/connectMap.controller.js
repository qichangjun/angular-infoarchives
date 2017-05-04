(function() {
  'use strict';
  angular.module("myApp").controller("connectMapController", [
    '$scope', '$log', '$state', 'mdDialogService', '$timeout', '$mdToast', 'hsAuth', function($scope, $log, $state, mdDialogService, $timeout, $mdToast, hsAuth) {
      var init, listenEvent, vm;
      vm = this;
      vm.tiptool = {
        show: false,
        x: null,
        y: null,
        info: {}
      };
      init = function() {
        vm.detailInfos = [
          {
            id: 'S001-98500',
            job: 'SIP转换',
            keepTime: '330',
            status: '54%'
          }, {
            id: 'S001-98498',
            job: 'AIP转换',
            keepTime: '130',
            status: '100%'
          }
        ];
        $scope.data = {
          name: '',
          type: 'root',
          children: [
            {
              name: '行政审批系统',
              type: 'unit',
              children: [
                {
                  name: '对接方式:OSS',
                  type: 'item',
                  children: []
                }, {
                  name: '连接状态:正常',
                  type: 'item',
                  children: []
                }, {
                  name: '已归档数据量:10000件,35GB',
                  type: 'item',
                  children: []
                }, {
                  name: '当前JOB:查看',
                  type: 'item',
                  children: []
                }
              ]
            }, {
              name: '医学出生证明系统',
              type: 'unit',
              children: [
                {
                  name: '对接方式:OSS',
                  type: 'item',
                  children: []
                }, {
                  name: '连接状态:正常',
                  type: 'item',
                  children: []
                }, {
                  name: '已归档数据量:10000件,35GB',
                  type: 'item',
                  children: []
                }, {
                  name: '当前JOB:查看',
                  type: 'item',
                  children: []
                }
              ]
            }
          ]
        };
        return listenEvent();
      };
      listenEvent = function() {
        $scope.$on('node:mouseover', function(e, d) {
          return $timeout(function() {
            if (d.type === 'item' && d.name === '当前JOB:查看') {
              vm.tiptool.show = true;
              vm.tiptool.x = d.x;
              return vm.tiptool.y = d.y;
            }
          });
        });
        $scope.$on('node:mouseout', function(e, d) {
          return $timeout(function() {
            vm.tiptool.show = false;
            vm.tiptool.x = d.x;
            return vm.tiptool.y = d.y;
          });
        });
      };
      init();
    }
  ]);

}).call(this);
