(function() {
  'use strict';
  angular.module("myApp").filter("toDate", function() {
    return function(input) {
      if (input) {
        return new Date(input);
      } else {
        return null;
      }
    };
  }).controller("dataErrorController", [
    '$scope', '$log', '$state', '$timeout', '$element', '$stateParams', 'dataErrorService', function($scope, $log, $state, $timeout, $element, $stateParams, dataErrorService) {
      var init, loadDataType, loadSystemSource, loadUnit, reset, search, vm;
      vm = this;
      vm.systemSource;
      vm.unit;
      vm.dataType;
      vm.parameter = $stateParams;
      init = function() {
        loadSystemSource();
        loadUnit();
        loadDataType();
        vm.showMenu = true;
      };
      loadSystemSource = function() {
        return dataErrorService.getSystemSource().then(function(res) {
          return vm.systemSourceLists = res.data;
        }, function(res) {});
      };
      loadUnit = function() {
        return dataErrorService.getUnit().then(function(res) {
          return vm.unitList = res.data;
        }, function(res) {});
      };
      loadDataType = function() {
        return dataErrorService.getDataType().then(function(res) {
          return vm.dataTypeList = res.data;
        }, function(res) {});
      };
      search = function() {
        return $state.go('.', vm.parameter, {
          notify: false
        });
      };
      reset = function(info) {
        return info = null;
      };
      vm.reset = reset;
      vm.search = search;
      vm.loadDataType = loadDataType;
      vm.loadUnit = loadUnit;
      vm.loadSystemSource = loadSystemSource;
      init();
    }
  ]);

}).call(this);
