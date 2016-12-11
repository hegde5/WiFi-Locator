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

            PlaceService
                .getPlaceByPlaceId(placeId)
                .success(function (result) {
                    vm.currentPlace = result;
                    console.log("Current place Resulrt");
                    console.dir(result);
                })
                .error(function (error) {
                    console.log(error.stack);
                });

            UserService
                .getCurrentUser()
                .success(function (user) {
                    if(user)
                    {
                        vm.user = user;
                        vm.favStatus = checkFavorites();
                    }
                })
                .error(function (error) {
                    console.log(error.stack);
                });
        }
        init();

        function addToFavorites() {

            var flag = checkFavorites();

            if(!flag)
            {
                var place = {
                    placeId: vm.place.ID,
                    placeSlug: vm.place.slug,
                    address: {
                        street: vm.place.street,
                        city: vm.place.city,
                        postal: vm.place.postal
                    },
                    title: vm.place.title,
                    thumbnail: vm.place.full_img
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

            if(vm.currentPlace === undefined || vm.currentPlace === '0')
            {
                console.log("In false");
                console.dir(vm.currentPlace);
                return false;
            }

            var favoritePlaces = vm.user.favorites;
            var favLen = favoritePlaces.length;
            for(var i = 0; i <favLen; i++)
            {
                if(favoritePlaces[i] === vm.currentPlace._id)
                {
                    console.log(favoritePlaces[i]);
                    console.log("-----");
                    console.log(vm.currentPlace._id);
                    return true;
                }

            }
            return false;
        }


        function setCarousel() {
            $(document).ready(function(){
                $('.carousel').carousel();
            });
        }
    }
})();