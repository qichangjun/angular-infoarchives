/**
 * Created by zzd on 17/4/6.
 */
'use strict';

d3.chart = d3.chart || {};

d3.chart.architectureTree = function() {

    var svg, tree, treeData, diameter, activeNode;

    /**
     * Build the chart
     */
    function chart(){
        if (typeof(tree) === 'undefined') {
            tree = d3.layout.tree()
                .size([360, diameter / 2 - 120])
                .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

            svg = d3.select("#graph").append("svg")
                .attr("width", diameter)
                .attr("height", diameter )
                .append("g")
                .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
        }

        var nodes = tree.nodes(treeData),
            links = tree.links(nodes);

        activeNode = null;

        svg.call(updateData, nodes, links);


    }

    /**
     * Update the chart data
     * @param {Object} container
     * @param {Array}  nodes
     */
    var toggleAll = function (d) {
        if (d.children) {
            d.children.forEach(toggleAll);
            toggle(d);
        }

    };

    var toggle = function(d) {
        if (d) {
            console.log (d)
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
        }
    };

    var updateData = function(container, nodes, links) {

        var diagonal = d3.svg.diagonal.radial()
            .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

        var linkSelection = svg.selectAll(".link").data(links, function(d) {
            return d.source.name + d.target.name + Math.random();
        });

        linkSelection.exit().remove();

        linkSelection.enter().insert("path")
            .attr("class", "link")
            .attr("d", diagonal)
            .transition().duration(5000);

        linkSelection.transition().duration(5000).attr('d', diagonal);

        var nodeSelection = container.selectAll(".node").data(nodes, function(d) {
            return d.name + Math.random();  // always update node
        });
        nodeSelection.exit().remove();

        $('#graph').on('click',function(){
            unselect()
        });

        var node = nodeSelection.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
            .on('mouseover', function(d) {
                if(activeNode !== null) {
                    return;
                }
                fade(0.1)(d);
                fontSize('17px')(d)
            })
            .on('mouseout', function(d) {
                if(activeNode !== null) {
                    return;
                }
                fade(1)(d);
                fontSize('11px')(d)
            })
            .on('click', function(d) {
                event.stopPropagation();
                select(d.name);
                toggle(d)
            });

        node.append("circle")
            .attr("r", function(d) { return 4.5 * (d.size || 1); })
            .style('stroke', function(d) {
                return d3.scale.linear()
                    .domain([1, 0])
                    .range(["steelblue", "red"])(typeof d.satisfaction !== "undefined" ? d.satisfaction : 1);
            })
            .style('fill', function(d) {
                return '#fff'
            });

        node.append("text")
            .attr("dy", ".31em")
            .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
            .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
            .text(function(d) {
                return d.name;
            });
    };

    var fade = function(opacity) {
        return function(node) {
            //if (!node.dependsOn || !(node.parent && node.parent.dependsOn)) return;
            svg.selectAll(".node")
                .filter(function(d) {
                    if (d.name === node.name) return false;
                    //return node.index.relatedNodes.indexOf(d.name) === -1;
                    return true
                })
                .transition()
                .style("opacity", opacity);
        };
    };

    var fontSize = function(fontSize) {
        return function(node) {
            //if (!node.dependsOn || !(node.parent && node.parent.dependsOn)) return;
            svg.selectAll("text")
                .style("font-size", '11px')
                .filter(function(d) {
                    if (d.name === node.name) return true;
                    //return node.index.relatedNodes.indexOf(d.name) === -1;
                    return false
                })
                .transition()
                .style("font-size", fontSize);
        };
    };


    var select = function(name) {
        if (activeNode && activeNode.name == name) {
            unselect();
            return;
        }
        unselect();
        svg.selectAll(".node")
            .filter(function(d) {
                if (d.name === name) return true;
            })
            .each(function(d) {
                document.querySelector('#tree-data-node-detail').dispatchEvent(
                    //传递点击事件
                    new CustomEvent("selectNode", { "detail": {name:d.name,id: d.id}})
                );
                d3.select(this).attr("id", "node-active");
                activeNode = d;
                fade(0.1)(d);
                fontSize('17px')(d)
            });
    };

    var unselect = function() {
        if (activeNode == null) return;
        fade(1)(activeNode);
        fontSize('11px')(activeNode);
        d3.select('#node-active').attr("id", null);
        activeNode = null;
    };

    chart.select = select;
    chart.unselect = unselect;

    chart.data = function(value) {
        if (!arguments.length) return treeData;
        treeData = value;
        return chart;
    };

    chart.diameter = function(value) {
        if (!arguments.length) return diameter;
        diameter = value;
        return chart;
    };


    return chart;
};