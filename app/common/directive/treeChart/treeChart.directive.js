// Generated by CoffeeScript 1.9.1
(function() {
  var treeChart;

  treeChart = function($timeout) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div id="graph"></div>',
      scope: {
        nodes: '='
      },
      link: function(scope, element) {
        $timeout(function() {
          var chart, container;
          container = angular.element(document.querySelector('#tree-data-node-detail'));
          chart = d3.chart.architectureTree();
          scope.$watch('nodes', function(data) {
            if (typeof data === 'undefined') {
              return;
            }
            chart.diameter(960).data(scope.nodes);
            return d3.select(element[0]).call(chart);
          });
          return container.on('selectNode', function(e) {
            return scope.$emit('treeChart:selectNode', e.originalEvent.detail);
          });
        });
      }
    };
  };

  'use strict';

  angular.module('myApp').directive('treeChart', ['$timeout', treeChart]);

  treeChart.$inject = [];

}).call(this);

//# sourceMappingURL=treeChart.directive.js.map
