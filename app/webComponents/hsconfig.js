(function() {
  'use strict';
  if (!window.console) {
    window.console = {
      log: function() {}
    };
  }

  window.hsConfig = {
    debugEnabled: !false,
    bust: '1_0_15'
  };

  window.hsConfig.webUrl = "http://192.168.0.154:63338/erms(new)/app";

  window.hsConfig.baseUrl = 'http://wison.docworks.cn:8000/ermsapi';

  window.hsConfig.baseUrl = 'http://hzdaj.docworks.cn:8000/ermsapi';

  window.hsConfig.pageSize = 50;

  if (window.hsConfig.debugEnabled) {
    window.hsConfig.bust = "bust" + (new Date()).getTime();
  } else {
    window.hsConfig.bust = "bust" + (new Date()).getTime();
    window.hsConfig.baseUrl = 'http://hzdaj.docworks.cn:8000/ermsapi';
    window.hsConfig.webUrl = 'http://hzdaj.docworks.cn:8000/erms';
  }

}).call(this);
