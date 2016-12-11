/**
 * Created by Vinay on 12/2/2016.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var vm=this;
        vm.register = register;

        function register() {
            vm.error=null;
            if(!vm.user || !vm.user.email) vm.error = "Enter a valid email";
            else if(!vm.user || !vm.user.password) vm.error = "Enter a password";
            else if(!vm.user || (vm.user.password !== vm.user.confirmPassword)) vm.error = "Passwords don't match!";
            else {
                delete vm.user.confirmPassword;
                UserService
                    .register(vm.user)
                    .success(function(user) {
                        if(user) {
                            $rootScope.currentUser = user;
                            $location.url("/search");
                        }
                        else vm.error="Username already exists! Try logging in"
                    })
                    .error(function(err) {
                        console.log("Registration error: "+err);
                    });
            }
        }
    }

})();