(function() {
  'use strict';
  angular.module("myApp").service("infoArchivesService", [
    '$log', function($log) {
      var getSideBarList;
      $log.info("infoArchivesService");
      getSideBarList = function() {
        var lists;
        lists = {
          state: [
            {
              title: '仪表板',
              url: 'infoArchives.dashBoard',
              img: 'fa fa-tachometer'
            }, {
              title: '连接拓扑',
              url: 'infoArchives.connectMap',
              img: 'fa fa-code-fork'
            }
          ],
          data: [
            {
              title: '批次查看',
              url: 'infoArchives.dataError',
              img: 'fa fa-truck'
            }, {
              title: '数据仓库',
              url: 'infoArchives.dataBase',
              img: 'fa fa-database'
            }
          ],
          fileItem: [
            {
              title: '项目管理',
              url: 'infoArchives.projectManage',
              img: 'glyphicon glyphicon-flag'
            }
          ]
        };
        return lists;
      };
      this.getSideBarList = getSideBarList;
    }
  ]);

}).call(this);
