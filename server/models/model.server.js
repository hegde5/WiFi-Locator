/**
 * Created by prasadnm on 12/3/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var connectionString = 'mongodb://127.0.0.1:27017/wifi-loc8r';
    //for production: mongodb://<dbuser>:<dbpassword>@ds035796.mlab.com:35796/wifi-loc8r
    if (process.env.MLAB_PASSWORD) {
        console.log("Connecting to production mongo...");
        connectionString = 'mongodb://' +
            process.env.MLAB_USERNAME + ':' +
            process.env.MLAB_PASSWORD +
            '@ds035796.mlab.com:35796/wifi-loc8r';
    }
    else console.log("Connecting to local mongo...");
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();
    var reviewModel = require("./review/review.model.server")();
    var feedbackModel = require("./feedback/feedback.model.server")();

    var model = {
        userModel: userModel,
        reviewModel: reviewModel,
        feedbackModel: feedbackModel
    };
   
    userModel.setModel(model);
    reviewModel.setModel(model);
    feedbackModel.setModel(model);

    return model;
};