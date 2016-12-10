/**
 * Created by Vinay on 12/10/2016.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("AdminController", AdminController);


    function AdminController(FeedbackService) {

        var vm = this;
        vm.init = init;

        function init() {
            $('.collapsible').collapsible();

            FeedbackService
                .getAllFeedbacks()
                .success(function (feedbacks) {
                    vm.feedbacks = feedbacks;
                    console.dir(feedbacks);
                })
                .error(function (error) {

                })

        }
        init();



    }



})();