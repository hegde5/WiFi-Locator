/**
 * Created by prasadnm on 12/3/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        phone: Number,
        password: String,
        address: {zipcode:String, city: String},
        dateCreated: {type:Date, default: Date.now},
        followers : [{type:mongoose.Schema.Types.ObjectId, ref:"user"}],
        favorites: [{type:mongoose.Schema.Types.ObjectId, ref:"place"}]
    },{collection: "user"});

    return UserSchema;
};