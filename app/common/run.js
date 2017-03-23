(function() {
  'use strict';
  angular.module("myApp").run([
    '$templateCache', function($templateCache) {
      return $templateCache.put('ui-grid/pagination', "<div role=\"contentinfo\" class=\"ui-grid-pager-panel\" ui-grid-pager ng-show=\"grid.options.enablePaginationControls\">" + "<div role=\"navigation\" style=\"float:right;margint-bor\" class=\"ui-grid-pager-container\">" + "<div role=\"menubar\" class=\"ui-grid-pager-control \">" + "<ul uib-pagination boundary-links=\"true\"  total-items=\"grid.options.totalItems\" items-per-page=\"50\" ng-model=\"grid.options.paginationCurrentPage\" class=\"pagination-sm\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\">" + "</ul>", "</div>" + "</div>" + "</div>");
    }
  ]).run([
    'hsAuth', '$rootScope', '$location', function(hsAuth, $rootScope, $location) {
      return $rootScope.$on('$stateChangeStart', function(evt, next, curr) {
        if (next.data.access_level !== 1) {
          if (!hsAuth.isLogin()) {
            return $location.path('/login');
          }
        }
      });
    }
  ]).run([
    'editableOptions', 'editableThemes', function(editableOptions, editableThemes) {
      editableOptions.theme = 'default';
      editableThemes['default'].submitTpl = '<button type="submit" class="btn btn-primary">确定</button>';
      return editableThemes['default'].cancelTpl = '<button type="button" class="btn btn-default" ng-click="$form.$cancel()" >取消</button>';
    }
  ]);

}).call(this);
