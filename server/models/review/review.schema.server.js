/**
 * Created by prasadnm on 12/3/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var ReviewSchema = mongoose.Schema({
        placeId: String,
        user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        title: String,
        description: String,
        helpful: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
        rating: Number,
        dateReviewed: {type:Date, default:Date.now}
    },{collection:"review"});

    return ReviewSchema;
};