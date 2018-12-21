'use strict';

// defaults:
// {
//   'get': { method: 'GET' },
//   'save': { method: 'POST' },
//   'query': { method: 'GET', isArray: true },
//   'remove': { method: 'DELETE' },
//   'delete': { method: 'DELETE' }
// };

// http://localhost:3000/users/sign_in?user[email]=q@q.net&user[password]=12345678
// http://localhost:3000/users/sign_in?user[email]=dimitrios.giannopoulos@gmail.com&user[password]=12345678


function userResourceFactory ($resource) {
  var url = 'http://localhost:3000/users/';
  return $resource(
    url, {
      id: '@id',
      email: '@email',
      password: '@password',
      first_name: '@first_name',
      last_name: '@last_name'
    },
    {
      update: {
        method: 'POST',
        url: 'http://localhost:3000/user_update/'
      },
      delete: {
        method: 'DELETE',
        // isArray: false,
        url: ':id'
      },
      get: {
        method: 'GET',
        isArray: false,
        url: url + 'sign_in?user[email]=' + ':email' + '&user[password]=' + ':password'
      },
      save: {
        method: 'POST',
        // isArray: true,
        // to be used in RoR
        url: url + 'sign_in?user[email]=' + ':email' + '&user[password]=' + ':password'
      },
      logOut: {
        method: 'DELETE',
        url: url + 'sign_out'
      },
      register: {
        method: 'POST',
        url: 'http://localhost:3000/v1/users/' + '?' + 'email=' + ':email' + '&password=' + ':password' + '&first_name=' + ':first_name' + '&last_name=' + ':last_name'
      }
    })
}

userResourceFactory.$inject = ['$resource'];

angular
  .module('fithub')
  .factory('userResourceFactory', userResourceFactory)



// id: 11,
//   email: "sebastian@codingthesmartway.com",
//   created_at: "2018-10-11 18:31:53",
//   updated_at: "2018-10-11 18:31:53",
//   first_name: "Sebastian",
//   last_name: "Eschweiler"
