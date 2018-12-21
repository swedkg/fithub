'use strict'

function fn() {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=passwordVerify"
    },
    link: function (scope, element, attributes, ngModel) {

      ngModel.$validators.passwordVerify = function (modelValue) {
        return modelValue == scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function () {
        ngModel.$validate();
      });
    }
  };
  }

fn.$inject = [];

angular
  .module('fithub')
  .directive('passwordVerify', fn)
