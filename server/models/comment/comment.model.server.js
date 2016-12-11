/**
 * Created by prasadnm on 12/8/16.
 */
module.exports = function() {
    var madel = {};
    var mongoose = require("mongoose");
    var CommentSchema = require("./comment.schema.server.js")();
    var CommentModel = mongoose.model("CommentModel", CommentSchema);

    var api = {
        setModel            : setModel,
        createComment       : createComment,
        getCommentById      : getCommentById,
        getCommentsForReview: getCommentsForReview,
        getCommentsForUser  : getCommentsForUser
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createComment(comment) {
        return CommentModel
            .create(comment);
    }

    function getCommentById(commentId) {
        return CommentModel
            .findById(commentId);
    }

    function getCommentsForReview(reviewId) {
        return CommentModel
            .find({review: reviewId})
            .populate('user','firstName lastName')
    }

    function getCommentsForUser(userId) {
        return CommentModel
            .find({user: userId});
    }
};