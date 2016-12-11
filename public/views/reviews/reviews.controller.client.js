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
            });
            UserService
                .getCurrentUser()
                .success(function(user) {
                    vm.user = user;
                });

            getAllReviews();
        }
        init();

        function getAllReviews() {
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
                                for(var r in reviews) {
                                    var d = new Date(reviews[r].dateReviewed);
                                    reviews[r].dateReviewed = months[d.getMonth()]+"-"
                                        +d.getDate()+", "+ d.getFullYear();
                                }
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

        function submitReview() {
            vm.reviewSubmission = null;
            vm.newReview.user = vm.user._id;
            vm.newReview.placeId = $routeParams.id;
            vm.newReview.rating = $('#reviewRating').val();
            ReviewService
                .createReview(vm.newReview)
                .success(function (review) {
                    getAllReviews();
                })
                .error(function (err) {
                    vm.reviewSubmission = err;
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