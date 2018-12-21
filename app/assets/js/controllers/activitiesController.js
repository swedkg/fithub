'use strict'

function activitiesController ($rootScope, $timeout, $mdDialog, activitiesResourceFactory, $resource, userResourceFactory, activityTypesFactory, $state, $mdToast, userSrv) {
  var vm = this;



  if ($rootScope.isUserLoggedIn === false) {
    $state.go('home');
    return null;
  } else {
    vm.$onInit = onInit;
  }


  function onInit () {


    console.log($rootScope);


    vm.something = "activities here"
    vm.editActivity = editActivity;
    vm.saveActivity = saveActivity;
    vm.deleteActivity = deleteActivity;
    vm.filterActivity = filterActivity;
    vm.sortBy = sortBy;
    vm.orderBy = orderBy;
    vm.searchActivities = searchActivities;
    vm.addActivity = addActivity;
    vm.viewActivity = viewActivity;
    vm.convertDate2Epoch = convertDate2Epoch;
    vm.convertDuration2Epoch = convertDuration2Epoch;
    vm.openFilterActivitiesMenu = openFilterActivitiesMenu;
    vm.openOrderActivitiesMenu = openOrderActivitiesMenu;

    vm.activities = []
    vm.activitiesTypes = {};
    vm.activitesPlaceholder = {};
    vm.currentUserActivitiesTypes = [];
    vm.activitiesFilters = [];
        // TODO: remove hard coded user ID
    // vm.currentUser = $rootScope.currentUser = 4


    // vm.addActivity = false;
    vm.isEditActivity = false;
    vm.isAddActivity = false
    vm.reverse = false;
    vm.order = 'desc';
    vm.disableProgressBar = true;
    vm.activityFilter = 0;
    vm.sortByProperty = 'date';
    vm.sortByPropertyList = [
      {type: 'date', label: 'date'},
      {type: 'title', label: 'title' },
      {type: 'activity_type_id', label: 'type' },
      {type: 'duration', label: 'duration' }
    ];


    try {
      vm.currentUser = $rootScope.currentUser.id
    } catch (err) {

    }

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
      vm.activityFilter = (id === 0) ? 0 : id
      vm.activities.refresh();
    }

    function sortBy(sortByProperty) {
      // vm.reverse = (vm.sortByProperty === sortByProperty) ? !vm.reverse : false;
      // vm.order = (vm.reverse) ? 'asc' : 'desc'
      vm.sortByProperty = sortByProperty;
      vm.activities.refresh();
    }

    function orderBy(order) {
      vm.order = order
      vm.activities.refresh();
    }

    function editActivity(activity) {
      console.log(activity)
      vm.editActivityId = activity.id;
      vm.isEditActivity = true;


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

      delete activity.filterDate;
      delete activity.filterDuration;
      activity.$update(function (value, responseHeaders, status, statusText) {
        console.log(arguments);
        if (status === 200) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('The activity was updated')
              .hideDelay(3000)
          );
        }
        vm.activities.refresh();
        vm.isEditActivity = false;
        activity.filterDate = new Date(activity.date);
        activity.filterDuration = new Date(activity.duration);
      })

      // activity.$promise.then(function (param) {
      //   activity.content = 'content'
      //   activitiesResourceFactory.update(activity)
      // })

    }

    function deleteActivity (activity) {

      console.log(activity);
      // function (value, responseHeaders, status, statusText) {
      //   xTotalCount = responseHeaders('X-Total-Count')
      // }
      activity.$delete(function (value, responseHeaders, status, statusText) {
        console.log(arguments);
        vm.activities.refresh();
        if (status === 200) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('The activity was deleted')
              .hideDelay(3000)
          );
        }
        // Activities = activitiesResourceFactory.query()
        // vm.currentActivity = {}
        // vm.isEditActivity = false;
      })
    }

    function addActivity(ev) {
      $mdDialog.show({
        locals: {
          userId: vm.currentUser,
          activitiesFilters: vm.activitiesFilters
        },
        bindToController: true,
        controller: addActivityController,
        templateUrl: '/assets/views/activities-show.html',
        // parent: angular.element(document.body),
        fullscreen: false,
        targetEvent: ev,
        clickOutsideToClose: true,
      })
    }

    function viewActivity(ev, activity) {
      // console.log(arguments);
      var parent = angular.element(document.body);

      $mdDialog.show({
        locals: {
          activity: activity,
          activitiesFilters: vm.activitiesFilters,
          isEditActivity: vm.isEditActivity
        },
        bindToController: true,
        controller: viewActivityController,
        templateUrl: '/assets/views/activities-show.html',
        parent: parent,
        targetEvent: ev,
        fullscreen: false,
        clickOutsideToClose: true,
        onRemoving: function ($event) {
          vm.activities.refresh()
        }
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
      vm.disableProgressBar = false;
      // Set the page to null so we know it is already being fetched.
      this.loadedPages[pageNumber] = null;

      // For demo purposes, we simulate loading more items with a timed
      // promise. In real code, this function would likely contain an
      // $http request.

      var activityFilter = (vm.activityFilter === 0) ? '0' : vm.activityFilter;

      var Activities = activitiesResourceFactory.get({
        type: activityFilter.toString(),
        q: vm.searchTerm,
        // user_id: vm.currentUser,
        _page: pageNumber + 1,
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
        vm.disableProgressBar = true;
      }));
    };

    DynamicItems.prototype.fetchNumItems_ = function () {
      var xTotalCount;
      var activityFilter = (vm.activityFilter === 0) ? '0' : vm.activityFilter;
      var Activities = activitiesResourceFactory.get({
        type: activityFilter.toString(),
        q: vm.searchTerm,
        // user_id: vm.currentUser,
        // _page: this.pageNumber,
        _order: vm.order,
        _sort: vm.sortByProperty,
        _limit: this.PAGE_SIZE
      }, function (value, responseHeaders, status, statusText ) {
        xTotalCount = responseHeaders('X-Total-Count')
      })
      // For demo purposes, we simulate loading the item count with a timed
      // promise. In real code, this function would likely contain an
      // $http request.
      Activities.$promise.then(angular.bind(this, function () {
        this.numItems = xTotalCount;
        vm.disableProgressBar = true;
      }));
    };

    DynamicItems.prototype.refresh = function () {
      this.loadedPages = {};
      this.numItems = 0;
      this.results = [];
      this.pageNumber = undefined;
      this.fetchNumItems_();
    }

    vm.activities = new DynamicItems();

    function openFilterActivitiesMenu ($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    function openOrderActivitiesMenu ($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    function convertDate2Epoch(date) {
      return new Date(date).getTime();
    }
    function convertDuration2Epoch (date) {
      return new Date(date).getTime();
    }

    function addActivityController ($scope, $mdDialog, activitiesResourceFactory) {
      var self = this;
      $scope.newActivity = {};
      $scope.isViewActivity = false;
      $scope.isAddActivity = true;
      $scope.user = $rootScope.currentUser
      // TODO: remove hard coded user ID
      $scope.newActivity.user = self.userId;
      $scope.activitiesFilters = self.activitiesFilters.slice(1, self.activitiesFilters.length);

      // console.log($scope, vm);
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.addActivity = function () {
        // return null;
        var NewActivity = new activitiesResourceFactory();
        NewActivity.user_id = $scope.user.id;
        NewActivity.title = $scope.activity.title;
        NewActivity.date = $scope.activity.filterDate.getTime();
        NewActivity.activity_type_id = $scope.activity.activity_type_id;
        NewActivity.duration = $scope.activity.filterDuration;
        NewActivity.comment = $scope.activity.comment;
        console.log(NewActivity);

        NewActivity.$create(function () {
          console.log('finished')
          $scope.hide()
          vm.activities.refresh();
        })
      }

    }

    function viewActivityController ($scope, $mdDialog, $state, $filter) {
      var self = this;

      $scope.isViewActivity = true;
      $scope.isEditActivity = false;
      $scope.activity = self.activity;
      $scope.activitiesFilters = self.activitiesFilters;
      console.log($scope.activity);

      $scope.activity.filterDate = $filter('date')($scope.activity.date, 'd MMM, y H:mm');
      // $scope.activity.filterDuration = $filter('date')($scope.activity.duration, 'd MMM,y HH:MM:ss');
      $scope.activity.filterDuration = new Date($scope.activity.duration);
      $scope.convertDate2Epoch = function (date) {
        $scope.activity.date = vm.convertDate2Epoch(date)
      }
      $scope.convertDuration2Epoch = function (date) {
        $scope.activity.duration = vm.convertDuration2Epoch(date)
        $scope.activity.filterDuration = new Date($scope.activity.duration);
      }
      var activityCopy = angular.copy(self.activity);

      // {{activity.date | date:'MMM d, y H:m'}}
      $scope.activitiesFilters = self.activitiesFilters.slice(1, self.activitiesFilters.length);



      // TODO: remove hard coded user ID
      $scope.user = $rootScope.currentUser
      // console.log(self, $scope);

      $scope.reset = function () {
        $scope.activity.title = activityCopy.title;
        $scope.activity.date = activityCopy.date;
        $scope.activity.filterDate = $filter('date')(activityCopy.date, 'MMM d, y H:m');
        $scope.activity.duration = activityCopy.duration;
        $scope.activity.filterDuration = activityCopy.filterDuration;
        $scope.activity.comment = activityCopy.comment;
        $scope.activity.activity_type_id = activityCopy.activity_type_id;
      }

      $scope.edit = function () {
        $scope.isEditActivity = true;
      }

      $scope.saveActivity = function (activity) {
        vm.saveActivity(activity);
        $scope.hide();
      }

      $scope.delete = function (activity) {
        vm.deleteActivity(activity)
        $scope.hide();
      }

      // $state.go('activities', {
      //   id: $scope.activity.id
      // })

      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };


    }
  }

  self.viewName = 'activitiesController';
}

activitiesController.$inject = ['$rootScope', '$timeout', '$mdDialog', 'activitiesResourceFactory', '$resource', 'userResourceFactory', 'activityTypesFactory', '$state', '$mdToast', 'userSrv']

angular.module('fithub')
  .controller('activitiesController', activitiesController);
