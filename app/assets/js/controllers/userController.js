'use strict'

function userController ($rootScope, $scope, $state, $stateParams, $mdToast, userResourceFactory, activitiesResourceFactory) {


  var vm = this;

  if ($rootScope.isUserLoggedIn === false) {
    $state.go('home');
    return null;
  } else {
    vm.$onInit = onInit;
  }

  function onInit () {

    vm.isUserLoggedIn = $rootScope.isUserLoggedIn;
    vm.editUserDetails = editUserDetails;
    vm.saveUserDetails = saveUserDetails;
    vm.cancelUserEdit = cancelUserEdit;

    var userDetailsCopy = {};

    vm.editUser = false;
    vm.currentUser = $rootScope.currentUser
    vm.currentUser = $stateParams.id;

    // else
    //   if (!vm.isUserLoggedIn && typeof $stateParams.id != 'undefined') {
    //     vm.currentUser = $stateParams.id;
    //   }

    // vm.currentUser = 4
    console.log($rootScope, vm, $stateParams)


    vm.currentUserDetails = {}
    vm.currentUserActivities = []

    if (vm.currentUser === null) {
      $state.go('user/login')
    } else {
      try {
        vm.currentUserDetails = $rootScope.currentUser
      } catch (err) {
        console.log('User not found')
      }
      // var user = userResourceFactory.get({
      //   id: vm.currentUser
      // }).$promise.then(function (user) {
      //   vm.currentUserDetails = user
      // })

      // console.log($stateParams, user)
    }

    function editUserDetails () {
      vm.editUser = true;
      angular.copy(vm.currentUserDetails, userDetailsCopy);
    }

    function saveUserDetails () {
      console.log($rootScope.User);

      $rootScope.User.$update(function (params) {
        vm.editUser = false;
        $mdToast.show(
          $mdToast.simple()
            .textContent('User details updated')
            .hideDelay(3000)
        );
        console.log('user details updated')
      });
    }

    function cancelUserEdit() {
      angular.copy(userDetailsCopy, vm.currentUserDetails);
      vm.editUser = false;
    }
  }
}

userController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$mdToast', 'userResourceFactory', 'activitiesResourceFactory'];

angular.module('fithub')
  .controller('userController', userController);
