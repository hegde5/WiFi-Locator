/**
 * Created by prasadnm on 12/8/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var FeedbackSchema = mongoose.Schema({
        userId: {type: mongoose.Schema.Types.ObjectId, ref:"user"},
        title: String,
        text: String,
        dateCreated: {type:Date, default:Date.now}
    },{collection:"feedback"});

    return FeedbackSchema;
};