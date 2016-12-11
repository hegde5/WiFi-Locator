/**
 * Created by prasadnm on 12/7/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .controller("PlaceDetailController", PlaceDetailController);

    function PlaceDetailController($routeParams, PlaceService) {
        var vm=this;

        function init()
        {
            vm.error=null;
            var placeId = $routeParams.id;
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
        }
        init();
    }
})();