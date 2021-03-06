
/*
##  d3.tree 模型在angular中实现的指令
##  '$scope.nodes' 为模型数据
 */

(function() {
  var straightTree;

  straightTree = function() {
    return {
      restrict: 'E',
      scope: {
        width: '=',
        height: '=',
        radius: '=',
        nodes: '='
      },
      link: function(scope, element) {
        var changeFont, diagonal, filterNode, h, i, initPosition, item, m, root, selectedItem, size, tree, unit, update, vis, w, zoom, zoomed;
        m = [20, 120, 20, 120];
        w = 1280 - m[1] - m[3];
        h = 1100 - m[0] - m[2];
        i = 0;
        size = 1;
        initPosition = [m[3], m[0]];
        root = void 0;
        tree = void 0;
        unit = 'all';
        item = 'all';
        selectedItem = void 0;
        zoomed = function() {
          initPosition = d3.event.translate;
          return d3.select('#straight-tree-g').attr("transform", "translate(" + d3.event.translate + ")scale(" + size + ")");
        };
        zoom = d3.behavior.zoom().translate([m[3], m[0]]).scale(size).scaleExtent([1, 5]).on("zoom", zoomed);
        vis = d3.select('straight-tree').append('svg:svg').attr('id', 'straight-tree').attr('width', h + m[0] + m[2]).attr('height', h + m[0] + m[2]).append('svg:g').attr('id', 'straight-tree-g').call(zoom).on('dblclick.zoom', null).attr('transform', 'translate(' + m[3] + ',' + m[0] + ')');
        tree = d3.layout.tree().size([h, w]);
        diagonal = d3.svg.diagonal().projection(function(d) {
          return [d.y, d.x];
        });
        update = function(source) {
          var duration, link, node, nodeEnter, nodeExit, nodeUpdate, nodes;
          duration = d3.event && d3.event.altKey ? 5000 : 500;
          nodes = tree.nodes(root).reverse();
          nodes.forEach(function(d) {
            d.y = d.depth * 180;
          });
          node = vis.selectAll('g.node').data(nodes, function(d) {
            return d.id || (d.id = ++i);
          });
          nodeEnter = node.enter().append('svg:g').attr('class', 'node').attr('transform', function(d) {
            return 'translate(' + source.y0 + ',' + source.x0 + ')';
          }).on('click', function(d) {
            if (d.type === 'items') {
              if (!selectedItem || selectedItem !== d) {
                selectedItem = d;
                changeFont(false, '11px', '0.3', 'black');
                changeFont(d.objectId, '12px', '1', '#337ab7');
                scope.$emit('treeChart:selectNode', d);
              } else {
                selectedItem = null;
                changeFont(false, '11px', '1', 'black');
                scope.$emit('treeChart:selectNode', false);
              }
            }
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
          nodeEnter.append('svg:text').attr('id', function(d) {
            return 'text' + d.objectId;
          }).attr('x', function(d) {
            if (d.children || d._children) {
              return -10;
            } else {
              return 10;
            }
          }).attr('dy', '.35em').attr('text-anchor', function(d) {
            if (d.children || d._children) {
              return 'end';
            } else {
              return 'start';
            }
          }).text(function(d) {
            return d.name;
          }).style('fill-opacity', 1e-6);
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
        changeFont = function(id, size, opacity, fill) {
          if (!id) {
            vis.selectAll('text').style('font-size', size);
            vis.selectAll('text').style('fill-opacity', opacity);
            return vis.selectAll('text').style('fill', fill);
          } else {
            vis.select('#text' + id).style('font-size', size);
            vis.select('#text' + id).style('fill-opacity', opacity);
            return vis.select('#text' + id).style('fill', fill);
          }
        };
        filterNode = function() {
          var items, j, k, len, len1, ref, ref1, results, results1, rows, x;
          changeFont(false, '11px', '0.3', 'black');
          if (item !== 'all') {
            ref = root.children;
            results = [];
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
              rows = ref[i];
              if (rows.children) {
                results.push((function() {
                  var k, len1, ref1, results1;
                  ref1 = rows.children;
                  results1 = [];
                  for (x = k = 0, len1 = ref1.length; k < len1; x = ++k) {
                    items = ref1[x];
                    if (items.objectId === item) {
                      changeFont(item, '12px', '1', '#337ab7');
                      results1.push(changeFont(rows.objectId, '12px', '1', '#337ab7'));
                    } else {
                      results1.push(void 0);
                    }
                  }
                  return results1;
                })());
              } else {
                results.push(void 0);
              }
            }
            return results;
          } else if (item === 'all' && unit !== 'all') {
            ref1 = root.children;
            results1 = [];
            for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
              rows = ref1[i];
              if (rows.objectId === unit) {
                changeFont(unit, '12px', '1', '#337ab7');
                if (rows.children) {
                  results1.push((function() {
                    var l, len2, ref2, results2;
                    ref2 = rows.children;
                    results2 = [];
                    for (x = l = 0, len2 = ref2.length; l < len2; x = ++l) {
                      items = ref2[x];
                      results2.push(changeFont(items.objectId, '12px', '1', '#337ab7'));
                    }
                    return results2;
                  })());
                } else {
                  results1.push(void 0);
                }
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          } else if (item === 'all' && unit === 'all') {
            return changeFont(false, '11px', '1', 'black');
          }
        };
        scope.$on('svg:changeSize', function(e, newSize) {
          size = newSize;
          d3.select('#straight-tree-g').attr("transform", "translate(" + initPosition + ")scale(" + size + ")");
          element[0].querySelector('#straight-tree').setAttribute('width', (h + m[0] + m[2]) * size);
          return element[0].querySelector('#straight-tree').setAttribute('height', (h + m[0] + m[2]) * size);
        });
        scope.$on('tree:filter', function(e, _unit, _item) {
          unit = _unit;
          item = _item;
          return filterNode();
        });
        scope.$watch('nodes', (function() {
          if (scope.nodes) {
            root = angular.copy(scope.nodes);
            root.x0 = h / 2;
            root.y0 = 0;
            update(root);
          }
        }), true);
      }
    };
  };

  'use strict';

  angular.module('myApp').directive('straightTree', ['$timeout', straightTree]);

  straightTree.$inject = [];

}).call(this);
