'use strict'

function homeController ($scope) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit () {
    vm.viewName = 'this is our home'
  }

}

homeController.$inject = ['$scope'];

angular.module('fithub')
  .controller('homeController', homeController);
