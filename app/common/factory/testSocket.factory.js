(function() {
  'use strict';
  angular.module("myApp").factory('MyData', function($websocket) {
    var collection, dataStream, methods;
    dataStream = $websocket('ws://localhost:8181/');
    collection = [1];
    dataStream.onMessage(function(message) {
      collection.push(JSON.parse(message.data));
    });
    methods = {
      collection: collection,
      get: function(name) {
        dataStream.send(JSON.stringify({
          action: name
        }));
      }
    };
    return methods;
  });

}).call(this);
