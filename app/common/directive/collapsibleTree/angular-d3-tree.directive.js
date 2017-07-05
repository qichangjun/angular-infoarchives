(function() {
  var collapsibleTree;

  collapsibleTree = function($timeout, $translate) {
    return {
      restrict: 'E',
      scope: {
        width: '=',
        height: '=',
        radius: '=',
        nodes: '=',
        editAble: '=',
        hasNode: '='
      },
      link: function(scope, element) {
        var append_addBlockButton, append_addDeleteButton, append_addFileButton, append_addNodeButton, append_editCustomButton, append_editFileButton, append_editNodeName, checkisNodeChild, clearSelected, clickContainer, diagonal, h, horizontalSeparationBetweenNodes, i, m, maxDepth, newWidth, nodeHeight, nodeWidth, root, self, size, stringGetLength, tree, update, verticalSeparationBetweenNodes, vis, w, zoom;
        self = null;
        maxDepth = 0;
        m = [20, 120, 20, 120];
        w = 900 - m[1] - m[3];
        h = 500 - m[0] - m[2];
        i = 0;
        size = 1;
        root = void 0;
        nodeWidth = 120;
        nodeHeight = 75;
        horizontalSeparationBetweenNodes = 60;
        verticalSeparationBetweenNodes = 128;
        tree = d3.layout.tree().nodeSize([nodeWidth + horizontalSeparationBetweenNodes, nodeHeight + verticalSeparationBetweenNodes]).size([w, h]);
        newWidth = null;
        diagonal = d3.svg.diagonal().projection(function(d) {
          return [d.x + 20, d.y];
        });
        zoom = d3.behavior.zoom().scaleExtent([0.1, 2]);
        vis = d3.select('collapsible-tree').append('svg:svg').attr('id', 'mySvg').attr('height', h + m[0] + m[2]).append('svg:g').attr('id', 'mySvgg').call(zoom).on('dblclick.zoom', null).attr('transform', 'translate(' + 100 + ',' + m[0] + ')');
        scope.$on('node:deleteNode', function(e, d) {
          return clickContainer(d);
        });
        scope.$on('svg:changeSize', function(e, newSize) {
          size = newSize;
          d3.select('#mySvgg').attr("transform", "scale(" + size + ")");
          element[0].querySelector('#mySvg').setAttribute('width', (newWidth + 400) * size);
          return element[0].querySelector('#mySvg').setAttribute('height', (200 + (maxDepth + 1) * 200) * size);
        });
        scope.$on('update:name', function(e, id, nameZh, nameEn) {
          return $timeout(function() {
            var name;
            if ($translate.use() === 'cn') {
              name = nameZh;
            } else {
              name = nameEn;
            }
            return $('#' + 'text' + id).text(function() {
              if (name.length > 8) {
                return name.substring(0, 8) + '...';
              } else {
                return name;
              }
            }).attr('x', function() {
              if (name.length > 8) {
                name = name.substring(0, 8) + '...';
              }
              return '1em';
            });
          });
        });
        scope.$on('node:updateNodes', function(e, d) {
          return $timeout(function() {
            return clickContainer(d);
          });
        });
        stringGetLength = function(str) {
          var charCode, len, realLength;
          realLength = 0;
          len = str.length;
          charCode = -1;
          i = 0;
          while (i < len) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
              realLength++;
            } else {
              realLength = realLength + 2;
            }
            i++;
          }
          return realLength;
        };
        checkisNodeChild = function(toolContainer, d, parent) {
          if (parent) {
            if (parent.type === 'node') {

            } else if (scope.hasNode === true && !d.hasNode) {

            } else {
              return checkisNodeChild(toolContainer, d, parent.parent);
            }
          } else if (scope.hasNode === true && !d.hasNode) {

          } else {
            return append_addNodeButton(toolContainer, d);
          }
        };
        clickContainer = function(d) {
          var _self, deleteContainer, editContainer, toolContainer;
          clearSelected();
          _self = document.querySelector('#' + 'container' + d.code);
          _self.querySelector('rect').style.strokeWidth = '7px';
          vis.selectAll('g.node').sort(function(a, b) {
            if (a.code !== d.code) {
              return -1;
            } else {
              return 1;
            }
          });
          toolContainer = d3.select(_self).append('svg:g').attr('class', 'nodeTool');
          $timeout(function() {
            return toolContainer.attr('class', 'nodeTool-animate nodeTool');
          });
          editContainer = d3.select(_self).append('svg:g').attr('class', 'editTool');
          deleteContainer = d3.select(_self).append('svg:g').attr('class', 'deleteTool');
          if (scope.editAble) {
            checkisNodeChild(toolContainer, d, d.parent);
            append_addDeleteButton(deleteContainer, d);
            append_addFileButton(editContainer, d);
            append_addBlockButton(toolContainer, d);
            append_editNodeName(editContainer, d);
          }
          append_editFileButton(editContainer, d);
          append_editCustomButton(editContainer, d);
        };
        clearSelected = function() {
          var j, len1, rects, rows;
          rects = element[0].querySelectorAll('rect');
          for (i = j = 0, len1 = rects.length; j < len1; i = ++j) {
            rows = rects[i];
            rows.style.strokeWidth = '0px';
          }
          if (document.querySelector('.nodeTool') || document.querySelector('.editTool') || document.querySelector('.deleteTool')) {
            $('.nodeTool').remove();
            $('.editTool').remove();
            return $('.deleteTool').remove();
          }
        };
        append_editNodeName = function(editContainer, info) {
          self = angular.copy(info);
          if (info.type !== 'record') {
            editContainer.append('svg:text').attr('x', 98).attr('y', -4).text('\uf044').attr("font-family", "FontAwesome").attr('class', 'icon-size').on('click', function(d) {
              return $timeout(function() {
                if (info.type !== 'record' && scope.editAble) {
                  return scope.$emit('node:updateName', self);
                }
              });
            });
            return editContainer.append('svg:text').attr('x', 120).attr('y', -6).attr('text-anchor', 'start').attr('class', 'cursor-pointer').text($translate.instant('MODULES_PROJECTMANAGE_MODIFY_NAME')).on('click', function(d) {
              return $timeout(function() {
                if (info.type !== 'record' && scope.editAble) {
                  return scope.$emit('node:updateName', self);
                }
              });
            });
          }
        };
        append_addBlockButton = function(toolContainer, d) {
          toolContainer.append('svg:rect').attr('width', 140).attr('height', 47).attr('rx', 23).attr('x', -50).attr('y', 38).attr('class', 'new-rect').on('click', function(d) {
            scope.$emit('add:block', d);
            return window.event.stopPropagation();
          });
          toolContainer.append('svg:text').attr('x', -10).attr('y', 66).attr('class', 'icon-size').text(function(d) {
            return '\uf067';
          }).attr("font-family", "FontAwesome").style('fill', 'white').on('click', function(d) {
            scope.$emit('add:block', d);
            return window.event.stopPropagation();
          });
          return toolContainer.append('svg:text').attr('x', 10).attr('y', 65).attr('text-anchor', 'start').attr('class', 'cursor-pointer').style('fill', 'white').text($translate.instant('MODULES_PROJECTMANAGE_BLOCK')).on('click', function(d) {
            scope.$emit('add:block', d);
            return window.event.stopPropagation();
          });
        };
        append_addNodeButton = function(toolContainer, d) {
          if (d.type !== 'node') {
            toolContainer.append('svg:rect').attr('width', 140).attr('height', 47).attr('rx', 23).attr('x', -50).attr('y', 88).attr('class', function(d) {
              return 'node';
            }).on('click', function(d) {
              scope.$emit('add:node', d);
              return window.event.stopPropagation();
            });
            toolContainer.append('svg:text').attr('x', -10).attr('y', 116).attr('class', 'icon-size').text(function(d) {
              return '\uf067';
            }).attr("font-family", "FontAwesome").style('fill', 'white').on('click', function(d) {
              scope.$emit('add:node', d);
              return window.event.stopPropagation();
            });
            return toolContainer.append('svg:text').attr('x', 10).attr('y', 115).attr('text-anchor', 'start').attr('class', 'cursor-pointer').style('fill', 'white').text($translate.instant('MODULES_PROJECTMANAGE_NODE')).on('click', function(d) {
              scope.$emit('add:node', d);
              return window.event.stopPropagation();
            });
          }
        };
        append_addDeleteButton = function(deleteContainer, d) {
          if (d.type !== 'record') {
            return deleteContainer.append('svg:text').attr('x', -75).attr('y', 13).text('\uf1f8').attr("font-family", "FontAwesome").attr('class', 'icon-size').style('fill', 'DE6262').on('click', function(d) {
              scope.$emit('node:delete', d);
              return window.event.stopPropagation();
            });
          }
        };
        append_addFileButton = function(editContainer, d) {
          editContainer.append('svg:text').attr('x', 98).attr('y', 31).text('\uf055').attr("font-family", "FontAwesome").attr('class', 'icon-size').on('click', function(d) {
            scope.$emit('node:addFile', d);
            return window.event.stopPropagation();
          });
          return editContainer.append('svg:text').attr('x', 120).attr('y', 30).attr('text-anchor', 'start').attr('class', 'cursor-pointer').text($translate.instant('MODULES_PROJECTMANAGE_ADD_FILE')).on('click', function(d) {
            scope.$emit('node:addFile', d);
            return window.event.stopPropagation();
          });
        };
        append_editFileButton = function(editContainer, d) {
          if (d.hasFile > 0) {
            editContainer.append('svg:text').attr('x', 99).attr('y', 49).text('\uf0f6').attr("font-family", "FontAwesome").attr('class', 'icon-size').on('click', function(d) {
              scope.$emit('node:editFile', d);
              return window.event.stopPropagation();
            });
            return editContainer.append('svg:text').attr('x', 120).attr('y', 48).attr('id', 'fileNum' + d.code).attr('text-anchor', 'start').attr('class', 'cursor-pointer').text($translate.instant('MODULES_PROJECTMANAGE_FILE_LIST') + '(' + d.hasFile + ')').on('click', function(d) {
              scope.$emit('node:editFile', d);
              return window.event.stopPropagation();
            });
          }
        };
        append_editCustomButton = function(editContainer, d) {
          editContainer.append('svg:text').attr('x', 97).attr('y', 13).text('\uf121').attr("font-family", "FontAwesome").attr('class', 'icon-size').on('click', function(d) {
            scope.$emit('node:addCustomData', d);
            return window.event.stopPropagation();
          });
          return editContainer.append('svg:text').attr('x', 120).attr('y', 12).attr('text-anchor', 'start').attr('class', 'cursor-pointer').text($translate.instant('MODULES_PROJECTMANAGE_CUSTOMIZE_METADATA')).on('click', function(d) {
            scope.$emit('node:addCustomData', d);
            return window.event.stopPropagation();
          });
        };
        update = function(source) {
          var childCount, duration, levelWidth, link, node, nodeEnter, nodeExit, nodeUpdate, nodes;
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
          newWidth = d3.max(levelWidth) * 280 + 100;
          tree = tree.size([newWidth, h]);
          element[0].querySelector('#mySvg').setAttribute('width', (newWidth + 400) * size);
          duration = d3.event && d3.event.altKey ? 5000 : 500;
          nodes = tree.nodes(root).reverse();
          nodes.forEach(function(d) {
            if (d.depth > maxDepth) {
              maxDepth = d.depth;
              element[0].querySelector('#mySvg').setAttribute('height', (200 + (maxDepth + 1) * 200) * size);
            }
            d.y = d.depth * 190 + 20;
          });
          node = vis.selectAll('g.node').data(nodes, function(d) {
            return d.code || (d.code = ++i);
          });
          nodeEnter = node.enter().append('svg:g').attr('id', function(d) {
            return 'container' + d.code;
          }).attr('class', 'node').attr('transform', 'translate(' + source.x0 + ',' + source.y0 + ')').on('click', function(d) {
            return clickContainer(d);
          });
          nodeEnter.append('svg:rect').attr('width', 140).attr('height', 47).attr('rx', 23).attr('x', -50).attr('y', -15).attr('class', function(d) {
            return d.type;
          });
          nodeEnter.append('svg:text').attr('x', function(d) {
            if ($translate.use() === 'cn') {
              d.name = d.nameZh || d.name;
            } else {
              d.name = d.nameEn || d.name;
            }
            if (d.name.length > 8) {
              d.name = d.name.substring(0, 8) + '...';
            }
            return '1em';
          }).attr('dy', '1em').attr('id', function(d) {
            return 'text' + d.code;
          }).attr('text-anchor', 'middle').text(function(d) {
            if ($translate.use() === 'cn') {
              d.name = d.nameZh || d.name;
            } else {
              d.name = d.nameEn || d.name;
            }
            if (d.name.length > 8) {
              return d.name.substring(0, 8) + '...';
            } else {
              return d.name;
            }
          }).style('fill', 'white').style('font-size', '13px').style('fill-opacity', 1e-6);
          nodeUpdate = node.transition().duration(duration).attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
          });
          nodeUpdate.select('rect').attr('width', 140).attr('height', 47).attr('rx', 23).attr('x', -50).attr('y', -15);
          nodeUpdate.select('text').style('fill-opacity', 1);
          nodeExit = node.exit().transition().duration(duration).attr('transform', 'translate(' + source.x + ',' + source.y + ')').remove();
          nodeExit.select('rect').attr('r', 1e-6);
          nodeExit.select('text').style('fill-opacity', 1e-6);
          link = vis.selectAll('path.link').data(tree.links(nodes), function(d) {
            return d.target.code;
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
        scope.$watch('nodes', (function() {
          if (scope.nodes) {
            root = angular.copy(scope.nodes);
            root.x0 = w / 2 + 60;
            root.y0 = 50;
            update(root);
          }
        }), true);
      }
    };
  };

  'use strict';

  angular.module('myApp').directive('collapsibleTree', ['$timeout', '$translate', collapsibleTree]);

  collapsibleTree.$inject = [];

}).call(this);
