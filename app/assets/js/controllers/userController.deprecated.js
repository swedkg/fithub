'use strict'

function userController ($scope, $state, $http, $cookies, userResourceFactory, activitiesResourceFactory, $resource, $timeout) {
  var self = this;

  var resource = userResourceFactory;
  var user, currentUser;
  var userActivities;

  $scope.isAuthenticated = false;
  $scope.showAddUser = true;
  $scope.login = login;
  $scope.editActivity = editActivity;
  $scope.isActivityEdit = false;

  function getUserList () {
    $scope.usersList = resource.query();
    // console.clear();
    console.log('getUserList', $scope.usersList)
  }

  getUserList();


  $scope.addUser = function () {
    user = new userResourceFactory();
    user.first_name = self.first_name;
    user.last_name = self.last_name;
    user.email = self.email;
    user.password = self.password;

    user.$save(function () {
      console.log('saved')
      getUserList();
      self.first_name = self.last_name = self.email = self.password = '';
    });
  };

  $scope.delete = function (user) {
    console.info(user, user.id)
    // user.$delete({
    //   id: user.id
    // }, getUserList());
    user.$delete(getUserList);
  };

  $scope.update = function (user) {
    console.info(user, user.id);
    $scope.user = user;
    self.first_name = user.first_name;
    self.last_name = user.last_name;
    self.email = user.email;
    self.password = user.password;
    $scope.showAddUser = false;

  };

  $scope.updateUser = function (user) {
    console.info($scope.user, user, user.id);
    user.$update(function () {
      console.log('updated')
      // getUserList();
      $scope.user = null;
      self.first_name = self.last_name = self.email = self.password = '';
      $scope.showAddUser = true;
    });
  }


  function login () {

  }





  function getUserActivities () {
    $scope.userActivities = activitiesResourceFactory.get();
    console.log($scope.userActivities)
  }

  function editActivity (activity) {
    $scope.isActivityEdit = true;
    console.log(activity)
  }


} // end of controller

userController.$inject = ['$scope', '$state', '$http', '$cookies', 'userResourceFactory', 'activitiesResourceFactory', '$resource', '$timeout'];

angular
  .module('fithub')
  .controller('userController', userController);
