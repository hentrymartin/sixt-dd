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
