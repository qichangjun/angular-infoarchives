(function() {
  'use strict';
  angular.module("myApp").service("mdDialogService", [
    '$log', '$mdDialog', function($log, $mdDialog) {
      var initAlertDialog, initConfirmDialog, initCustomDialog, initPromptDialog;
      $log.info("mdDialogService");
      initCustomDialog = function(controller, templateUrl, ev, locals) {
        return $mdDialog.show({
          controller: controller,
          templateUrl: templateUrl,
          multiple: true,
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          locals: locals || {},
          controllerAs: 'vm'
        });
      };
      initAlertDialog = function(title, textContent, confirmText, ev) {
        return $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title(title).multiple(true).textContent(textContent).ariaLabel('Alert Dialog Demo').ok(confirmText).targetEvent(ev));
      };
      initPromptDialog = function(ev, propertyName, propertyValue) {
        var confirm;
        confirm = $mdDialog.prompt().title('修改属性').multiple(true).textContent(propertyName).placeholder(propertyName).ariaLabel(propertyName).initialValue(propertyValue).targetEvent(ev).ok('修改').cancel('取消');
        return $mdDialog.show(confirm);
      };
      initConfirmDialog = function(ev, title, content) {
        var confirm;
        confirm = $mdDialog.confirm().title(title).multiple(true).textContent(content).ariaLabel('confirm dialog').ok('确定').cancel('取消');
        return $mdDialog.show(confirm);
      };
      this.initConfirmDialog = initConfirmDialog;
      this.initPromptDialog = initPromptDialog;
      this.initAlertDialog = initAlertDialog;
      this.initCustomDialog = initCustomDialog;
    }
  ]);

}).call(this);
