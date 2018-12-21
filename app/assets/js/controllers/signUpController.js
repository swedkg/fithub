'use strict'

function signUpController ($rootScope, $scope, userResourceFactory, $mdToast, $state, userSrv) {


  var vm = this;
  vm.$onInit = onInit;

  function onInit () {

    vm.createUser = createUser;
    vm.editUser = vm.createUserMode = true;

    function createUser() {

      var User = userResourceFactory.register({
        email: vm.currentUserDetails.email,
        password: vm.currentUserDetails.password,
        first_name: vm.currentUserDetails.first_name,
        last_name: vm.currentUserDetails.last_name
      }, function (value, responseHeaders, status, statusText) {
        console.log(arguments, User);
        if (status === 200) {
          $mdToast.show(
            $mdToast.simple()
            .textContent('The user account was succesfully created')
            .hideDelay(5000)
          ).then(function () {

            var email = User.email;
            var password = User.password;
            console.log(User, email, password);
              userSrv.login(email, password);
          });
        } else {
          $mdToast.show(
            $mdToast.simple()
              .textContent('The email has already been taken')
              .hideDelay(5000)
          )
        }

      })

    }

    var deregisterStatusListener = $rootScope.$on('login response status', function (event, data) {
      console.log(arguments);

      if (data === 200) {
        $state.go('user', {
          id: $rootScope.currentUser.id,
        });
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('signUpController: Email and password do not match')
            .hideDelay(5000)
        )
      }
    })

    console.log($rootScope);

    function destroyListeners () {
      deregisterStatusListener();
    }

    $scope.$on('$destroy', destroyListeners);

  }


}

signUpController.$inject = ['$rootScope', '$scope', 'userResourceFactory', '$mdToast', '$state', 'userSrv'];

angular.module('fithub')
  .controller('signUpController', signUpController);
