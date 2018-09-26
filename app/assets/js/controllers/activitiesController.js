'use strict'

function activitiesController ($rootScope, $timeout, $interval, activitiesResourceFactory, $resource, userResourceFactory, activityTypesFactory) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {

    vm.something = "activities here"
    vm.editActivity = editActivity;
    vm.saveActivity = saveActivity;
    vm.deleteActivity = deleteActivity;
    vm.addActivity = addActivity;
    vm.filterActivity = filterActivity;
    vm.sortBy = sortBy;
    vm.searchActivities = searchActivities;

    vm.activities = []
    vm.activitiesTypes = {};
    vm.activitesPlaceholder = {};
    vm.currentUserActivitiesTypes = [];
    vm.activitiesFilters = [];

    // TODO: remove hard coded user ID
    vm.currentUser = $rootScope.currentUser = 4
    vm.editMode = false;
    vm.reverse = false;
    vm.order = 'asc';
    vm.propertyName = 'id';
    vm.disableProgressBar = true;

    vm.simulateQuery = false;
    vm.isDisabled = false;

    // TODO: sorting, filtering presentation of single activity
    // TODO: datepicker
    // TODO: timepicker
    // TODO: graphs
    // TODO: remove contact, about

    if (typeof vm.currentUser == 'undefined')
      return null;



    // console.log(vm.currentUser, typeof vm.currentUser)

    // var limitActivities = activitiesResourceFactory.get({
    //   _start: 20,
    //   _limit: 10
    // })

    // var Activities = activitiesResourceFactory.query({
    //   // user: vm.currentUser
    // })

    // console.log(Activities, limitActivities)

    var ActivitiesTypes = activityTypesFactory.query()

    ActivitiesTypes.$promise.then(function (result) {
      var activitiesTypes = buildArrayFromResource(result)
      buildActivitiesFilter(activitiesTypes);
    })



    // build activitiesTypes object to fit the placeholder
    // everything should happen inside the promise
    // ActivitiesTypes.$promise.then(function (results) {
    //   angular.forEach(results, function (result) {
    //     vm.activitiesTypes[result.id] = {
    //       id: result.id,
    //       label: result.label
    //     }
    //     decorateType(result.id)
    //   })

    //   Activities.$promise.then(function (results) {
    //     angular.forEach(results, function (result) {
    //       try {
    //         vm.activitesPlaceholder[result.type] = vm.activitiesTypes[result.type].label
    //       } catch (err) {
    //         console.log(vm.activitiesTypes, result);
    //       }

    //       if (vm.currentUserActivitiesTypes.indexOf(result.type) === -1) {
    //         vm.currentUserActivitiesTypes.push(result.type);
    //         vm.activitiesFilters.push(vm.activitiesTypes[result.type])
    //       }
    //     })

    //     vm.activitiesFilters.unshift({
    //       id: 0,
    //       label: 'all'
    //     });

    //     // build a clean array of resources
    //     vm.activities = Object.keys(results).map(function (key) {
    //       if (!isNaN(key))
    //         return results[key];
    //     });

    //     vm.activities = vm.activities.filter(function (i) {
    //       return i !== undefined
    //     })

    //     vm.currentUserActivitiesTypes.sort()
    //     // console.log(vm.activities, vm.activitiesTypes);

    //   })
    // })

    function decorateType(id) {
      var className;
      switch (id) {
        case 1:
          className = 'icon-run'
          break;
        case 2:
          className = 'icon-bicycle'
          break;
        case 3:
          className = 'icon-swimming'
          break;
        case 4:
          className = 'icon-rowing'
          break;
        case 5:
          className = 'icon-baseball'
          break;
        case 6:
          className = 'icon-golf'
          break;
        case 7:
          className = 'icon-skiing'
          break;
        case 8:
          className = 'icon-boxing'
          break;
        case 9:
          className = 'icon-soccer'
          break;
        case 10:
          className = 'icon-climbing'
          break;
        case 11:
          className = 'icon-tabletennis'
          break;
        case 12:
          className = 'icon-badminton'
          break;
      }
      return className;
      // vm.activitiesTypes[id].className = className
    }

    function filterActivity (id) {
      vm.activityFilter = (id === 0) ? undefined : id
      vm.activities.refresh();
    }

    function sortBy(sortByProperty) {
      vm.reverse = (vm.sortByProperty === sortByProperty) ? !vm.reverse : false;
      vm.order = (vm.reverse) ? 'asc' : 'desc'
      vm.sortByProperty = sortByProperty;
      vm.activities.refresh();
    }

    function editActivity(activity) {
      console.log(activity)
      vm.editActivityId = activity.id;
      vm.editMode = true;


      // vm.currentActivity = Activities.filter(function (activity) {
      //   return activity.id == activityId
      // })

      // Activities = $resource('http://localhost:3000/activities_logs/', { id: '@id' })


      // activity = activitiesResourceFactory.query({
      //   id: activityId
      // }).$promise.then(function (act) {
      //   // console.log(act)
      // })

    }

    function saveActivity(activity) {
      // var activity = new activitiesResourceFactory()
      //  var act = activity.$get({
      //   id: activityId
      // });

      console.log(activity)
      // activity.content = 'content'
      activity.$update(function () {
        Activities = activitiesResourceFactory.query()
        vm.editActivityId = '';
        vm.currentActivity = {};
        vm.editMode = false;
      })

      // activity.$promise.then(function (param) {
      //   activity.content = 'content'
      //   activitiesResourceFactory.update(activity)
      // })

    }

    function deleteActivity(activity) {
      activity.$delete(function (params) {
        Activities = activitiesResourceFactory.query()
        vm.currentActivity = {}
        vm.editMode = false;
      })
    }

    function addActivity() {
      var newActivity = new activitiesResourceFactory();
      newActivity.$save(function () {
        Activities = activitiesResourceFactory.query(function () {
          console.log('finished')
          vm.currentActivity = Activities[Activities.length - 1]
          vm.editActivityId = vm.currentActivity.id
          vm.editMode = true;
        })
      })
    }

    function buildArrayFromResource(resource) {
      // build a clean array of resources
      var result = Object.keys(resource).map(function (key) {
        if (!isNaN(key))
          return resource[key];
      });

      result = result.filter(function (i) {
        return i !== undefined
      })
      return result;
    }

    function buildActivitiesFilter(activitiesTypes) {
      activitiesTypes.forEach(element => {

        var type = element.id
        // check if we alredy have this kind of filter
        var filterType = vm.activitiesFilters.filter(function (element) {
          return element.id == type
        })

        if (filterType.length == 0) {

          var activityType = ActivitiesTypes.filter(function (element) {
            return element.id == type
          })

          if (activityType.length > 0) var label = activityType[0].label;

          var className = decorateType(type);
          var filter = {
            id: type,
            label: label,
            className: className
          }
          vm.activitiesFilters.push(filter)
        }
      });

      // add "all" filter
      var filterAll = vm.activitiesFilters.filter(function (element) {
        return element.id == 0
      })

      if (filterAll.length == 0) {
        vm.activitiesFilters.unshift({
          id: 0,
          label: 'all'
        });
      }

      vm.activitiesFilters.sort(function (a, b) {
        return a.id - b.id
      })

    }

    /**
     * can we serch like this?
     */

    function searchActivities () {
      vm.disableProgressBar = false;
      vm.activities.refresh();
    }

    // In this example, we set up our model using a class.
    // Using a plain object works too. All that matters
    // is that we implement getItemAtIndex and getLength.
    var DynamicItems = function () {
      /**
       * @type {!Object<?Array>} Data pages, keyed by page number (0-index).
       */
      this.loadedPages = {};

      /** @type {number} Total number of items. */
      this.numItems = 0;

      /** @const {number} Number of items to fetch per request. */
      this.PAGE_SIZE = 20;

      this.results = []

      this.fetchNumItems_();
    };

    // Required.
    DynamicItems.prototype.getItemAtIndex = function (index) {
      var pageNumber = Math.floor(index / this.PAGE_SIZE);
      var page = this.loadedPages[pageNumber];

      if (page) {
        return page[index % this.PAGE_SIZE];
      } else if (page !== null) {
        this.fetchPage_(pageNumber);
      }
    };

    // Required.
    DynamicItems.prototype.getLength = function () {
      return this.numItems;
    };

    DynamicItems.prototype.fetchPage_ = function (pageNumber) {
      // Set the page to null so we know it is already being fetched.
      this.loadedPages[pageNumber] = null;

      // For demo purposes, we simulate loading more items with a timed
      // promise. In real code, this function would likely contain an
      // $http request.

      var Activities = activitiesResourceFactory.get({
        type: vm.activityFilter,
        q: vm.searchTerm,
        _page: pageNumber,
        _order: vm.order,
        _sort: vm.sortByProperty,
        _limit: this.PAGE_SIZE
      })

      Activities.$promise.then(angular.bind(this, function (results) {
        var resultsArray = buildArrayFromResource(results);
        this.loadedPages[pageNumber] = [];
        this.results = this.results.concat(resultsArray)

        var pageOffset = pageNumber * this.PAGE_SIZE;
        for (var i = pageOffset; i < pageOffset + resultsArray.length; i++) {
          this.loadedPages[pageNumber].push(this.results[i]);
        }
        this.pageNumber = pageNumber
        console.log('fetchPage_', pageNumber + 1, this.results);

      }));
    };

    DynamicItems.prototype.fetchNumItems_ = function () {
      var xTotalCount;
      var Activities = activitiesResourceFactory.get({
        type: vm.activityFilter,
        q: vm.searchTerm,
        _page: this.pageNumber,
        _order: vm.order,
        _sort: vm.sortByProperty,
        _limit: this.PAGE_SIZE
      }, function (data, headers) {
        xTotalCount = headers('x-total-count')
      })
      // For demo purposes, we simulate loading the item count with a timed
      // promise. In real code, this function would likely contain an
      // $http request.
      Activities.$promise.then(angular.bind(this, function () {
        this.numItems = xTotalCount;
        vm.disableProgressBar = true;
        console.log('fetchNumItems_', this.pageNumber);

      }));
    };

    DynamicItems.prototype.refresh = function () {
      this.loadedPages = {};
      this.numItems = 0;
      this.results = [];
      this.pageNumber = 0;
      this.fetchNumItems_();
    }

    vm.activities = new DynamicItems();

  }

  self.viewName = 'activitiesController';
}

activitiesController.$inject = ['$rootScope', '$timeout', '$interval', 'activitiesResourceFactory', '$resource', 'userResourceFactory', 'activityTypesFactory']

angular.module('fithub')
  .controller('activitiesController', activitiesController);
