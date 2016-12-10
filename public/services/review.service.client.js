/**
 * Created by prasadnm on 12/9/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        var api = {
            createReview        : createReview,
            markHelpful         : markHelpful,
            getReviewsForPlace  : getReviewsForPlace,
            getReviewsForUser   : getReviewsForUser
        };
        return api;

        function createReview(review) {
            return $http.post("/api/review",review);
        }

        function markHelpful(reviewId,userId) {
            return $http.put("/api/review/"+reviewId,userId);
        }

        function getReviewsForPlace(placeId) {
            return $http.get("/api/review/place/"+placeId);
        }

        function getReviewsForUser(userId) {
            return $http.get("/api/review/user/"+userId);
        }
    }
})();