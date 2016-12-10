/**
 * Created by prasadnm on 12/8/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var FeedbackSchema = mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        title: String,
        suggestion: String,
        dateCreated: {type:Date, default:Date.now}
    },{collection:"feedback"});

    return FeedbackSchema;
};