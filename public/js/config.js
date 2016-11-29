/**
 * Created by Vinay on 11/27/2016.
 */
(function() {
    angular
        .module("WifiLoc8rApp", [])
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/views/shared/landingpage.client.html",
                controller: "SharedController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/"
            });

    }
})();

