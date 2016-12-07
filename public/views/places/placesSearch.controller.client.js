/**
 * Created by Vinay on 12/6/2016.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("PlaceSearchController", PlaceSearchController);

    function PlaceSearchController($location,SearchService, DisableSSL) {

        console.log("Hello from the PlaceSearchController");

        DisableSSL.activate();
        var vm = this;
        vm.init = init;
        vm.search = search;


        function init()
        {
            $(".preloader-wrapper").hide();
        }
        init();

        function search(filterObj) {
            console.log(filterObj);

            if(filterObj === undefined)
            {
                vm.error = "Please enter user search term";
            }
            else
            {
                if(filterObj.zipcode !== undefined)
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

            }






        }
    }

})();