/**
 * Created by prasadnm on 12/11/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .controller("FollowingController", FollowingController);

    function FollowingController(UserService) {
        var vm=this;

        function init() {
            UserService
                .getCurrentUser()
                .success(function(user) {
                    vm.user = user;
                })
                .error(function(error) {
                    console.log("Could not get current logged in user");
                });
            getFollowingDummy();
            //getFollowing();
        }
        init();

        function getFollowingDummy() {
            vm.followees = [
                {_id: "1",firstName:"John",lastName:"Doe",email:"s@g.com",
                    phone:"",dateCreated:"",followers:[]},
                {_id: "2",firstName:"",lastName:"",email:"",
                    phone:"",dateCreated:"",followers:[]},
                {_id: "3",firstName:"",lastName:"",email:"",
                    phone:"",dateCreated:"",followers:[]},
                {_id: "4",firstName:"",lastName:"",email:"",
                    phone:"",dateCreated:"",followers:[]},
                {_id: "5",firstName:"",lastName:"",email:"",
                    phone:"",dateCreated:"",followers:[]},
                {_id: "6",firstName:"",lastName:"",email:"",
                    phone:"",dateCreated:"",followers:[]},
                {_id: "7",firstName:"",lastName:"",email:"",
                    phone:"",dateCreated:"",followers:[]},
                {_id: "8",firstName:"",lastName:"",email:"",
                    phone:"",dateCreated:"",followers:[]},
                {_id: "9",firstName:"",lastName:"",email:"",
                    phone:"",dateCreated:"",followers:[]}
            ]
        }

        function getFollowing() {
            UserService
                .getFollowing(vm.user._id)
                .success(function(followees) {
                    vm.followees = followees;
                })
                .error(function(error) {
                    conosle.log("Could not get followees");
                });
        }
    }
})();