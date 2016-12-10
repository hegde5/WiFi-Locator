/**
 * Created by dhanush on 12/3/16.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;

        function login() {
            vm.error = null;
            if(!vm.email || !vm.password) vm.error="Both Email and Password is required to login!";

            if(!vm.error) {
                UserService
                    .login(vm.email, vm.password)
                    .success(function(user) {
                        if(user){
                            $rootScope.currentUser = user;
                            $location.url("/search");
                        }
                        else vm.error="Invalid credentials. Try again!";
                    })
                    .error(function(err) {
                        console.log("Login error: "+err.stack);
                    });
            }
        }
    }

})();