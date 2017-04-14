(function() {
  'use strict';
  angular.module("myApp").run([
    '$templateCache', function($templateCache) {
      $templateCache.put('ui-grid/pagination', "<div role=\"contentinfo\" class=\"ui-grid-pager-panel\" ui-grid-pager ng-show=\"grid.options.enablePaginationControls\">" + "<div role=\"navigation\" style=\"float:right;margint-bor\" class=\"ui-grid-pager-container\">" + "<div role=\"menubar\" class=\"ui-grid-pager-control \">" + "<ul uib-pagination boundary-links=\"true\"  total-items=\"grid.options.totalItems\"  max-size=\"5\" items-per-page=\"50\" ng-model=\"grid.options.paginationCurrentPage\" class=\"pagination-sm\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\">" + "</ul>", "</div>" + "</div>" + "</div>");
      $templateCache.put('ui-grid/selectionRowHeaderButtons', "<div class=\"ui-grid-selection-row-header-buttons \" ng-class=\"{'ui-grid-row-selected': row.isSelected}\" >" + "<md-checkbox style=\"margin: 0; vertical-align: middle\" class=\"md-primary\" ng-model=\"row.isSelected\" ng-click=\"selectButtonClick(row, $event);row.isSelected=!row.isSelected\"> </md-checkbox> &nbsp; </div>");
      return $templateCache.put('ui-grid/selectionSelectAllButtons', "<div class=\"ui-grid-selection-row-header-buttons \" ng-class=\"{'ui-grid-all-selected': grid.selection.selectAll}\" ng-if=\"grid.options.enableSelectAll\"> <md-checkbox style=\"margin: 0; vertical-align: middle\" type=\"checkbox\" class=\"md-primary\" ng-model=\"grid.selection.selectAll\" ng-click=\"headerButtonClick($event);grid.selection.selectAll=!grid.selection.selectAll\"> </md-checkbox> </div>");
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
  ]);

}).call(this);
