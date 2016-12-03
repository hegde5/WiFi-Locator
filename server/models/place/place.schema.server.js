/**
 * Created by prasadnm on 12/3/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var PlaceSchema = mongoose.Schema({
        placeId: String,
        placeSlug: String,
        address: {street:String, city:String, postal:String},
        title: String,
        thumbnail: String
    },{collection:"place"});

    return PlaceSchema;
};