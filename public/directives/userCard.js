/**
 * Created by prasadnm on 12/12/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .directive('userCard', userCard);

    function userCard() {

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {user: '='},
            templateUrl: '/directives/userCard.html',
            compile: function(element, attrs, linker) {
                return function(scope, element) {
                    linker(scope, function(clone) {
                        element.append(clone);
                    });
                };
            },
            controller: UserCardController,
            controllerAs: 'model'
        }
    }

    function UserCardController($scope) {
        var months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
        var vm = this;

        function init() {
            var d = new Date($scope.user.dateCreated);
            vm.dateJoined = months[d.getMonth()]+"-"
                +d.getDate()+", "+ d.getFullYear();
        }
        init();
    }
})();