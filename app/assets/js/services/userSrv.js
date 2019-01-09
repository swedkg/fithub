'use strict'


function userSrv ($rootScope, $cookies, userResourceFactory, $state) {

  var self = this;

  self.removeCookies = removeCookies;
  self.login = login;

  var User, responseStatus;

  function removeCookies () {
    $cookies.remove("user_email");
    $cookies.remove("user_token");
  }

  function login (email, password) {

    User = userResourceFactory.save({
      email: email,
      password: password
    }, function (value, responseHeaders, status, statusText) {
      responseStatus = status;

      if (responseStatus === 200) {
        buildUser();
      } else {
        notifyStatus(responseStatus);
      }

    }, function (value, responseHeaders, status, statusText) {
      responseStatus = response.status
    })

  }

  function buildUser () {
    User.$promise.then(function () {

      $rootScope.currentUser = User.user;
      $rootScope.User = User;
      $rootScope.authentication_token = User.authentication_token;
      delete User.authentication_token;

      $cookies.put("user_email", $rootScope.currentUser.email);
      $cookies.put("user_token", $rootScope.authentication_token);

      notifyStatus(responseStatus)
      $rootScope.$emit('user login', true)

    })
  }

  function notifyStatus (status) {
    $rootScope.$emit('login response status', responseStatus);
  }

  $rootScope.$on('user logout', function (event, data) {
    try {
      User.$logOut();
    } catch (err) { }
  })


}

userSrv.$inject = ['$rootScope', '$cookies', 'userResourceFactory', '$state'];

angular
  .module('fithub')
  .service('userSrv', userSrv);
