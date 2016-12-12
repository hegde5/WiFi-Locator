/**
 * Created by prasadnm on 12/10/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($routeParams, $scope, PlaceService, UserService, ReviewService) {
        var months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
        var vm=this;
        vm.submitReview = submitReview;
        vm.getAllReviews = getAllReviews;
        vm.markHelpful = markHelpful;

        function init()
        {
            $(document).ready(function(){
                $('.rating').addRating({fieldName:"reviewRating",fieldId:"reviewRating"});
                $('.collapsible').collapsible();
                $("#tubular-container").remove();
                $("#tubular-shield").css("z-index","0");
            });
            UserService
                .getCurrentUser()
                .success(function(user) {
                    vm.user = user;
                });
            PlaceService
                .getPlace($routeParams.id)
                .success(function(result) {
                    if(result.response.length>0) {
                        vm.place=result.response[0];
                        getAllReviews();
                    }
                    else vm.error="Could not fetch details from workfrom.co";
                })
                .error(function(error) {
                    console.log(error.stack);
                });
        }
        init();

        function getAllReviews() {
            vm.error=null;
            PlaceService
                .getPlaceByPlaceId(vm.place.ID)
                .success(function(place) {
                    if(place) {
                        ReviewService
                            .getReviewsForPlace(place._id)
                            .then(function(reviews) {
                                /*TODO figure out why the response is structured like this
                                *  - maybe because of nesting these calls?*/
                                vm.reviews = reviews.data;
                            });
                    }
                })
                .error(function(error) {
                    console.log(error.stack);
                });
        }

        function submitReview() {
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
            PlaceService
                .savePlace(place)
                .success(function(place) {
                    vm.newReview.user = vm.user._id;
                    vm.newReview.place = place._id;
                    vm.newReview.rating = $('#reviewRating').val();
                    ReviewService
                        .createReview(vm.newReview)
                        .success(function (review) {
                            getAllReviews();
                        })
                })
                .error(function (err) {
                    console.log("Review Submission error: "+err);
                });
        }

        function markHelpful(reviewId, usersMarkedHelpful) {
            var userId = vm.user._id;
            if(!usersMarkedHelpful.includes(userId)) {
                ReviewService
                    .markHelpful(reviewId,vm.user._id)
                    .success(function(review) {
                        getAllReviews();
                    })
                    .error(function(err) {
                        console.log("markHelpful error: "+err);
                    });
            }
        }
    }
})();