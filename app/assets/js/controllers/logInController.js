'use strict'

function logInController ($rootScope, $cookies, $scope, $state, userResourceFactory, userSrv, $mdToast) {

  var vm = this;

  vm.$onInit = onInit;

  function onInit () {

    vm.login = login;

    vm.loginUser = {
      email: '',
      password: '',
      found: false
    };

    userSrv.removeCookies()

    function login () {

      var email = vm.loginUser.email;
      var password = vm.loginUser.password;

      userSrv.login(email, password);

    }

    var deregisterStatusListener = $rootScope.$on('login response status', function (event, data) {

      if (data === 200) {
        $state.go('activities', {
          id: $rootScope.currentUser.id,
        });
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Email and password do not match')
            .hideDelay(5000)
        )
      }
    })

    function destroyListeners () {
      deregisterStatusListener();
    }

    $scope.$on('$destroy', destroyListeners)

  }
}

logInController.$inject = ['$rootScope', '$cookies', '$scope', '$state', 'userResourceFactory', 'userSrv', '$mdToast'];

angular.module('fithub')
  .controller('logInController', logInController);
