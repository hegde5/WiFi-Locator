/**
 * Created by prasadnm on 12/3/16.
 */
module.exports = function() {
    var madel = {};
    var mongoose = require("mongoose");
    var ReviewSchema = require("./review.schema.server.js")();
    var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

    var api = {
        setModel            : setModel,
        createReview        : createReview,
        markHelpful         : markHelpful,
        getReviewsForPlace  : getReviewsForPlace,
        getReviewsForUser   : getReviewsForUser
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createReview(review) {
        return ReviewModel
            .create(review);
    }

    function markHelpful(reviewId, userId) {
        return ReviewModel
            .findById(reviewId)
            .then(function(review) {
                if(!review.helpful.contains(userId)) {
                    review.helpful.push(userId);
                    return review.save();
                }
                return review;
            })
    }

    function getReviewsForPlace(placeId) {
        return ReviewModel
            .find({placeId: placeId})
            .populate('user','firstName lastName');
    }

    function getReviewsForUser(userId) {
        return ReviewModel
            .find({user: userId});
    }
};