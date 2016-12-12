/**
 * Created by prasadnm on 12/7/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .controller("PlaceDetailController", PlaceDetailController);

    function PlaceDetailController($routeParams, PlaceService, UserService) {
        var vm=this;
        vm.placeId = $routeParams.id;
        vm.addToFavorites = addToFavorites;


        function init()
        {
            vm.error=null;
            vm.favStatus = false;
            var placeId = vm.placeId;
            PlaceService
                .getPlace(placeId)
                .success(function(result) {
                    if(result.response.length>0) {
                        vm.place=result.response[0];
                    }
                    else vm.error="No places found with this ID";
                })
                .error(function(error) {
                    console.log(error.stack);
                });

            UserService
                .getCurrentUser()
                .success(function (user) {
                    if(user) {
                        vm.user = user;
                        PlaceService
                            .getPlaceByPlaceId(placeId)
                            .success(function (result) {
                                vm.currentPlace = result;
                                vm.favStatus = checkFavorites();
                            })
                            .error(function (error) {
                                console.log(error.stack);
                            });
                    }
                })
                .error(function (error) {
                    console.log(error.stack);
                });
        }
        init();

        function addToFavorites() {
            var flag = checkFavorites();

            if(!flag) {
                var place = {
                    placeId: vm.place.ID,
                    placeSlug: vm.place.slug,
                    address: {
                        street: vm.place.street,
                        city: vm.place.city,
                        postal: vm.place.postal
                    },
                    title: vm.place.title,
                    thumbnail: vm.place.thumbnail_img
                };

                UserService
                    .addToFavorites(vm.user._id, place)
                    .success(function (userObj) {
                        console.dir(userObj);
                    })
                    .error(function () {

                    });
            }
            vm.favStatus = true;
        }

        function checkFavorites() {
            //place was not found in DB which means nobody has marked this as favorite yet
            if(vm.currentPlace === undefined) {
                return false;
            }

            var favoritePlaces = vm.user.favorites;
            if(favoritePlaces.indexOf(vm.currentPlace._id)!=-1) {
                return true;
            }
            return false;
        }
    }
})();