(function() {
  'use strict';
  angular.module("myApp").controller("statisticsController", [
    '$scope', '$log', '$state', 'mdDialogService', '$timeout', '$mdToast', '$stateParams', 'statisticsService', function($scope, $log, $state, mdDialogService, $timeout, $mdToast, $stateParams, statisticsService) {
      var getLegalPerson, getPersonalService, getRecordNum, getSystemName, getTopTen, getTopTenData, getYearList, init, updateColumnCharts, updateUnitColumn, vm;
      vm = this;
      vm.parameter = $stateParams;
      if (!vm.parameter.systemName) {
        vm.parameter.systemName = 'all';
      }
      if (!vm.parameter.year) {
        vm.parameter.year = 'all';
      }
      if (!vm.parameter.unit) {
        vm.parameter.unit = 'all';
      }
      vm.unitLists = ['测试0', '测试1', '测试2', '测试3', '测试4', '测试5'];
      init = function() {
        getSystemName();
        getYearList();
        getRecordNum();
        getTopTenData();
      };
      getYearList = function() {
        return statisticsService.getYearList().then(function(res) {
          return vm.yearLists = res;
        }, function(res) {});
      };
      getSystemName = function() {
        return statisticsService.getSystemName().then(function(res) {
          return vm.systemLists = res;
        }, function(res) {});
      };
      getRecordNum = function() {
        $state.go('.', vm.parameter, {
          notify: false
        });
        if (vm.parameter.unit !== 'all') {
          return statisticsService.getRecordNum(vm.parameter).then(function(res) {
            var i;
            vm.unitInfo = [];
            vm.businessLists = [];
            i = 0;
            while (i < 11) {
              vm.unitInfo[i] = {};
              vm.unitInfo[i].y = parseInt(Math.random() * 100);
              vm.unitInfo[i].x = i;
              vm.businessLists.push('业务' + i);
              i++;
            }
            return updateUnitColumn();
          }, function(res) {});
        } else {
          return statisticsService.getRecordNum(vm.parameter).then(function(res) {
            var i, j, len, ref, rows;
            vm.recordNum = [];
            i = 0;
            while (i < 12) {
              vm.recordNum[i] = {};
              vm.recordNum[i].y = res[i + 1];
              vm.recordNum[i].x = i;
              vm.recordNum[i].description = {
                unitName: '测试' + i,
                recordStartDate: '2015年11月3日',
                recordOverDate: '2017年05月21日',
                dataCount: 225
              };
              i++;
            }
            vm.unitLists = [];
            ref = vm.recordNum;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
              rows = ref[i];
              vm.unitLists.push(rows.description.unitName);
            }
            vm.unitLists = ['测试0', '测试1', '测试2', '测试3', '测试4', '测试5'];
            return updateColumnCharts();
          }, function(res) {});
        }
      };
      updateUnitColumn = function() {
        return $('#containerOfUnit').highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: null
          },
          legend: {
            enabled: false
          },
          credits: {
            text: '',
            href: ''
          },
          xAxis: {
            categories: vm.businessLists,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'AIP数量'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y}</b></td></tr>' + '</tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [
            {
              name: 'AIP数量',
              data: vm.unitInfo
            }
          ]
        });
      };
      getTopTenData = function() {
        return statisticsService.getTopTenData().then(function(res) {
          var i, j, len, ref, rows;
          vm.topTenData = res;
          vm.topTenUnitName = [];
          vm.topTenUnitValue = [];
          ref = vm.topTenData;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            vm.topTenUnitName.push(rows.sourceUnit);
            vm.topTenUnitValue.push(rows.sum);
          }
          return getTopTen();
        }, function(res) {});
      };
      getTopTen = function() {
        return $('#topTen').highcharts({
          chart: {
            type: 'bar'
          },
          title: {
            text: '部门数据总量TOP10'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: vm.topTenUnitName,
            title: {
              text: null
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: '数据量',
              align: 'high'
            },
            labels: {
              overflow: 'justify'
            }
          },
          tooltip: {
            valueSuffix: ''
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true,
                allowOverlap: true
              }
            }
          },
          credits: {
            enabled: false
          },
          series: [
            {
              name: '总数据量',
              data: vm.topTenUnitValue
            }
          ],
          legend: {
            enabled: false
          }
        });
      };
      getPersonalService = function() {
        return $('#personalService').highcharts({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            spacing: [100, 0, 40, 0]
          },
          credits: {
            text: '',
            href: ''
          },
          title: {
            floating: true,
            text: ''
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
              }
            }
          },
          series: [
            {
              type: 'pie',
              innerSize: '40%',
              name: '市场份额',
              data: [
                {
                  name: 'Firefox',
                  y: 45.0,
                  url: 'http://bbs.hcharts.cn'
                }, ['IE', 26.8], {
                  name: 'Chrome',
                  y: 12.8,
                  sliced: true,
                  selected: true,
                  url: 'http://www.hcharts.cn'
                }, ['Safari', 8.5], ['Opera', 6.2], ['其他', 0.7]
              ]
            }
          ]
        });
      };
      getLegalPerson = function() {
        return $('#legonPerson').highcharts({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            spacing: [100, 0, 40, 0]
          },
          credits: {
            text: '',
            href: ''
          },
          title: {
            floating: true,
            text: ''
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
              }
            }
          },
          series: [
            {
              type: 'pie',
              innerSize: '40%',
              name: '市场份额',
              data: [
                {
                  name: 'Firefox',
                  y: 45.0,
                  url: 'http://bbs.hcharts.cn'
                }, ['IE', 26.8], {
                  name: 'Chrome',
                  y: 12.8,
                  sliced: true,
                  selected: true,
                  url: 'http://www.hcharts.cn'
                }, ['Safari', 8.5], ['Opera', 6.2], ['其他', 0.7]
              ]
            }
          ]
        });
      };
      updateColumnCharts = function() {
        return $('#container').highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: '单位AIP数量统计'
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0,
            symbolRadius: 0
          },
          subtitle: {
            text: ''
          },
          credits: {
            text: '',
            href: ''
          },
          xAxis: {
            categories: vm.unitLists,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'AIP数量'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y}</b></td></tr>' + '<td style="color:{series.color};padding:0">业务单位名称</td>' + '<td style="padding:0"><b>{point.description.unitName}</b></td></tr>' + '<td style="color:{series.color};padding:0">归档开始时间</td>' + '<td style="padding:0"><b>{point.description.recordStartDate}</b></td></tr>' + '<td style="color:{series.color};padding:0">截至时间</td>' + '<td style="padding:0"><b>{point.description.recordOverDate}</b></td></tr>' + '<td style="color:{series.color};padding:0">该单位的归档数据总量</td>' + '<td style="padding:0"><b>{point.description.dataCount}</b></td></tr>' + '</tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              cursor: 'pointer',
              pointPadding: 0.2,
              borderWidth: 0,
              color: '#2b908f',
              events: {
                click: function(e) {
                  vm.parameter.unit = e.point.description.unitName;
                  return getRecordNum();
                }
              }
            }
          },
          series: [
            {
              name: 'AIP数量',
              data: vm.recordNum
            }
          ]
        });
      };
      vm.getRecordNum = getRecordNum;
      init();
    }
  ]);

}).call(this);
