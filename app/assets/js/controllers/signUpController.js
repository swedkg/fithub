'use strict'

function signUpController ($scope) {


  var vm = this;
  vm.$onInit = onInit;

  function onInit () {

    vm.createUser = createUser;
    vm.editUser = vm.createUserMode = true;

    function createUser() {
      console.log('User Created')
    }

  }


}

signUpController.$inject = ['$scope'];

angular.module('fithub')
  .controller('signUpController', signUpController);
