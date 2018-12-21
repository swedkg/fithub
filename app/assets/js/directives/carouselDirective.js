'use strict'

function carouselCtrl ($scope) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit () {

    vm.carousel = [
      {
        imageUrl: 'assets/img/running.jpg',
        title: 'Pariatur laborum fugiat minim id nostrud proident.',
        message: 'Velit laboris aliqua in ut do est qui adipisicing non.'
      },
      {
        imageUrl: 'assets/img/swimming.jpg',
        title: 'Nostrud dolor aute et anim minim voluptate.',
        message: 'Laborum labore laboris exercitation ex esse.'
      },
      {
        imageUrl: 'assets/img/trekking.jpg',
        title: 'Labore culpa est elit anim excepteur ipsum fugiat.',
        message: 'Ex consequat consequat dolore laboris excepteur anim dolore sint.'
      },
    ]

    angular.element(document).ready(function () {
      document.getElementsByClassName('carousel-item')[0].className = "carousel-item active";
      // document.getElementsByClassName('carousel-indicator')[0].className = "carousel-indicator active ng-scope";

      $('.carousel').carousel({
        ride: 'carousel',
        interval: 5000,
        pause: false
      });

    });

    vm.$onDestroy = function () {
      $('.carousel').carousel('dispose')
    }

  }

}

carouselCtrl.$inject = ['$scope'];

function carouselDirective () {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'assets/js/directives/templates/carousel.html',
    controller: carouselCtrl,
    controllerAs: 'vm',
    bindToController: true
  }
}

carouselDirective.$inject = [];

angular
  .module('fithub')
  .directive('carousel', carouselDirective)
