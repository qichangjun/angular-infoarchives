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
              title: 'MODULES_STATISTICS_DATA_STATISTICS',
              url: 'infoArchives.statistics',
              img: 'fa fa-bar-chart'
            }, {
              title: 'PROJECT_CONNECTMAP_CONNECTION_TOPOLOGY',
              url: 'infoArchives.connectMap',
              img: 'fa fa-code-fork'
            }
          ],
          data: [
            {
              title: 'MODULES_SERVICEWATCH_DATA_BATCH',
              url: 'infoArchives.batch',
              img: 'fa fa-truck'
            }, {
              title: 'MODULES_DATABASE_DATA_BASE',
              url: 'infoArchives.dataBase',
              img: 'fa fa-database'
            }
          ],
          fileItem: [
            {
              title: 'MODULES_PROJECTMANAGE_SYSTEM_ACCESS',
              url: 'infoArchives.projectManage',
              img: 'fa fa-flag-checkered',
              childRoute: ['infoArchives.projectEdit.basicData', 'infoArchives.projectEdit.ruleSet', 'infoArchives.projectEdit.dataModule', 'infoArchives.projectEdit.moduleTemplate']
            }
          ],
          other: [
            {
              title: 'MODULES_SERVICEWATCH_SERVICE_MONITORING',
              url: 'infoArchives.serviceWatch',
              img: 'fa fa-server'
            }, {
              title: 'MODULES_USERMANAGE_SYSTEM_SETTINGS',
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
