/**
 * Created by Vinay on 12/11/2016.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("ProfileController", ProfileController);


    function ProfileController(UserService, $routeParams) {
        var vm = this;
        vm.init = init;
        var months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];

        function init() {
            UserService
                .getCurrentUser()
                .success(function (userObj) {
                    vm.user = userObj;

                    //vm.userId = userObj._id;
                    var d = new Date(vm.user.dateCreated);
                    vm.user.dateCreated = months[d.getMonth()]+"-"
                        +d.getDate()+", "+ d.getFullYear();
                    vm.followersLen = vm.user.followers.length;

                })
                .error(function (error) {
                    console.log(error.stack);
                })
        }
        init();
        getFavoritesForUser();

        function getFavoritesForUser() {

            var userId = $routeParams.uid;
            UserService
                .getCurrentUserFavorites(userId)
                .success(function (userObj) {
                    vm.userFavorites = userObj.favorites;
                    console.dir(vm.userFavorites);
                })
                .error(function (error) {
                    console.log(error.stack);
                })
        }
        
        
    }
    




})();