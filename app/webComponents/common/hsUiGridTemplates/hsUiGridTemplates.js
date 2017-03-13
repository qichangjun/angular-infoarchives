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
          minWidth: 150,
          cellTemplate: hsTpl.hsCellTemplate,
          editableCellTemplate: hsTpl.hsEditableCellTemplate
        }, {
          name: 'dataPath',
          headerCellFilter: 'translate',
          displayName: '数据位置',
          minWidth: 150,
          cellTemplate: hsTpl.hsCellTemplate,
          editableCellTemplate: hsTpl.hsEditableCellTemplate
        }, {
          name: 'dataSize',
          headerCellFilter: 'translate',
          displayName: '数据大小',
          minWidth: 150,
          cellTemplate: hsTpl.hsCellTemplate,
          editableCellTemplate: hsTpl.hsEditableCellTemplate
        }, {
          name: 'startData',
          headerCellFilter: 'translate',
          displayName: '开始事件',
          minWidth: 350,
          cellTemplate: hsTpl.hsCellTemplate,
          editableCellTemplate: hsTpl.hsEditableCellTemplate
        }
      ];
      this.dataBase = dataBase;
    }
  ]);

}).call(this);
