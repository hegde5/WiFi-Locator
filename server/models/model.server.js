/**
 * Created by prasadnm on 12/3/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");

    var connectionString = "mongodb://admin:admin@ds129038.mlab.com:29038/wifi-loc8r";
    //for production: mongodb://<dbuser>:<dbpassword>@ds035796.mlab.com:35796/wifi-loc8r
    if (process.env.localMongoURL) {
        console.log("Connecting to local mongo...");
        connectionString = process.env.localMongoURL;
    }
    else console.log("Connecting to production mongo...");
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();
    var reviewModel = require("./review/review.model.server")();
    var feedbackModel = require("./feedback/feedback.model.server")();
    var placeModel = require("./place/place.model.server")();
    var commentModel = require("./comment/comment.model.server")();

    var model = {
        userModel: userModel,
        reviewModel: reviewModel,
        feedbackModel: feedbackModel,
        placeModel: placeModel,
        commentModel: commentModel
    };
   
    userModel.setModel(model);
    reviewModel.setModel(model);
    feedbackModel.setModel(model);
    placeModel.setModel(model);
    commentModel.setModel(model);

    return model;
};