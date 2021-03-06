/**
 * Created by prasadnm on 12/7/16.
 */
(function() {
    angular
        .module("WifiLoc8rApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            register            : register,
            login               : login,
            findUserById        : findUserById,
            checkLoggedIn       : checkLoggedIn,
            checkAdmin          : checkAdmin,
            getCurrentUser      : getCurrentUser,
            updateUser          : updateUser,
            deleteUser          : deleteUser,
            addToFavorites      : addToFavorites,
            getFavoritesForUser : getFavoritesForUser,
            logout              : logout,
            addToFollowing      : addToFollowing,
            getFollowers        : getFollowers,
            getFollowing        : getFollowing
        };
        return api;

        function register(user) {
            return $http.post("/api/register",user);
        }

        function login(email, password) {
            var user = {
                email: email,
                password: password
            };
            return $http.post("/api/login",user);
        }

        function checkLoggedIn() {
            return $http.post("/api/checkLoggedIn");
        }

        function checkAdmin() {
            return $http.post("/api/checkAdmin");
        }
        
        function getCurrentUser() {
            return $http.get("/api/user");
        }
        
        function updateUser(user, userId) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);

        }

        function addToFavorites(userId, place) {
            var url = "/api/user/" + userId +"/favorites";
            return $http.post(url, place);
        }

        function getFavoritesForUser(userId) {
            var url = "/api/user/" + userId + "/favorites";
            return $http.get(url);
        }

        function addToFollowing(userId, followingUserId) {
            return $http.put("/api/user/"+userId+"/following", {followingUserId:followingUserId});
        }

        function getFollowers(userId) {
            return $http.get("/api/user/"+userId+"/followers");
        }

        function getFollowing(userId) {
            return $http.get("/api/user/"+userId+"/following");
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }
    }
})();