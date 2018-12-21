'use strict';

// defaults:
// {
//   'get': { method: 'GET' },
//   'save': { method: 'POST' },
//   'query': { method: 'GET', isArray: true },
//   'remove': { method: 'DELETE' },
//   'delete': { method: 'DELETE' }
// };

// http://localhost:3000/v1/activities/
// X_USER_EMAIL
// X_USER_TOKEN

// http://localhost:3000/activities_logs/?user=4

function activitiesResourceFactory ($resource) {
  // var url = 'http://localhost:3000/v1/activities/';

  var url = 'http://localhost:3000/v1/activities/';

  return $resource(
    url,
    {
      user_id: '@user_id',
      id: '@id',
      'type': '@type',
      'q': '@q',
      _page: '@_page',
      _start: '@_start',
      _end: '@_end',
      _limit: '@_limit',
      _sort: '@_sort',
      _order: '@_order'
    },
    {
      update: {
        method: 'PUT',
        url: url + '/' + ':id'
      },
      get: {
        method: 'GET',
        url: url,
        isArray: true,
        // headers: ':headers'
      },
      delete: {
        method: 'DELETE',
        url: url + '/' + ':id'
      },
      save: {
        method: 'POST',
        // isArray: true,
        // to be used in RoR
        // url: url + 'sign_in?user[email]=' + ':email' + '&user[password]=' + ':password'
      },
      create: {
        method: 'POST',
        url: url
      }
    })

}

activitiesResourceFactory.$inject = ['$resource'];

angular
  .module('fithub')
  .factory('activitiesResourceFactory', activitiesResourceFactory)
