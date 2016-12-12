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
                $('.modal').modal();
                $("#tubular-container").remove();
                $("#tubular-shield").css("z-index","0");
            });
            getCurrentSessionUser();
            UserService
                .findUserById(userId)
                .success(function (userObj) {
                    vm.user = userObj;
                    //vm.userId = userObj._id;
                    var d = new Date(vm.user.dateCreated);
                    vm.formattedDate = months[d.getMonth()]+"-"
                        +d.getDate()+", "+ d.getFullYear();

                    getFavoritesForUser();
                    getFollowers();
                    getAllReviewsForUser();
                })
                .error(function (error) {
                    console.log(error.stack);
                });

        }
        init();

        function getFavoritesForUser() {
            UserService
                .getFavoritesForUser(userId)
                .success(function (userObj) {
                    vm.userFavorites = userObj.favorites;
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
                })
                .error(function (error) {
                    console.log(error.stack);
                })
        }


        function addToFollowing() {
            UserService
                .addToFollowing(vm.sessionUser._id, userId)
                .success(function (userObj) {
                    vm.user=userObj;
                    getFollowers();
                })
                .error(function (error) {
                    console.log(error.stack);
                })
        }
        
        function getFollowers() {
            UserService
                .getFollowers(userId)
                .success(function (userObj) {
                    vm.followers = userObj.followers;
                })
                .error(function (error) {
                    console.log(error.stack);
                })
            
        }

        function getAllReviewsForUser() {
            ReviewService
                .getReviewsForUser(userId)
                .success(function(reviews) {
                    vm.reviews = reviews;
                })
                .error(function(error) {
                    console.log("Could not get reviews\n"+error);
                });
        }


        
        
    }
    




})();