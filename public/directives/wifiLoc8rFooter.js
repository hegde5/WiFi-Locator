/**
 * Created by prasadnm on 12/11/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .directive('wifiLoc8rFooter', wifiLoc8rFooter);

    function wifiLoc8rFooter() {

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {},
            templateUrl: '/directives/wifiLoc8rFooter.html',
            compile: function(element, attrs, linker) {
                return function(scope, element) {
                    linker(scope, function(clone) {
                        element.append(clone);
                    });
                };
            },
            controller: FooterController,
            controllerAs: 'model'
        }
    }

    function FooterController($location) {
        var vm = this;

        function init() {
            console.log("here: "+$location.path());
            vm.currentYear = (new Date).getFullYear();
            vm.showSubmitFeedback = !($location.path()=="/login" || $location.path()=="/register" || $location.path()=="/loginRedirect");
        }
        init();
    }
})();