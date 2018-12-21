'use strict';

// defaults:
// {
//   'get': { method: 'GET' },
//   'save': { method: 'POST' },
//   'query': { method: 'GET', isArray: true },
//   'remove': { method: 'DELETE' },
//   'delete': { method: 'DELETE' }
// };

function activityTypesFactory ($resource) {
  var url = 'http://localhost:3000/v1/activity_types/'

  return $resource(url, {}, {
    query: {
      method: 'GET',
      url: url,
      isArray: true,
      // headers: ':headers'
    },
  });
}

angular
  .module('fithub')
  .factory('activityTypesFactory', activityTypesFactory)
