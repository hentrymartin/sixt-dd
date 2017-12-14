/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */

angular.module('sixt', ['ngRoute'])
.config(function ($routeProvider) {
	'use strict';

	var routeConfig = {
		controller: 'AppCtrl',
		templateUrl: 'partials/app.html',
		controllerAs: 'vm'
	};

	$routeProvider
		.when('/app', routeConfig)
		.otherwise({
			redirectTo: '/app'
		});
});

angular
  .module('sixt')
  .controller('AppCtrl', ['$scope', function($scope) {
  var vm = this;

  vm.items = [
    {
      name: 'Hentry Martin',
      code: 1,
      isChecked: false,
    },
    {
      name: 'Rajesh Kumar',
      code: 2,
      isChecked: false,
    }
  ];

  vm.chosenItems = [];

  vm.onDrop = function(data) {
    console.log('dropped', data);
    var index = vm.items.map(function(item) {return item.code;}).indexOf(parseInt(data));
    var removedItems = vm.items.splice(index, index + 1);
    vm.chosenItems.push(removedItems[0]);
    if (!$scope.$$phase) $scope.$apply();
  };

  vm.moveItems = function() {
    for (var index = vm.items.length - 1; index >= 0; index--) {
      var item = vm.items[index];
      if (item.isChecked) {
        vm.chosenItems.push(item);
        vm.items.splice(index, index + 1);
      }
    }
  };

}]);
angular
  .module('sixt')
  .directive('draggableElement', function() {
    return {
      restrict: 'A',
      scope: {
        transferData: '='
      },
      link: function(scope, elem, attr) {
        angular.element(elem).attr("draggable", true);
        elem.bind("dragstart", function(event) {
          var data = scope.transferData ? scope.transferData : '';
          event.dataTransfer.setData('text', data);
        });
      }
    }
  });

angular
  .module('sixt')
  .directive('droppableElement', function() {
    return {
      restrict: 'A',
      scope: {
        onDrop: '&'
      },
      link: function(scope, elem, attr) {
        elem.bind("dragover", function(event) {
          event.preventDefault();
          event.stopPropagation();
        });

        elem.bind("drop", function(event) {
          event.preventDefault();
          event.stopPropagation();
          var data = event.dataTransfer.getData('text');
          if (scope.onDrop) scope.onDrop()(data);
        });
      }
    }
  });
