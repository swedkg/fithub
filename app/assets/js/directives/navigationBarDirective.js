'use strict'

function navigationBarCtrl ($rootScope, $scope, $state, $window, utilsFactory) {
  var vm = this;
  vm.$onInit = onInit;
  var toggler = document.querySelector('.navbar-toggler')

  function onInit () {
    $rootScope.isUserLoggedIn = false;
    $rootScope.$on('user login', function (event, data) {
      $rootScope.isUserLoggedIn = vm.isUserLoggedIn = data;
      vm.currentUser = $rootScope.currentUser;
      console.log(arguments, $rootScope.isUserLoggedIn, $scope)
    })

    vm.logout = function () {
      $rootScope.$emit('user logout', true)
      $rootScope.isUserLoggedIn = vm.isUserLoggedIn = false;
      $rootScope.currentUser = {}
      console.log($rootScope.isUserLoggedIn)
    }


    function handleWindowScroll (params) {
      var top = window.pageYOffset || document.documentElement.scrollTop;
      (top > 0) ?
        document.querySelector('navigation-bar header').classList.add('is-stuck') :
        document.querySelector('navigation-bar header').classList.remove('is-stuck');
    }


    function hideBackdrop() {
      var backdrop = document.querySelector('#backdrop');
      backdrop.classList.remove('display-block');
      backdrop.classList.add('display-none');
      document.querySelector('navigation-bar header').classList.remove('is-stuck');
    }

    function showBacdrop(params) {
      var backdrop = document.querySelector('#backdrop');
      backdrop.classList.remove('display-none');
      backdrop.classList.add('display-block');
      document.querySelector('navigation-bar header').classList.add('is-stuck');
    }

    function handleNavbarToggleClick () {
      var expanded = document.querySelector('.navbar-toggler').getAttribute('aria-expanded');

      if (expanded === "true") {
        hideBackdrop()
      } else if (expanded === "false") {
        showBacdrop()
      }

    }

    angular.element(toggler).on('click', handleNavbarToggleClick);
    angular.element(document.querySelector('.navbar-brand')).on('click', hideBackdrop);
    angular.element($window).on('scroll', handleWindowScroll);

    utilsFactory.replaceSvg();

    $scope.$watch(function () {
      return $state.$current.name
    }, function (newVal, oldVal) {
      $scope.navBarClass = newVal;
      hideBackdrop();
    })

  } // end of onInit
}

navigationBarCtrl.$inject = ['$rootScope', '$scope', '$state', '$window', 'utilsFactory'];

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
