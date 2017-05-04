(function() {
  angular.module("myApp").filter('formatByte', function() {
    return function(bytes) {
      var i, k, sizes;
      if (bytes === 0 || !bytes) {
        return '0 B';
      }
      k = 1024;
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)) + ' ' + sizes[i];
    };
  });

}).call(this);
