// Generated by CoffeeScript 1.9.1
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
      return parseInt(bytes / Math.pow(k, i)) + ' ' + sizes[i];
    };
  }).filter('formatType', function() {
    return function(url) {
      if (url) {
        if (url.indexOf('/') !== -1) {
          url = url.split('/');
          url = url[url.length - 1];
        }
        url = url.split('.');
        url = url[url.length - 1];
        return url;
      }
    };
  });

}).call(this);

//# sourceMappingURL=commonFilter.js.map
