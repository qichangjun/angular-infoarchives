
/*
##  表单验证
 */

(function() {
  'use strict';
  angular.module("myApp").directive('hsFormMessage', [
    '$uibPosition', '$compile', function($uibPosition, $compile) {
      var directive, linkFunction;
      linkFunction = function($scope, $element, $attrs) {
        var hideBubble, init, showBubble;
        if (!$attrs.hsFormMessageTemplate) {
          return;
        }
        init = function() {
          var $template;
          $element.after("<div class='hsFormMessage-container' ng-include=\"\'" + $attrs.hsFormMessageTemplate + "\'\"></div>");
          $template = $element.next();
          $compile($template)($scope.$parent);
          return $scope.$watch('hsFormMessageShow', function(hsFormMessageShow) {
            if (hsFormMessageShow) {
              return showBubble();
            } else {
              return hideBubble();
            }
          });
        };
        showBubble = function() {
          var $bubble, position;
          position = $uibPosition.position($element);
          $bubble = $element.next();
          if ($bubble.hasClass("hsFormMessage-container")) {
            return $bubble.css({
              top: position.top + position.height,
              left: position.left + position.width / 2 - 15,
              display: 'block'
            });
          }
        };
        hideBubble = function() {
          var $bubble;
          $bubble = $element.next();
          if ($bubble.hasClass("hsFormMessage-container")) {
            $bubble.css({
              display: 'none'
            });
          }
        };
        init();
      };
      return directive = {
        restrict: 'AE',
        scope: {
          hsFormMessage: "=",
          hsFormMessageShow: "=",
          hsFormMessageTemplate: "@"
        },
        link: linkFunction
      };
    }
  ]).directive('hsFormMessageChromeBubble', [
    '$uibPosition', '$compile', function($uibPosition, $compile) {
      var directive, linkFunction;
      linkFunction = function($scope, $element, $attrs) {
        var init;
        init = function() {
          $element.wrap("<div class='hs-form-messages'></div>").before("<div class='msg-tri-outside'></div><div class='msg-tri-inside'></div>").wrap("<div class='hs-form-messages__icon fa fa-exclamation-circle'></div>");
        };
        init();
      };
      return directive = {
        restrict: 'AE',
        scope: {},
        link: linkFunction
      };
    }
  ]);

}).call(this);
