/**
 * Created by prasadnm on 12/11/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .factory("CommentService", CommentService);

    function CommentService($http) {
        var api = {
            createComment       : createComment,
            getCommentById      : getCommentById,
            getCommentsForReview: getCommentsForReview,
            getCommentsForUser  : getCommentsForUser
        };
        return api;

        function createComment(comment) {
            return $http.post("/api/comment",comment);
        }

        function getCommentById(commentId) {
            return $http.get("/api/comment/"+commentId);
        }

        function getCommentsForReview(reviewId) {
            return $http.get("/api/comment/review/"+reviewId);
        }

        function getCommentsForUser(userId) {
            return $http.get("/api/comment/user/"+userId);
        }
    }
})();