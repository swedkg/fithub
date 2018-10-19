'use strict'

function logInController ($rootScope, $scope, $state, userResourceFactory) {

  var vm = this;
  vm.$onInit = onInit;

  function onInit () {

    var users = userResourceFactory;
    var usersList;

    vm.login = login;

    // (function getUserList () {
    //   usersList = users.query();
    //   // console.clear();
    //   console.log('getUserList', usersList)
    // })()

    vm.loginUser = {
      email: '',
      password: '',
      found: false
    };

    function login () {

      var User = userResourceFactory.save({
        email: vm.loginUser.email,
        password: vm.loginUser.password
      })

      User.$promise.then(console.log(User))

      return null;

      var user = usersList.filter(function (user) {
        return user.email == vm.loginUser.email && user.password == vm.loginUser.password
      })

      if (user.length > 0) {
        console.log('user found')
        // vm.loginUser.email = vm.loginUser.password = '';
        vm.loginUser.found = true;
        $rootScope.currentUser = user[0].id;
        $state.go('user', {
          // params: {
            id: $rootScope.currentUser
          // }
        });
        $rootScope.$emit('user login', vm.loginUser.found)
      } else {
        // vm.loginUser.email = vm.loginUser.password = '';
        vm.loginUser.found = false;
      }

      console.log($state)
    }

    $rootScope.$on('user logout', function (event, data) {
      console.log(arguments)
    })

    // RoR method
    // function login () {

    //   user = new userResourceFactory();

    //   self.currentUser = $scope.loginUser

    //   user.email = self.currentUser.email;
    //   user.password = self.currentUser.password;


    //   user.$save(function (response) {
    //     // response.authentication_token;

    //     if (user.$resolved === true) {
    //       // console.log(user, self, currentUser, $scope)
    //       $scope.loginUser = {};
    //       self.currentUser.token = response.authentication_token;
    //       $scope.isAuthenticated = true;

    //       // console.log(user)
    //       // $cookies.put("user_email", self.currentUser.email);
    //       // $cookies.put("user_token", self.currentUser.token);
    //     }
    //   })


    //   $timeout(function () {
    //     getUserActivities();
    //     console.log(user)
    //   }, 5000)


    // }
  }
}

logInController.$inject = ['$rootScope', '$scope', '$state', 'userResourceFactory'];

angular.module('fithub')
  .controller('logInController', logInController);
