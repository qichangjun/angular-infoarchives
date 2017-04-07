(function() {
  'use strict';
  angular.module("myApp").service("commonMethodSerivce", [
    '$log', function($log) {
      var includeInArr, isArrRepeat;
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
      this.includeInArr = includeInArr;
      this.isArrRepeat = isArrRepeat;
    }
  ]);

}).call(this);