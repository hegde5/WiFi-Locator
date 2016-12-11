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
            .when("/register", {
                templateUrl: "/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/search",{
                templateUrl: "/views/places/placesSearch.view.client.html",
                controller: "PlaceSearchController",
                controllerAs: "model"
            })
            .when("/place/:id",{
                templateUrl:"/views/places/placeDetail.view.client.html",
                controller:"PlaceDetailController",
                controllerAs:"model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid",{
                templateUrl:"/views/user/user.profile.client.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/user/feedback",{
                templateUrl:"/views/feedback/feedback.view.client.html",
                controller:"FeedbackController",
                controllerAs:"model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin/feedback",{
                templateUrl:"/views/user/admin.feedback.view.client.html",
                controller:"AdminController",
                controllerAs:"model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/loginRedirect",{
                templateUrl:"/views/shared/loginRedirect.view.client.html",
                controller:"SharedController",
                controllerAs:"model"
            })
            .when("/favorites",{
                templateUrl:"/views/places/favorites.view.client.html",
                controller:"FavoritesController",
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
                        $location.url("/loginRedirect");
                    }
                });
            return deferred.promise;
        }

        function checkAdmin($q, $location, UserService) {
            var deferred = $q.defer();
            UserService
                .checkAdmin()
                .success(function(user) {
                    if(user) {
                        deferred.resolve();
                    }
                    else {
                        deferred.reject();
                        $location.url("/loginRedirect");
                    }
                });
            return deferred.promise;
        }
    }
})();

