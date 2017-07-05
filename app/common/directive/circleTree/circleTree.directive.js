
/*
##  d3.tree 模型在angular中实现的指令
##  '$scope.nodes' 为模型数据
 */

(function() {
  var collapsibleTree;

  collapsibleTree = function($timeout) {
    return {
      restrict: 'E',
      scope: {
        nodes: '='
      },
      link: function(scope, element) {
        var changeFont, diagonal, diameter, filterNode, h, i, initPosition, item, m, root, selectedItem, size, tree, unit, update, vis, zoom, zoomed;
        m = [20, 120, 20, 120];
        h = 600 - m[0] - m[2];
        i = 0;
        diameter = 1050;
        size = 1;
        initPosition = [diameter / 2 - 100, diameter / 2 - 200];
        root = void 0;
        tree = void 0;
        unit = 'all';
        item = 'all';
        diagonal = d3.svg.diagonal.radial().projection(function(d) {
          return [d.y, d.x / 180 * Math.PI];
        });
        selectedItem = null;
        zoomed = function() {
          initPosition = d3.event.translate;
          return d3.select('#circle-tree-g').attr("transform", "translate(" + initPosition + ")scale(" + size + ")");
        };
        zoom = d3.behavior.zoom().translate([diameter / 2 - 100, diameter / 2 - 200]).scale(size).scaleExtent([1, 5]).on("zoom", zoomed);
        vis = d3.select('circle-tree').append('svg:svg').attr('id', 'circleTree').attr('width', diameter).attr('height', diameter).append('svg:g').attr('id', 'circle-tree-g').call(zoom).on('dblclick.zoom', null).attr('transform', 'translate(' + (diameter / 2 - 100) + ',' + (diameter / 2 - 200) + ')');
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
          nodeEnter.append('text').attr('id', function(d) {
            return 'text' + d.objectId;
          }).attr('dy', '.31em').attr('text-anchor', function(d) {
            if (d.x < 180) {
              return 'start';
            } else {
              return 'end';
            }
          }).attr('transform', function(d) {
            if (d.x < 180) {
              return 'rotate(10)translate(10)';
            } else {
              return 'rotate(190)translate(-10)';
            }
          }).text(function(d) {
            return d.name;
          });
          nodeUpdate = node.transition().duration(duration).attr("transform", function(d) {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
          });
          nodeUpdate.select('circle').attr('r', 6).style('fill', function(d) {
            if (d._children) {
              return 'lightsteelblue';
            } else {
              return '#fff';
            }
          });
          nodeExit = node.exit().attr('transform', function(d) {
            return 'translate(' + source.y + ',' + source.x + ')';
          }).remove();
          nodeExit.select('circle').attr('r', 1e-6);
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
            return d.y0 = d.y;
          });
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
        scope.$on('svg:changeSize', function(e, newSize) {
          size = newSize;
          console.log(size);
          d3.select('#circle-tree-g').attr("transform", "translate(" + initPosition + ")scale(" + size + ")");
          element[0].querySelector('#circleTree').setAttribute('width', diameter * size);
          return element[0].querySelector('#circleTree').setAttribute('height', diameter * size);
        });
        scope.$on('tree:filter', (function(e, _unit, _item) {
          unit = _unit;
          item = _item;
          return filterNode();
        }));
        scope.$watch('nodes', (function() {
          if (scope.nodes) {
            root = angular.copy(scope.nodes);
            root.x0 = h / 2;
            root.y0 = 0;
            tree = d3.layout.tree().size([400, diameter / 2 - 320]).separation(function(a, b) {
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
