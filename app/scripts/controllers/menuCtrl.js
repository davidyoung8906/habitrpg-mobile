'use strict';

/**
 * The menu controller:
 * - sets the menu options, should we do it dynamic so it generates the menu like: width = 1/elements * 100 ?
 * - exposes the model to the template and provides event handlers
 */

habitrpg.controller('MenuCtrl',
  ['$scope', '$rootScope', '$location',
  function($scope, $rootScope, $location) {

  $scope.swiperight = function(){
    $scope.menuopen = true;
  }

  $scope.swipeleft = function(){
    $scope.menuopen = false;
  }

  $scope.menuClick = function(button) {
    $scope.menuopen = false;
    $location.url(button.link);
  }

  /**
   * Show title according to the location
   */
  $rootScope.$on('$routeChangeSuccess', function(){
    var found = _.find($scope.nav, function(obj){
      return obj.link === $location.path();
    });
    if (found) {
      $rootScope.taskContext = {
        name: found.name,
        type: found.link.substr(1) // remove trailing /
      };
      $rootScope.menuopen = false;
    }
  });

  $scope.nav = [
    { link:'/habit',     name:'Habits'  },
    { link:'/daily',     name:'Dailies' },
    { link:'/todo',      name:'Todos'   },
    { link:'/reward',    name:'Rewards' },
    { link:'/profile',   name:'Profile' },
    { link:'/settings',  name:'Settings'}
  ]

  $('#main_nav').css('height', $(window).height())
  $('#wrapper').css('height', $(window).height())

  }
]);
