/**
 * Created by Vinay on 12/6/2016.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("PlaceSearchController", PlaceSearchController);

    function PlaceSearchController($location, PlaceService, DisableSSL, UserService) {

        DisableSSL.activate();
        var vm = this;
        vm.init = init;
        vm.search = search;

        function init()
        {
            $(".preloader-wrapper").hide();

            UserService
                .getCurrentUser()
                .success(function (user) {
                    vm.user = user;
                });

            // $.get("http://ipinfo.io", function(response) {
            //     //console.log(response.ip, response.country, response.loc);
            //     var loc = response.loc;
            //     var locArray = loc.split(",");
            //     vm.lat = locArray[0];
            //     vm.long = locArray[1];
            // }, "jsonp")
        }
        init();

        function search(filterObj) {
            vm.error=null;
            console.log("filterObj: "+ JSON.stringify(filterObj));

            if(filterObj===undefined ||
                (filterObj.name=="" && filterObj.zipcode=="") ||
                (!filterObj.name && filterObj.zipcode=="") ||
                (!filterObj.zipcode && filterObj.name=="")
            )
            {
                vm.error = "Please enter user search term";
            }
            else
            {
                if(filterObj.selected === "zipcode")
                {
                    $(".preloader-wrapper").show();
                    var zipcode = filterObj.text;
                    PlaceService
                        .searchPlacesByZipcode(zipcode)
                        .success(function (result) {
                            $(".preloader-wrapper").hide();
                            vm.resultSet = result.response;

                        })
                        .error(function (error) {
                            console.log(error.stack);
                        })
                }
                else if(filterObj.selected === "location")
                {
                    $(".preloader-wrapper").show();
                    var radius = filterObj.text;
                    PlaceService
                        .searchPlacesByLocation(vm.lat,vm.long,radius)
                        .success(function (result) {
                            $(".preloader-wrapper").hide();
                            vm.resultSet = result.response;

                        })
                        .error(function (error) {
                            console.log(error.stack);
                        });
                }
                else if(filterObj.selected === "name")
                {
                    $(".preloader-wrapper").show();
                    var name = filterObj.text;
                    PlaceService
                        .searchPlacesByName(name)
                        .success(function (result) {
                            $(".preloader-wrapper").hide();
                            vm.resultSet = result.response;

                        })
                        .error(function (error) {
                            console.log(error.stack);
                        })
                }

            }

        }
    }

})();