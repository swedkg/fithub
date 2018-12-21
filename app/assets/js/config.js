angular
  .module('fithub')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {


    $httpProvider.interceptors.push(function ($cookies) {
      return {
        'request': function (config) {
          config.headers['X-USER-EMAIL'] = $cookies.get("user_email");
          config.headers['X-USER-TOKEN'] = $cookies.get("user_token");
          return config;
        }
      };
    });


    $stateProvider
      .state('home', {
        url: '/',
        controller: 'homeController as ctrl',
        templateUrl: 'assets/views/home.html'
      })
      .state('about', {
        url: '/about',
        controller: 'aboutController as ctrl',
        templateUrl: '/assets/views/about.html'
      })
      .state('contact', {
        url: '/contact',
        // controller: 'logInController as ctrl',
        templateUrl: '/assets/views/contact.html'
      })
      .state('user', {
        url: '/user/:id',
        // controller: 'userController as ctrl',
        params: {
          id: null
        },
        templateUrl: '/assets/views/user.html'
      })
      .state('activities', {
        url: '/activities',
        // controller: 'activitiesController as ctrl',
        templateUrl: '/assets/views/activities.html'
      })
      .state('login', {
        url: '/user/login',
        // controller: 'logInController as ctrl',
        templateUrl: '/assets/views/login.html'
      })
      .state('signup', {
        url: '/user/signup',
        // controller: 'signUpController as ctrl',
        templateUrl: '/assets/views/signup.html'
      })

    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/');

    // $locationProvider.html5Mode({
    //   enabled: false,
    //   requireBase: true
    // });

  }).run(function ($rootScope, $state) {
    $rootScope.$state = $state;
  })
