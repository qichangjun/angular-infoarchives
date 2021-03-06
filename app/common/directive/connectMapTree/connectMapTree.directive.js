(function() {
  var connectMapTree;

  connectMapTree = function($timeout, $translate) {
    return {
      restrict: 'E',
      scope: {
        nodes: '='
      },
      link: function(scope, element) {
        var diagonal, h, i, m, root, tree, update, vis, w;
        m = [20, 120, 20, 120];
        w = 700 - m[1] - m[3];
        h = 900 - m[0] - m[2];
        i = 0;
        root = void 0;
        tree = void 0;
        vis = d3.select('connect-map-tree').append('svg:svg').attr('id', 'connect-map-tree').attr('width', 1200).attr('height', 900).append('svg:g').attr('id', 'straight-tree-g').attr('transform', 'translate(' + 400 + ',' + '0' + ')');
        tree = d3.layout.tree().size([600, 600]);
        diagonal = d3.svg.diagonal().projection(function(d) {
          return [d.y, d.x];
        });
        update = function(source, delayTime) {
          var duration, link, node, nodeEnter, nodeExit, nodeText, nodeUpdate, nodes;
          duration = d3.event && d3.event.altKey ? 5000 : 200;
          if (delayTime) {
            duration = delayTime;
          }
          nodes = tree.nodes(root).reverse();
          nodes.forEach(function(d) {
            d.y = d.depth * 200;
          });
          node = vis.selectAll('g.node').data(nodes, function(d) {
            return d.id || (d.id = ++i);
          });
          nodeEnter = node.enter().append('svg:g').attr('class', 'node').attr('transform', function(d) {
            return 'translate(' + source.y0 + ',' + source.x0 + ')';
          });
          nodeEnter.append('svg:circle').attr('r', 1e-6).style('fill', function(d) {
            if (d._children) {
              return 'lightsteelblue';
            } else {
              return '#fff';
            }
          }).on('click', function(d) {
            if (d.children) {
              d._children = d.children;
              d.children = null;
            } else {
              d.children = d._children;
              d._children = null;
            }
            update(d, 500);
            scope.$emit('node:update', root);
          });
          nodeText = nodeEnter.append('svg:text').attr('x', function(d) {
            return 12;
          }).attr('dy', '.35em').attr('text-anchor', function(d) {
            return 'start';
          });
          nodeText.append('text:tspan').text(function(d) {
            return d.name;
          }).on('mouseover', function(d) {
            scope.$emit('node:mouseover', d);
          }).on('mouseout', function(d) {
            scope.$emit('node:mouseout', d);
          });
          nodeText.append('text:tspan').text(function(d) {
            if (d.type === 'item') {
              return $translate.instant('MODULES_BATCH_CLICK_VIEW');
            }
          }).style('fill', '#337ab7').style('cursor', 'pointer').on('click', function(d) {
            scope.$emit('node:clickItem', d);
          }).attr('dx', 12);
          nodeEnter.append('svg:image').attr('href', function(d) {
            if (d.type === 'root') {
              return 'images/connect--map--data--root--icon.png';
            } else if (d.type === 'unit') {
              return 'images/' + d.dataBase + '--map--icon' + '.png';
            }
          }).attr('xlink:href', function(d) {
            if (d.type === 'root') {
              return 'images/connect--map--data--root--icon.png';
            } else if (d.type === 'unit') {
              return 'images/' + d.dataBase + '--map--icon' + '.png';
            }
          }).attr('x', function(d) {
            if (d.type === 'unit') {
              return -80;
            } else {
              return -135;
            }
          }).attr('y', function(d) {
            if (d.type === 'unit') {
              return -25;
            } else {
              return -65;
            }
          }).attr('width', function(d) {
            if (d.type === 'root') {
              return 128;
            } else {
              return 50;
            }
          }).attr('height', function(d) {
            if (d.type === 'root') {
              return 128;
            } else {
              return 50;
            }
          });
          nodeUpdate = node.transition().duration(duration).attr('transform', function(d) {
            return 'translate(' + d.y + ',' + d.x + ')';
          });
          nodeUpdate.select('circle').attr('r', 6).style('fill', function(d) {
            if (d._children) {
              return 'lightsteelblue';
            } else {
              return '#fff';
            }
          });
          nodeUpdate.select('text').style('fill-opacity', 1);
          nodeExit = node.exit().transition().duration(duration).attr('transform', function(d) {
            return 'translate(' + source.y + ',' + source.x + ')';
          }).remove();
          nodeExit.select('circle').attr('r', 1e-6);
          nodeExit.select('text').style('fill-opacity', 1e-6);
          link = vis.selectAll('path.link').data(tree.links(nodes), function(d) {
            return d.target.id;
          });
          link.enter().insert('svg:path', 'g').attr('class', 'link').attr('d', function(d) {
            var o;
            o = {
              x: source.x0,
              y: source.y0
            };
            return diagonal({
              source: o,
              target: o
            });
          }).transition().duration(duration).attr('d', diagonal);
          link.transition().duration(duration).attr('d', diagonal);
          link.exit().transition().duration(duration).attr('d', function(d) {
            var o;
            o = {
              x: source.x,
              y: source.y
            };
            return diagonal({
              source: o,
              target: o
            });
          }).remove();
          nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
          });
        };
        scope.$watch('nodes', (function() {
          var collapse;
          if (scope.nodes) {
            root = angular.copy(scope.nodes);
            root.x0 = h / 2;
            root.y0 = 0;
            collapse = function(d) {
              if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                return d.children = null;
              }
            };
            root.children.forEach(collapse);
            update(root);
          }
        }), true);
      }
    };
  };

  'use strict';

  angular.module('myApp').directive('connectMapTree', ['$timeout', '$translate', connectMapTree]);

  connectMapTree.$inject = [];

}).call(this);
