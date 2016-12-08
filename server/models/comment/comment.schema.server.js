/**
 * Created by prasadnm on 12/8/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var CommentSchema = mongoose.Schema({
        userId: {type: mongoose.Schema.Types.ObjectId, ref:"user"},
        reviewId: {type: mongoose.Schema.Types.ObjectId, ref:"review"},
        text: String,
        dateCommented: {type:Date, default:Date.now}
    },{collection:"comment"});

    return CommentSchema;
};