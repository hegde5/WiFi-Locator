/**
 * Created by prasadnm on 12/11/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .controller("FooterController", FooterController);

    function FooterController() {
        var vm = this;

        function init() {
            vm.currentYear = (new Date).getFullYear();
        }
        init();
    }
})();