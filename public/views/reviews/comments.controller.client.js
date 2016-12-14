/**
 * Created by prasadnm on 12/11/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .controller("CommentController", CommentController);

    function CommentController($scope, UserService, CommentService) {
        var vm=this;
        vm.postComment = postComment;
        vm.getCommentsForReview = getCommentsForReview;
        $("#tubular-container").remove();
        $("#tubular-shield").css("z-index","0");
        function init()
        {
            vm.reviewId = $scope.review._id;
            UserService
                .getCurrentUser()
                .success(function(user) {
                    vm.user = user;
                })
                .error(function(err) {
                    console.log("Could not get current user\n"+err.stack);
                });
            getCommentsForReview();
        }
        init();

        function postComment() {
            vm.newComment.user = vm.user._id;
            vm.newComment.review = vm.reviewId;
            console.log(vm.newComment);
            CommentService
                .createComment(vm.newComment)
                .success(function(comment) {
                    getCommentsForReview();
                })
                .error(function(err) {
                    console.log("Could not create comment\n"+err.stack);
                });
        }

        function getCommentsForReview() {
            CommentService
                .getCommentsForReview(vm.reviewId)
                .success(function(reviewComments) {
                    vm.comments = reviewComments;
                })
        }
    }
})();