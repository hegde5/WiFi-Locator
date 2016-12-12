/**
 * Created by Vinay on 12/10/2016.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("FeedbackController", FeedbackController);

    function FeedbackController($location, FeedbackService, UserService) {

        var vm = this;
        vm.init = init;
        vm.submitFeedback = submitFeedback;
        $("#tubular-container").remove();
        $("#tubular-shield").css("z-index","0");
        function init() {
            UserService
                .getCurrentUser()
                .success(function (user) {
                    vm.user = user;
                })
        }
        init();

        function submitFeedback() {

            if(vm.feedback ===  undefined)
                vm.error = 'Please enter your suggestions before submitting';
            else
            {
                vm.feedback.user = vm.user._id;
                FeedbackService
                    .submitFeedback(vm.feedback)
                    .success(function (feedback) {
                        $('.modal').modal();
                        //$('#modal1').modal('close');
                        $location.url("/search")
                    })
            }

        }

    }


})();