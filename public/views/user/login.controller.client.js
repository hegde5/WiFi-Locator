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
        localStorage.setItem("justOnce", "false");

        function init() {
            $("#tubular-container").remove();
            $("#tubular-shield").css("z-index","0");
            $(".button-collapse").sideNav({'closeOnClick': true});
            UserService
                .getCurrentUser()
                .success(function(user) {
                    if(user) {
                        $location.url("/search");
                    }
                })
                .error(function(err) {
                    console.log("Login init error: "+err.stack);
                });
        }
        init();

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
                        vm.error="Invalid credentials. Try again!";
                        console.log("Login error: "+err.stack);
                    });
            }
        }
    }

})();