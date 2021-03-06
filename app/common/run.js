// Generated by CoffeeScript 1.9.1
(function() {
  'use strict';
  angular.module("myApp").run([
    '$templateCache', function($templateCache) {
      $templateCache.put('ui-grid/pagination', "<div role=\"contentinfo\" class=\"ui-grid-pager-panel\" ui-grid-pager ng-show=\"grid.options.enablePaginationControls\">" + "<div role=\"navigation\" style=\"float:right;margint-bor\" class=\"ui-grid-pager-container\">" + "<div role=\"menubar\" class=\"ui-grid-pager-control \">" + "<ul uib-pagination boundary-links=\"true\"  total-items=\"grid.options.totalItems\"  max-size=\"5\" items-per-page=\"50\" ng-model=\"grid.options.paginationCurrentPage\" class=\"pagination-sm\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\">" + "</ul>", "</div>" + "</div>" + "</div>");
      $templateCache.put('ui-grid/selectionRowHeaderButtons', "<div  class=\"ui-grid-selection-row-header-buttons \" ng-class=\"{'ui-grid-row-selected': row.isSelected}\" >" + "<md-checkbox style=\"margin: 0; vertical-align: middle\" aria-label=\"Follow\" class=\"md-primary\" ng-model=\"row.isSelected\" ng-click=\"selectButtonClick(row, $event);row.isSelected=!row.isSelected\"> </md-checkbox> &nbsp; </div>");
      return $templateCache.put('ui-grid/selectionSelectAllButtons', "<div class=\"ui-grid-selection-row-header-buttons \" ng-class=\"{'ui-grid-all-selected': grid.selection.selectAll}\" ng-if=\"grid.options.enableSelectAll\"> <md-checkbox style=\"margin: 0; vertical-align: middle\"  aria-label=\"Follow\" class=\"md-primary\" ng-model=\"grid.selection.selectAll\" ng-click=\"headerButtonClick($event);grid.selection.selectAll=!grid.selection.selectAll\"> </md-checkbox> </div>");
    }
  ]).run([
    'hsAuth', '$rootScope', '$location', 'permissions', 'mdToastService', '$state', '$timeout', function(hsAuth, $rootScope, $location, permissions, mdToastService, $state, $timeout) {
      return $rootScope.$on('$stateChangeStart', function(evt, next, curr) {
        var key, permission, permissionLists, results;
        if (next.data.access_level !== 1) {
          if (!hsAuth.isLogin()) {
            if (next.name !== 'login') {
              Cookies.set('before_login_url', $location.$$absUrl);
              window.location.href = window.hsConfig.loginUrl;
              return evt.preventDefault();
            }
          } else {
            permission = next.permission;
            if (_.isString(permission) && !permissions.hasPermission(permission)) {
              mdToastService.showToast('用户没有无权限');
              permissionLists = hsAuth.getPermission();
              results = [];
              for (key in permissionLists) {
                if (permissionLists[key]) {
                  $timeout(function() {
                    if (key === 'userManage' || key === 'logManage') {
                      return window.location.href = 'http://' + window.location.host + '/admin/#!/' + key;
                    } else {
                      return $state.go('infoArchives.' + key);
                    }
                  });
                  break;
                } else {
                  results.push(void 0);
                }
              }
              return results;
            }
          }
        }
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=run.js.map
