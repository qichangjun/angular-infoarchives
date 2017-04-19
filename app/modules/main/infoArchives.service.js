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
              title: '数据批次',
              url: 'infoArchives.batch',
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
              img: 'fa fa-flag-checkered',
              childRoute: ['infoArchives.projectEdit.basicData', 'infoArchives.projectEdit.ruleSet', 'infoArchives.projectEdit.dataModule', 'infoArchives.projectEdit.moduleTemplate']
            }
          ],
          other: [
            {
              title: '服务监控',
              url: 'infoArchives.serviceWatch',
              img: 'fa fa-server'
            }, {
              title: '系统设置',
              url: 'infoArchives.userManage',
              img: 'fa fa-cog'
            }
          ]
        };
        return lists;
      };
      this.getSideBarList = getSideBarList;
    }
  ]);

}).call(this);
