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
