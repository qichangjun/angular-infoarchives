(function() {
  'use strict';
  angular.module("myApp").service("hsUiGridTemplates", [
    'hsTpl', function(hsTpl) {
      var dataBase;
      dataBase = [
        {
          name: 'SipId',
          headerCellFilter: 'translate',
          displayName: '批次号',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <md-input-container> <label>按批次号搜索</label> <input ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.sip"> </md-input-container> </div>'
        }, {
          name: 'dataPath',
          headerCellFilter: 'translate',
          displayName: '数据位置',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <md-input-container> <label>数据位置</label> <input ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.dataPath"> </md-input-container> </div>'
        }, {
          name: 'dataSize',
          headerCellFilter: 'translate',
          displayName: '数据大小',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <md-input-container> <label>数据大小</label> <input ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.dataSize"> </md-input-container> </div>'
        }, {
          name: 'startData',
          headerCellFilter: 'translate',
          displayName: '开始事件',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <md-input-container> <label>开始事件</label> <input ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.startData"> </md-input-container> </div>'
        }
      ];
      this.dataBase = dataBase;
    }
  ]);

}).call(this);
