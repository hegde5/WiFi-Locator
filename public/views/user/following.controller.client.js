/**
 * Created by prasadnm on 12/11/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .controller("FollowingController", FollowingController);

    function FollowingController(UserService) {
        var vm=this;
        $("#tubular-container").remove();
        $("#tubular-shield").css("z-index","0");
        function init() {
            UserService
                .getCurrentUser()
                .success(function(user) {
                    vm.user = user;
                    getFollowing();
                })
                .error(function(error) {
                    console.log("Could not get current logged in user");
                });
        }
        init();

        function getFollowing() {
            UserService
                .getFollowing(vm.user._id)
                .success(function(userWithFollowees) {
                    console.dir(userWithFollowees);
                    vm.followees = userWithFollowees.following;
                })
                .error(function(error) {
                    conosle.log("Could not get followees");
                });
        }
    }
})();