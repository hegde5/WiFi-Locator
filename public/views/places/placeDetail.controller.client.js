/**
 * Created by prasadnm on 12/7/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .controller("PlaceDetailController", PlaceDetailController);

    function PlaceDetailController($routeParams, $rootScope, PlaceService) {
        var vm=this;
        vm.submitReview = submitReview;

        function init()
        {
            $(document).ready(function(){
                $('.rating').addRating({fieldName:"reviewRating",fieldId:"reviewRating"});
            });
            vm.error=null;
            var placeId = $routeParams.id;
            PlaceService
                .getPlace(placeId)
                .success(function(result) {
                    if(result.response.length>0) vm.place=result.response[0];
                    else vm.error="Something went wrong";
                })
                .error(function(error) {
                    console.log(error.stack);
                });
        }
        init();

        function submitReview() {
            vm.newReview.rating = $('#reviewRating').val();
            vm.newReview.userId = $rootScope.currentUser._id;
            vm.newReview.placeId = $routeParams.id;

        }

    }
})();