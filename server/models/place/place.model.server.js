/**
 * Created by prasadnm on 12/3/16.
 */

module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var PlaceSchema = require("./place.schema.server")();
    var PlaceModel = mongoose.model("PlaceModel", PlaceSchema);


    var api = {
        setModel                : setModel,
        createPlace             : createPlace,
        getPlaceByPlaceId       : getPlaceByPlaceId
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPlace(place) {
        return PlaceModel
            .findOne({placeId : place.placeId})
            .then(function (placeObj) {
                if(!placeObj)
                    return PlaceModel.create(place);
                else
                    return placeObj;
            });
    }
    
    function getPlaceByPlaceId(placeId) {
        return PlaceModel
            .findOne({
                placeId: placeId
            });

    }


};
