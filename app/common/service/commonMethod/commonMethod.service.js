(function() {
  'use strict';
  angular.module("myApp").service("commonMethodSerivce", [
    '$log', function($log) {
      var includeInArr, initColumn, isArrRepeat, sortArrBy;
      isArrRepeat = function(arr) {
        var counts, i, item, len, out;
        len = arr.length;
        out = [];
        counts = {};
        i = 0;
        while (i < len) {
          item = arr[i];
          counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
          if (counts[item] === 2) {
            out.push(item);
          }
          i++;
        }
        return out.length === 0;
      };
      includeInArr = function(element, arr) {
        var i, j, len1, rows;
        for (i = j = 0, len1 = arr.length; j < len1; i = ++j) {
          rows = arr[i];
          if (arr[i] === element) {
            return true;
          }
        }
        return false;
      };
      initColumn = function(name, predicate, type, value) {
        return {
          name: name,
          predicate: predicate,
          type: type,
          value: value
        };
      };
      sortArrBy = function(name) {
        return function(o, p) {
          var a, b;
          a = void 0;
          b = void 0;
          if (typeof o === 'object' && typeof p === 'object' && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
              return 0;
            }
            if (typeof a === typeof b) {
              if (a < b) {
                return -1;
              } else {
                return 1;
              }
            }
            if (typeof a < typeof b) {
              return -1;
            } else {
              return 1;
            }
          } else {
            throw 'error';
          }
        };
      };
      this.sortArrBy = sortArrBy;
      this.initColumn = initColumn;
      this.includeInArr = includeInArr;
      this.isArrRepeat = isArrRepeat;
    }
  ]);

}).call(this);
