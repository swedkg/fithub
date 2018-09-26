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
  var url = 'http://localhost:3000/activities_types/'

  return $resource(url);
}

angular
  .module('fithub')
  .factory('activityTypesFactory', activityTypesFactory)
