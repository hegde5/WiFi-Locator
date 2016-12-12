/**
 * Created by Vinay on 12/11/2016.
 */
(function(){
    angular
        .module("WifiLoc8rApp")
        .controller("ProfileController", ProfileController);


    function ProfileController(UserService, $routeParams, ReviewService) {
        var vm = this;
        vm.init = init;
        var months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
        var userId = $routeParams.uid;
        vm.addToFollowing = addToFollowing;
        vm.getFollowers = getFollowers;
        vm.getAllReviewsForUser = getAllReviewsForUser;

        function init() {
            $(document).ready(function(){
                $('.collapsible').collapsible();
            });
            UserService
                .findUserById(userId)
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
                });

            getCurrentSessionUser();
        }
        init();
        getFavoritesForUser();
        getFollowers();

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

        function getCurrentSessionUser() {
            UserService
                .getCurrentUser()
                .success(function (userObj) {
                    vm.sessionUser = userObj;
                    console.log("Session user");
                    console.log(vm.sessionUser);
                })
                .error(function (error) {
                    console.log(error.stack);
                })
        }


        function addToFollowing() {
            UserService
                .addToFollowing(vm.sessionUser._id, userId)
                .success(function (userObj) {
                    openModal();
                })
                .error(function (error) {
                    console.log(error.stack);
                })
        }

        function openModal() {
            $('.modal').modal();
        }
        
        function getFollowers() {
            UserService
                .getFollowers(userId)
                .success(function (userObj) {
                    vm.followers = userObj.followers;
                    console.dir(vm.followers);
                })
                .error(function (error) {
                    console.log(error.stack);
                })
            
        }

        function getAllReviewsForUser() {
            ReviewService
                .getReviewsForUser(vm.sessionUser._id)
                .success(function(reviews) {
                    vm.reviews = reviews;
                })
                .error(function(error) {
                    console.log("Could not get reviews\n"+error);
                });
        }


        
        
    }
    




})();