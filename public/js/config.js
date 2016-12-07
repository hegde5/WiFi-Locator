/**
 * Created by Vinay on 11/27/2016.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/views/shared/landingpage.client.html",
                controller: "SharedController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/search",{
                templateUrl: "/views/places/placesSearch.view.client.html",
                controller: "PlaceSearchController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
	        .when("/login",{
                templateUrl:"/views/user/login.view.client.html",
                controller:"LoginController",
                controllerAs:"model"
            })
            .when("/forgotPassword",{
                templateUrl:"/views/user/forgotPassword.view.client.html",
                controller:"ForgotPasswordController",
                controllerAs:"model"
            })
            .otherwise({
                redirectTo: "/"
            });

        function checkLoggedIn($q, $location, UserService) {
            var deferred = $q.defer();
            UserService
                .checkLoggedIn()
                .success(function(user) {
                    if(user) {
                        deferred.resolve();
                    }
                    else {
                        deferred.reject();
                        $location.url("/login");
                    }
                });
            return deferred.promise;
        }
    }
})();

