'use strict'

function aboutController () {
  var self = this;
  self.viewName = 'aboutController';
}

angular.module('fithub')
  .controller('aboutController', aboutController);
