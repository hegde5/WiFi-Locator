/**
 * Created by prasadnm on 12/8/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var CommentSchema = mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        review: {type: mongoose.Schema.Types.ObjectId, ref:"ReviewModel"},
        text: String,
        dateCommented: {type:Date, default:Date.now}
    },{collection:"comment"});

    return CommentSchema;
};