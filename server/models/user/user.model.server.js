/**
 * Created by prasadnm on 12/3/16.
 */
module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        setModel                : setModel,
        createUser              : createUser,
        findUserByEmail         : findUserByEmail,
        findUserById            : findUserById,
        updateUser              : updateUser,
        addToFavorites          : addToFavorites,
        getFavorites            : getFavorites,
        addToFollowing          : addToFollowing,
        getFollowers            : getFollowers,
        getFollowing            : getFollowing,
        deleteUser              : deleteUser
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(user) {
        return UserModel
            .create(user);
    }

    function findUserByEmail(email) {
        return UserModel
            .findOne({email: email});
    }

    function findUserById(userId) {
        return UserModel
            .findById(userId);
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                }
            );
    }

    function addToFavorites(userId, place){
        return model
            .placeModel
            .createPlace(place)
            .then(function (placeObj) {
                var placeId = placeObj._id;
                return UserModel
                    .findOne({
                        _id: userId
                    })
                    .then(function (userObj) {
                        if(!userObj.favorites)
                        {
                            userObj.favorites = [];
                        }

                        if(userObj.favorites.indexOf(placeId) == -1)
                            userObj.favorites.push(placeId);

                        return userObj.save();
                    })
            })
    }

    function getFavorites(userId) {
        return UserModel
            .findById({_id: userId})
            .populate('favorites')
            .exec();
    }

    function addToFollowing(userId, followingUserId) {
        return UserModel
            .findById(followingUserId)
            .then(function(userObj) {
                if(!userObj.followers) {
                    userObj.followers = [];
                }
                if(userObj.followers.indexOf(userId)==-1){
                    userObj.followers.push(userId);
                    return userObj.save();
                }
                return userObj;
            })
            .then(function(user) {
                return UserModel
                    .findById(userId)
                    .then(function(userObj) {
                        if(!userObj.following) {
                            userObj.following = [];
                        }
                        if(userObj.following.indexOf(followingUserId)==-1){
                            userObj.following.push(followingUserId);
                            return userObj.save();
                        }
                        return userObj;
                    })
            });
    }

    function getFollowers(userId) {
        return UserModel
            .findById(userId)
            .populate('followers');
    }

    function getFollowing(userId) {
        return UserModel
            .findById(userId)
            .populate('following');
    }

    function deleteUser(userId) {
        return removeUser(userId);
    }

    function removeUser(userId) {
        return UserModel
            .remove({_id: userId});
    }
};