
/**
 * Created by zzd on 17/2/27.
 */


/* jslint node: true */


/* global angular, $, d3 */

(function() {
  var collapsibleTree;

  collapsibleTree = function($timeout) {
    return {
      restrict: 'E',
      scope: {
        width: '=',
        height: '=',
        radius: '=',
        nodes: '='
      },
      link: function(scope, element) {
        $timeout(function() {
          var diagonal, h, horizontalSeparationBetweenNodes, i, m, maxDepth, maxX, nodeHeight, nodeWidth, root, tree, update, verticalSeparationBetweenNodes, vis, w;
          maxDepth = 0;
          maxX = 0;
          m = [20, 120, 20, 120];
          w = 900 - m[1] - m[3];
          h = 500 - m[0] - m[2];
          i = 0;
          root = void 0;
          nodeWidth = 120;
          nodeHeight = 75;
          horizontalSeparationBetweenNodes = 30;
          verticalSeparationBetweenNodes = 128;
          tree = d3.layout.tree().nodeSize([nodeWidth + horizontalSeparationBetweenNodes, nodeHeight + verticalSeparationBetweenNodes]).size([w, h]);
          diagonal = d3.svg.diagonal().projection(function(d) {
            return [d.x + 20, d.y];
          });
          vis = d3.select('collapsible-tree').append('svg:svg').attr('id', 'mySvg').attr('width', w + m[1] + m[3]).attr('height', h + m[0] + m[2]).append('svg:g').attr('transform', 'translate(' + 100 + ',' + m[0] + ')');
          scope.$on('update:name', function(e, name, id) {
            return $('#' + id + 'text').text(name);
          });
          update = function(source) {
            var childCount, duration, levelWidth, link, newWidth, node, nodeEnter, nodeExit, nodeUpdate, nodes;
            levelWidth = [1];
            childCount = function(level, n) {
              if (n.children && n.children.length > 0) {
                if (levelWidth.length <= level + 1) {
                  levelWidth.push(0);
                }
                levelWidth[level + 1] += n.children.length;
                return n.children.forEach(function(d) {
                  childCount(level + 1, d);
                });
              }
            };
            childCount(0, root);
            newWidth = d3.max(levelWidth) * 180 + 100;
            tree = tree.size([newWidth, h]);
            element[0].querySelector('#mySvg').setAttribute('width', newWidth + 400);
            duration = d3.event && d3.event.altKey ? 5000 : 500;
            nodes = tree.nodes(root).reverse();
            nodes.forEach(function(d) {
              if (d.depth > maxDepth) {
                maxDepth = d.depth;
                element[0].querySelector('#mySvg').setAttribute('height', 200 + (maxDepth + 1) * 200);
              }
              d.y = d.depth * 220 + 20;
            });
            node = vis.selectAll('g.node').data(nodes, function(d) {
              return d.id || (d.id = ++i);
            });
            nodeEnter = node.enter().append('svg:g').attr('class', 'node').attr('transform', function(d) {
              return 'translate(' + source.x0 + ',' + source.y0 + ')';
            }).on('click', function(d) {
              var deleteContainer, editContainer, j, len, rects, rows, toolContainer;
              rects = element[0].querySelectorAll('rect');
              for (i = j = 0, len = rects.length; j < len; i = ++j) {
                rows = rects[i];
                rows.style.strokeWidth = '1.5px';
              }
              this.querySelector('rect').style.strokeWidth = '5px';
              vis.selectAll('g.node').sort(function(a, b) {
                if (a.id !== d.id) {
                  return -1;
                } else {
                  return 1;
                }
              });
              if (document.querySelector('.nodeTool') || document.querySelector('.editTool') || document.querySelector('.deleteTool')) {
                $('.nodeTool').remove();
                $('.editTool').remove();
                $('.deleteTool').remove();
              }
              toolContainer = d3.select(this).append('svg:g').attr('class', 'nodeTool');
              editContainer = d3.select(this).append('svg:g').attr('class', 'editTool');
              deleteContainer = d3.select(this).append('svg:g').attr('class', 'deleteTool');
              if (d.type !== 'node') {
                toolContainer.append('svg:text').attr('x', 90).attr('y', -15).attr('class', 'cursor-pointer').text(function(d) {
                  return '\uf055';
                }).attr("font-family", "FontAwesome").on('click', function(d) {
                  scope.$emit('add:block', d);
                  return window.event.stopPropagation();
                });
                toolContainer.append('svg:text').attr('x', 137).attr('y', -16).attr('text-anchor', 'middle').text('增加Block').on('click', function(d) {
                  scope.$emit('add:block', d);
                  return window.event.stopPropagation();
                });
                toolContainer.append('svg:text').attr('x', 90).attr('y', 8).attr('class', 'cursor-pointer').text(function(d) {
                  return '\uf055';
                }).attr("font-family", "FontAwesome").on('click', function(d) {
                  scope.$emit('add:node', d);
                  return window.event.stopPropagation();
                });
                toolContainer.append('svg:text').attr('x', 137).attr('y', 7).attr('text-anchor', 'middle').text('增加Node').on('click', function(d) {
                  scope.$emit('add:node', d);
                  return window.event.stopPropagation();
                });
              }
              editContainer.append('svg:text').attr('x', 90).attr('y', 30).attr('class', 'cursor-pointer').text(function(d) {
                return '\uf0f6';
              }).attr("font-family", "FontAwesome").on('click', function(d) {
                scope.$emit('node:addFile', d);
                return window.event.stopPropagation();
              });
              editContainer.append('svg:text').attr('x', 120).attr('y', 29).attr('text-anchor', 'middle').text('File');
              editContainer.append('svg:text').attr('x', 88).attr('y', 50).attr('class', 'cursor-pointer').text(function(d) {
                return '\uf121';
              }).attr("font-family", "FontAwesome").on('click', function(d) {
                scope.$emit('node:addCustomData', d);
                return window.event.stopPropagation();
              });
              editContainer.append('svg:text').attr('x', 145).attr('y', 50).attr('text-anchor', 'middle').text('自定义元数据');
              if (d.type !== 'record') {
                deleteContainer.append('svg:text').attr('x', -85).attr('y', 13).attr('class', 'cursor-pointer').text(function(d) {
                  return '\uf1f8';
                }).attr("font-family", "FontAwesome").on('click', function(d) {
                  scope.$emit('node:delete', d);
                  return window.event.stopPropagation();
                });
                deleteContainer.append('svg:text').attr('x', -70).attr('y', 14).text(function(d) {
                  return '删除';
                }).on('click', function(d) {
                  scope.$emit('node:delete', d);
                  return window.event.stopPropagation();
                });
              }
            });
            nodeEnter.append('svg:rect').attr('width', 120).attr('height', 47).attr('rx', 18).attr('x', -40).attr('y', -15).style('fill', function(d) {
              if (d.type === 'record') {
                return '#1ab394';
              } else if (d.type === 'block') {
                return '#1c84c6';
              } else if (d.type === 'node') {
                return '#f8ac59';
              }
            }).attr('class', function(d) {
              return d.type;
            });
            nodeEnter.append('svg:text').attr('x', function(d) {
              if (d.children || d._children) {
                return -25;
              } else {
                return -25;
              }
            }).attr('dy', '.35em').attr('id', function(d) {
              return d.id + 'text';
            }).attr('text-anchor', function(d) {
              return 'start';
            }).text(function(d) {
              return d.name;
            }).style('fill', function(d) {
              return 'white';
            }).style('font-size', function(d) {
              return '13px';
            }).on('click', function(d) {
              if (d.type !== 'record') {
                scope.$emit('node:updateName', d);
              }
              return window.event.stopPropagation();
            }).style('fill-opacity', 1e-6);
            nodeUpdate = node.transition().duration(duration).attr('transform', function(d) {
              return 'translate(' + d.x + ',' + d.y + ')';
            });
            nodeUpdate.select('rect').attr('width', 120).attr('height', 47).attr('rx', 18).attr('x', -40).attr('y', -15).style('fill', function(d) {
              if (d.type === 'record') {
                return '#1ab394';
              } else if (d.type === 'block') {
                return '#1c84c6';
              } else if (d.type === 'node') {
                return '#f8ac59';
              }
            });
            nodeUpdate.select('text').style('fill-opacity', 1);
            nodeExit = node.exit().transition().duration(duration).attr('transform', function(d) {
              return 'translate(' + source.x + ',' + source.y + ')';
            }).remove();
            nodeExit.select('rect').attr('r', 1e-6);
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
            if (scope.nodes) {
              root = angular.copy(scope.nodes);
              root.x0 = w / 2 + 60;
              root.y0 = 50;
              update(root);
            }
          }), true);
        });
      }
    };
  };

  'use strict';

  angular.module('myApp').directive('collapsibleTree', ['$timeout', collapsibleTree]);

  collapsibleTree.$inject = [];

}).call(this);
