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
      password: '@password'
    },
    {
      update: {
        method: 'PUT',
        url: url + ':id'
      },
      delete: {
        method: 'DELETE',
        // isArray: false,
        url: url + ':id'
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
      }
    })
}

userResourceFactory.$inject = ['$resource'];

angular
  .module('fithub')
  .factory('userResourceFactory', userResourceFactory)
