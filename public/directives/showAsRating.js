/**
 * Created by prasadnm on 12/12/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .directive('showAsRating', showAsRating);

    function showAsRating() {

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {rating: '='},
            templateUrl: '/directives/showAsRating.html',
            compile: function(element, attrs, linker) {
                return function(scope, element) {
                    linker(scope, function(clone) {
                        element.append(clone);
                    });
                };
            }
        }
    }
})();