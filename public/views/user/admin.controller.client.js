/**
 * Created by Vinay on 12/10/2016.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("AdminController", AdminController);


    function AdminController(FeedbackService, $location) {

        var vm = this;
        vm.init = init;
        vm.getAllFeedbacks = getAllFeedbacks;
        vm.deleteFeedback = deleteFeedback;


        function init() {

            FeedbackService
                .getAllFeedbacks()
                .success(function (feedbacks) {
                    vm.feedbacks = feedbacks;
                })
                .error(function (error) {
                })

            $(document).ready(function () {
                $('.collapsible').collapsible();
            })
        }
        init();


        function getAllFeedbacks() {
            FeedbackService
                .getAllFeedbacks()
                .success(function (feedbacks) {
                    vm.feedbacks = feedbacks;
                })
                .error(function (error) {
                })
        }

        function deleteFeedback(feedbackId) {
            
            FeedbackService
                .deleteFeedback(feedbackId)
                .success(function (status) {
                    if(status)
                    {
                       getAllFeedbacks();
                    }
                })
                .error(function (error) {
                    console.log(error);
                })
        }



    }



})();