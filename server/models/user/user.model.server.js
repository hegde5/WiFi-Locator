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

    function deleteUser(userId) {
        return removeUser(userId);
    }

    function removeUser(userId) {
        return UserModel
            .remove({_id: userId});
    }
};