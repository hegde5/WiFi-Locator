/**
 * Created by Vinay on 12/6/2016.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("PlaceSearchController", PlaceSearchController);

    function PlaceSearchController($location,SearchService, DisableSSL, UserService) {

        console.log("Hello from the PlaceSearchController");

        DisableSSL.activate();
        var vm = this;
        vm.init = init;
        vm.search = search;
        vm.logout = logout;


        function init()
        {
            $(".preloader-wrapper").hide();
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
                if(filterObj.zipcode !== undefined && filterObj.zipcode!="")
                {
                    $(".preloader-wrapper").show();
                    var zipcode = filterObj.zipcode;
                    SearchService
                        .searchByZipcode(zipcode)
                        .success(function (result) {
                            $(".preloader-wrapper").hide();
                            vm.resultSet = result.response;

                        })
                        .error(function (error) {
                            console.log(error.stack);
                        })
                }
                else if(filterObj.parameters && filterObj.parameters.radius !== undefined)
                {
                    $(".preloader-wrapper").show();
                    var radius = filterObj.parameters.radius;
                    console.dir(filterObj);
                    /*SearchService
                        .searchByLocation(radius)
                        .success(function (result) {
                            $(".preloader-wrapper").hide();
                            vm.resultSet = result.response;

                        })
                        .error(function (error) {
                            console.log(error.stack);
                        });*/
                }
                if(filterObj.name !== undefined && filterObj.name!="")
                {
                    $(".preloader-wrapper").show();
                    var name = filterObj.name;
                    SearchService
                        .searchByName(name)
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

        function logout() {
            UserService
                .logout()
                .success(function(status) {
                    if(status) $location.url("/login");
                })
                .error(function(err) {

                });
        }
    }

})();