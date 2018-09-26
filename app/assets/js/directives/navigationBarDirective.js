'use strict'

function navigationBarCtrl ($rootScope, $scope) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit () {
    $rootScope.$on('user login', function (event, data) {
      $rootScope.isUserLoggedIn = vm.isUserLoggedIn = data;
      vm.currentUser = $rootScope.currentUser;
      console.log(arguments, $rootScope.isUserLoggedIn, $scope)
    })

    vm.logout = function () {
      // $rootScope.$emit('user logout', true)
      $rootScope.isUserLoggedIn = vm.isUserLoggedIn = false;
      $rootScope.currentUser = {}
      console.log($rootScope.isUserLoggedIn)
    }

  }
}

navigationBarCtrl.$inject = ['$rootScope', '$scope'];

function navigationBarDirective () {
  return {
    scope: {},
    restrict: 'E',
    controller: navigationBarCtrl,
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'assets/js/directives/templates/navigation-bar.html'
  }
}

navigationBarDirective.$inject = [];

angular
  .module('fithub')
  .directive('navigationBar', navigationBarDirective)
