
/*
##  d3.tree 模型在angular中实现的指令
##  '$scope.nodes' 为模型数据
 */

(function() {
  var collapsibleTree, treeChart;

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
            tree = d3.layout.tree().size([360, diameter / 2 - 120]).separation(function(a, b) {
              return (a.parent === b.parent ? 1 : 2) / a.depth;
            });
            root = angular.copy(scope.nodes);
            root.x0 = h / 2;
            root.y0 = 0;
            root.children.forEach(toggleAll);
            update(root);
          }
        }), true);
      }
    };
  };

  'use strict';

  angular.module('myApp').directive('circleTree', ['$timeout', collapsibleTree]);

  collapsibleTree.$inject = [];

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
          var activeNode, container, diameter, fade, fontSize, select, svg, toggle, toggleAll, unselect, update;
          diameter = 960;
          activeNode = null;
          svg = d3.select('#graph').append('svg:svg').attr('width', diameter).attr('height', diameter).append('g').attr('transform', 'translate(' + diameter / 2 + ',' + diameter / 2 + ')');
          container = angular.element(document.querySelector('#tree-data-node-detail'));
          update = function(container, nodes, links) {
            var diagonal, linkSelection, node, nodeSelection;
            diagonal = d3.svg.diagonal.radial().projection(function(d) {
              return [d.y, d.x / 180 * Math.PI];
            });
            linkSelection = svg.selectAll(".link").data(links, function(d) {
              return d.source.name + d.target.name + Math.random();
            });
            linkSelection.exit().remove();
            linkSelection.enter().append("path").attr("class", "link").attr("d", diagonal);
            nodeSelection = container.selectAll(".node").data(nodes, function(d) {
              return d.name + Math.random();
            });
            nodeSelection.exit().remove();
            node = nodeSelection.enter().append("g").attr("class", "node").attr("transform", function(d) {
              return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
            }).on('mouseover', function(d) {
              if (activeNode !== null) {
                return;
              }
              fade(0.1)(d);
              return fontSize('17px')(d);
            }).on('mouseout', function(d) {
              if (activeNode !== null) {
                return;
              }
              fade(1)(d);
              return fontSize('11px')(d);
            }).on('click', function(d) {
              event.stopPropagation();
              select(d.name);
              return toggle(d);
            });
            node.append("circle").attr("r", function(d) {
              return 4.5 * (d.size || 1);
            }).style('stroke', function(d) {
              return d3.scale.linear().domain([1, 0]).range(["steelblue", "red"])(typeof d.satisfaction !== 'undefined' ? d.satisfaction : 1);
            }).style('fill', function(d) {
              return '#fff';
            });
            return node.append('text').attr('dy', '.31em').attr('text-anchor', function(d) {
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
            });
          };
          fade = function(opacity) {
            return function(node) {
              svg.selectAll('.node').filter(function(d) {
                if (d.name === node.name) {
                  return false;
                }
                return true;
              }).transition().style('opacity', opacity);
            };
          };
          fontSize = function(fontSize) {
            return function(node) {
              svg.selectAll('text').style('font-size', '11px').filter(function(d) {
                if (d.name === node.name) {
                  return true;
                }
                return false;
              }).transition().style('font-size', fontSize);
            };
          };
          select = function(name) {
            if (activeNode && activeNode.name === name) {
              unselect();
              return;
            }
            unselect();
            svg.selectAll('.node').filter(function(d) {
              if (d.name === name) {
                return true;
              }
            }).each(function(d) {
              document.querySelector('#tree-data-node-detail').dispatchEvent(new CustomEvent('selectNode', {
                'detail': {
                  name: d.name,
                  id: d.id
                }
              }));
              d3.select(this).attr('id', 'node-active');
              activeNode = d;
              fade(0.1)(d);
              fontSize('17px')(d);
            });
          };
          unselect = function() {
            if (activeNode === null) {
              return;
            }
            fade(1)(activeNode);
            fontSize('11px')(activeNode);
            d3.select('#node-active').attr('id', null);
            activeNode = null;
          };
          toggleAll = function(d) {
            if (d.children) {
              d.children.forEach(toggleAll);
              toggle(d);
            }
          };
          toggle = function(d) {
            $timeout(function() {
              if (d) {
                if (d.children) {
                  d._children = d.children;
                  return d.children = null;
                } else {
                  d.children = d._children;
                  return d._children = null;
                }
              }
            });
          };
          scope.$watch('nodes', function(data) {
            var links, nodes, tree, treeData;
            if (typeof data === 'undefined') {
              return;
            }
            treeData = data;
            if (typeof tree === 'undefined') {
              tree = d3.layout.tree().size([360, diameter / 2 - 120]).separation(function(a, b) {
                return (a.parent === b.parent ? 1 : 2) / a.depth;
              });
            }
            nodes = tree.nodes(data);
            links = tree.links(nodes);
            return update(svg, nodes, links);
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
