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