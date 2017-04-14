
/*
##  d3.tree 模型在angular中实现的指令
##  '$scope.nodes' 为模型数据
 */

(function() {
  var collapsibleTree;

  collapsibleTree = function() {
    return {
      restrict: 'E',
      scope: {
        width: '=',
        height: '=',
        radius: '=',
        nodes: '='
      },
      link: function(scope, element) {
        var diagonal, diameter, h, i, m, root, toggle, tree, update, vis, w;
        m = [20, 120, 20, 120];
        w = 1280 - m[1] - m[3];
        h = 800 - m[0] - m[2];
        i = 0;
        diameter = 960;
        root = void 0;
        tree = void 0;
        diagonal = d3.svg.diagonal.radial().projection(function(d) {
          return [d.y, d.x / 180 * Math.PI];
        });
        vis = d3.select('circle-tree').append('svg:svg').attr('width', diameter).attr('height', diameter).append('g').attr('transform', 'translate(' + diameter / 2 + ',' + diameter / 2 + ')');
        update = function(source) {
          var duration, link, node, nodeEnter, nodeExit, nodeUpdate, nodes;
          duration = d3.event && d3.event.altKey ? 5000 : 500;
          nodes = tree.nodes(root).reverse();
          node = vis.selectAll('g.node').data(nodes, function(d) {
            return d.id || (d.id = ++i);
          });
          nodeEnter = node.enter().append('svg:g').attr("class", "node").attr("transform", function(d) {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
          }).on('click', function(d) {
            toggle(d);
            update(d);
            scope.$emit('treeChart:selectNode', d);
          }).on('mouseover', function(d) {
            return scope.$emit('node:mouseover', d);
          }).on('mouseout', function(d) {
            return scope.$emit('node:mouseout', d);
          });
          nodeEnter.append('svg:circle').attr('r', 1e-6).style('fill', function(d) {
            if (d._children) {
              return 'lightsteelblue';
            } else {
              return '#fff';
            }
          });
          nodeEnter.append('text').attr('dy', '.31em').attr('text-anchor', function(d) {
            if (d.x < 180) {
              return 'start';
            } else {
              return 'end';
            }
          }).attr('transform', function(d) {
            if (d.x < 180) {
              return 'translate(8)';
            } else {
              return 'rotate(180)translate(-8)';
            }
          }).text(function(d) {
            return d.name;
          }).style('fill-opacity', 1e-6);
          nodeUpdate = node.transition().duration(duration).attr("transform", function(d) {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
          });
          nodeUpdate.select('circle').attr('r', 4.5).style('fill', function(d) {
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
        toggle = function(d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
        };
        scope.$watch('nodes', (function() {
          var toggleAll;
          toggleAll = function(d) {
            if (d.children) {
              d.children.forEach(toggleAll);
              toggle(d);
            }
          };
          if (scope.nodes) {
            root = angular.copy(scope.nodes);
            root.x0 = h / 2;
            root.y0 = 0;
            tree = d3.layout.tree().size([360, diameter / 2 - 120]).separation(function(a, b) {
              return (a.parent === b.parent ? 1 : 2) / a.depth;
            });
            update(root);
          }
        }), true);
      }
    };
  };

  'use strict';

  angular.module('myApp').directive('circleTree', ['$timeout', collapsibleTree]);

  collapsibleTree.$inject = [];

}).call(this);
