(function() {
  'use strict';
  angular.module("myApp").controller("statisticsController", [
    '$scope', '$log', '$state', 'mdDialogService', '$timeout', '$mdToast', '$stateParams', 'statisticsService', function($scope, $log, $state, mdDialogService, $timeout, $mdToast, $stateParams, statisticsService) {
      var exportExcel, getAipListOfAll, getBusinessMatterList, getOverAll, getRecordNum, getUnitLists, getYearList, init, updateAllUnit, updateUnitColumn, vm;
      vm = this;
      vm.parameter = $stateParams;
      vm.parameter.month = vm.parameter.month || 'all';
      vm.parameter.year = vm.parameter.year || 'all';
      vm.parameter.unit = vm.parameter.unit || 'all';
      vm.monthLists = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      init = function() {
        getYearList();
        getRecordNum();
        getOverAll();
        getUnitLists();
      };
      getUnitLists = function() {
        var _parameter;
        _parameter = {};
        _parameter.year = 'all';
        _parameter.month = 'all';
        return statisticsService.getRecordNum(_parameter).then(function(res) {
          var i, results;
          vm.unitLists = [];
          results = [];
          for (i in res) {
            results.push(vm.unitLists.push(i));
          }
          return results;
        }, function(res) {});
      };
      getOverAll = function() {
        return statisticsService.getOverAll().then(function(res) {
          return vm.overAllInfo = res;
        }, function(res) {});
      };
      getYearList = function() {
        return statisticsService.getYearList(vm.parameter.unit).then(function(res) {
          return vm.yearLists = res;
        }, function(res) {});
      };
      getRecordNum = function() {
        if (vm.parameter.year === 'all') {
          vm.parameter.month = 'all';
        }
        $state.go('.', vm.parameter, {
          notify: false
        });
        if (vm.parameter.unit !== 'all') {
          return getBusinessMatterList();
        } else {
          return getAipListOfAll();
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
              data: vm.columnInfo
            }
          ]
        });
      };
      updateAllUnit = function() {
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
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y}</b></td></tr>' + '<td style="color:{series.color};padding:0">业务单位名称:</td>' + '<td style="padding:0"><b>{point.description.unitName}</b></td></tr>' + '</tr>',
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
                  $state.go('.', vm.parameter, {
                    notify: false
                  });
                  getRecordNum();
                  return getYearList();
                }
              }
            }
          },
          series: [
            {
              name: 'AIP数量',
              data: vm.columnInfo
            }
          ]
        });
      };
      getAipListOfAll = function() {
        return statisticsService.getRecordNum(vm.parameter).then(function(res) {
          var i, j, len, ref, rows;
          vm.recordNum = [];
          vm.columnInfo = [];
          vm.unitLists = [];
          for (i in res) {
            vm.recordNum.push({
              unitName: i,
              aipCount: res[i]
            });
            vm.unitLists.push(i);
          }
          ref = vm.recordNum;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            vm.columnInfo[i] = {};
            vm.columnInfo[i].y = rows.aipCount;
            vm.columnInfo[i].x = i;
            vm.columnInfo[i].description = {
              unitName: rows.unitName
            };
          }
          return updateAllUnit();
        }, function(res) {});
      };
      getBusinessMatterList = function() {
        return statisticsService.getBusinessMatterList(vm.parameter).then(function(res) {
          var i, j, len, ref, rows;
          vm.businessLists = [];
          vm.unitInfo = [];
          vm.columnInfo = [];
          for (i in res) {
            vm.unitInfo.push({
              bussinessName: i,
              aipCount: res[i]
            });
            vm.businessLists.push(i);
          }
          ref = vm.unitInfo;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            rows = ref[i];
            vm.columnInfo[i] = {};
            vm.columnInfo[i].y = rows.aipCount;
            vm.columnInfo[i].x = i;
          }
          return updateUnitColumn();
        }, function(res) {});
      };
      exportExcel = function() {
        return statisticsService.exportExcel(vm.parameter).then(function(res) {
          return window.location.href = res.downloadUrl;
        }, function(res) {});
      };
      vm.exportExcel = exportExcel;
      vm.getRecordNum = getRecordNum;
      init();
    }
  ]);

}).call(this);
