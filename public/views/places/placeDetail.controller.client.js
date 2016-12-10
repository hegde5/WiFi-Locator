/**
 * Created by prasadnm on 12/7/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .controller("PlaceDetailController", PlaceDetailController);

    function PlaceDetailController($routeParams, $location, PlaceService, UserService, ReviewService) {
        var vm=this;
        vm.submitReview = submitReview;

        function init()
        {
            $(document).ready(function(){
                $('.rating').addRating({fieldName:"reviewRating",fieldId:"reviewRating"});
                $('.collapsible').collapsible();
            });
            vm.error=null;
            var placeId = $routeParams.id;
            PlaceService
                .getPlace(placeId)
                .success(function(result) {
                    if(result.response.length>0) {
                        vm.place=result.response[0];
                        ReviewService
                            .getReviewsForPlace(vm.place.ID)
                            .success(function(reviews) {
                                vm.reviews = reviews;
                            })
                            .error(function(err) {
                                vm.error = "Could not fetch Reviews";
                                console.log(err);
                            })
                    }
                    else vm.error="Something went wrong";
                })
                .error(function(error) {
                    console.log(error.stack);
                });
        }
        init();

        function submitReview() {
            vm.reviewSubmission = null;
            UserService
                .getCurrentUser()
                .success(function (user) {
                    vm.newReview.user = user._id;
                    vm.newReview.placeId = $routeParams.id;
                    vm.newReview.rating = $('#reviewRating').val();
                    ReviewService
                        .createReview(vm.newReview)
                        .success(function (review) {
                            $location.url('#/place/' + review.placeId);
                        });
                })
                .error(function (err) {
                    vm.reviewSubmission = err;
                });
        }

    }
})();