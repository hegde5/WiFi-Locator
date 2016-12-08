/**
 * Created by prasadnm on 12/3/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var ReviewSchema = mongoose.Schema({
        placeId: {type: mongoose.Schema.Types.ObjectId, ref:"place"},
        userId: {type: mongoose.Schema.Types.ObjectId, ref:"user"},
        title: String,
        description: String,
        helpful: [{type: mongoose.Schema.Types.ObjectId, ref:"user"}],
        rating: Number,
        dateReviewed: {type:Date, default:Date.now}
    },{collection:"review"});

    return ReviewSchema;
};