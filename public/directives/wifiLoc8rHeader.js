/**
 * Created by prasadnm on 12/11/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .directive('wifiLoc8rHeader', wifiLoc8rHeader);

    function wifiLoc8rHeader() {

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {},
            templateUrl: '/directives/wifiLoc8rHeader.html',
            compile: function(element, attrs, linker) {
                return function(scope, element) {
                    linker(scope, function(clone) {
                        element.append(clone);
                    });
                };
            },
             controller: HeaderController,
             controllerAs: 'model'
        }
    }

    function HeaderController(UserService, $location) {
        var vm = this;
        vm.openModal = openModal;
        vm.logout = logout;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        $(document).ready(function() {
            $(".button-collapse").sideNav({'closeOnClick': true});
        });
        function openModal()
        {
            $('#modal1').modal();
        }

        function init()
        {
            $(".preloader-wrapper").hide();

            UserService
                .getCurrentUser()
                .success(function (user) {
                    vm.user = user;
                })
        }
        init();

        function logout() {
            UserService
                .logout()
                .success(function(status) {
                    if(status) $location.url("/");
                })
                .error(function(err) {

                });
        }

        function updateUser() {

            UserService
                .updateUser(vm.user,vm.user._id)
                .success(function (status) {
                    if(status)
                    {
                        $('#modal1').modal('close');
                    }
                })
                .error(function (err) {

                });

        }

        function deleteUser() {

            UserService
                .deleteUser(vm.user._id)
                .success(function (status) {
                    if(status)
                    {
                        $('#modal1').modal('close');
                        $location.url("/login");
                    }
                })
                .error(function (err) {

                });
        }
    }
})();