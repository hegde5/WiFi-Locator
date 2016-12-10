/**
 * Created by prasadnm on 12/8/16.
 */

module.exports = function () {
    var model = {};
    var mongoose =  require("mongoose");
    var FeedbackSchema = require("./feedback.schema.server")();
    var FeedbackModel = mongoose.model("FeedbackModel", FeedbackSchema);

    var api = {
        setModel       : setModel,
        createFeedback : createFeedback,
        getFeedback    : getFeedback,
        deleteFeedback : deleteFeedback
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createFeedback(feedback) {
        return FeedbackModel
            .create(feedback);
    }

    function getFeedback() {
        return FeedbackModel
            .find()
            .populate('user',
                {
                    firstName:1,
                    lastName:1
                })
            .exec();
    }
    
    function deleteFeedback(feedbackId) {
        return FeedbackModel
            .remove(
                {
                    _id: feedbackId
                }
            );
    }

};
