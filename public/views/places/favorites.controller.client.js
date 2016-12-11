/**
 * Created by Vinay on 12/11/2016.
 */

(function() {
    angular
        .module("WifiLoc8rApp")
        .controller("FavoritesController", FavoritesController);


    function FavoritesController($routeParams, PlaceService, UserService) {

        var vm = this;
        vm.init = init;
        vm.setCarousel = setCarousel;

        function init() {
            UserService
                .getCurrentUser()
                .success(function (user) {
                    console.dir(user);
                    var userId = user._id;
                    UserService
                        .getCurrentUserFavorites(userId)
                        .success(function (userObj) {
                            console.log("Banthu banthu");
                            vm.currentUserPlaces = userObj.favorites;
                            console.dir(userObj);
                        })
                        .error(function (error) {
                            console.log(error.stack);
                        })
                })
                .error(function (error) {
                    console.log(error.stack);
                })
        }
        init();
        setCarousel();


        function setCarousel() {
            $(document).ready(function () {
                $('.carousel').carousel();
            });
        }
    }


})();