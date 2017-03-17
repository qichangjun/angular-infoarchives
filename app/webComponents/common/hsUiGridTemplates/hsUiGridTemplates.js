(function() {
  'use strict';
  angular.module("myApp").service("hsUiGridTemplates", [
    'hsTpl', function(hsTpl) {
      var dataBase, dataError;
      dataBase = [
        {
          name: 'SipId',
          headerCellFilter: 'translate',
          displayName: '批次号',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <input ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.sip" class="grid-search-input form-control single--attribute--box__input"> </div>'
        }, {
          name: 'dataPath',
          headerCellFilter: 'translate',
          displayName: '数据位置',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <input  ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.dataPath" class="grid-search-input form-control single--attribute--box__input"> </div>'
        }, {
          name: 'dataSize',
          headerCellFilter: 'translate',
          displayName: '数据大小',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <input   ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.dataSize" class="grid-search-input form-control single--attribute--box__input"> </div>'
        }, {
          name: 'startData',
          headerCellFilter: 'translate',
          displayName: '开始事件',
          minWidth: 50,
          cellTemplate: hsTpl.hsCellTemplate,
          filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> <input  ng-change="grid.appScope.vm.search()" ng-model="grid.appScope.vm.parameter.startData" class="grid-search-input form-control single--attribute--box__input"> </div>'
        }
      ];
      dataError = [
        {
          name: 'status',
          headerCellFilter: 'translate',
          displayName: '状态',
          width: 50,
          cellTemplate: 'webComponents/common/hsTemplates/doc/dataError/grid-dataError-status.html'
        }, {
          name: 'startData',
          headerCellFilter: 'translate',
          displayName: '事件区间',
          minWidth: 50,
          cellTemplate: 'webComponents/common/hsTemplates/doc/dataError/grid-dataError-date.html'
        }, {
          name: 'YWID',
          headerCellFilter: 'translate',
          displayName: '业务',
          minWidth: 50,
          cellTemplate: 'webComponents/common/hsTemplates/doc/dataError/grid-dataError-YW.html'
        }, {
          name: 'AIUAmount',
          headerCellFilter: 'translate',
          displayName: 'AIU',
          minWidth: 50,
          cellTemplate: 'webComponents/common/hsTemplates/doc/dataError/grid-dataError-AIU.html'
        }, {
          name: 'AIPswitch',
          headerCellFilter: 'translate',
          displayName: 'AIP',
          minWidth: 50,
          cellTemplate: 'webComponents/common/hsTemplates/doc/dataError/grid-dataError-AIP.html'
        }, {
          name: 'operation',
          headerCellFilter: 'translate',
          displayName: 'operation',
          minWidth: 50,
          cellTemplate: 'webComponents/common/hsTemplates/doc/dataError/grid-dataError-operation.html'
        }
      ];
      this.dataError = dataError;
      this.dataBase = dataBase;
    }
  ]);

}).call(this);
