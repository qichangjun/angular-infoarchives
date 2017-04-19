// Generated by CoffeeScript 1.9.1
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

  window.hsConfig.baseUrl = 'http://' + '192.168.0.209:8080' + '/infoarchivesapi';

  window.hsConfig.baseUrl = 'http://' + 'demo.docworks.cn' + '/infoarchivesapi';

  window.hsConfig.jobBaseUrl = 'http://' + 'ia.docworks.cn:8003' + '/infoarchivesjobapi';

  window.hsConfig.webUrl = 'http://' + window.location.host + '/infoarchives';

  window.hsConfig.pageSize = 50;

  if (window.hsConfig.debugEnabled) {
    window.hsConfig.bust = "bust" + (new Date()).getTime();
  } else {
    window.hsConfig.bust = "bust" + (new Date()).getTime();
    window.hsConfig.baseUrl = 'http://' + window.location.host + '/infoarchivesapi';
    window.hsConfig.jobBaseUrl = 'http://' + window.location.host + '/infoarchivesjobapi';
    window.hsConfig.webUrl = 'http://' + window.location.host + '/infoarchives';
  }

}).call(this);

//# sourceMappingURL=app.config.js.map
