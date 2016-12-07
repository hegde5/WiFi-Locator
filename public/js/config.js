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
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/"
            });

    }
})();

