'use strict'

function homeController ($scope, utilsFactory) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit () {
    utilsFactory.replaceSvg();
  }

}

homeController.$inject = ['$scope', 'utilsFactory'];

angular.module('fithub')
  .controller('homeController', homeController);
