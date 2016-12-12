/**
 * Created by prasadnm on 12/3/16.
 */

module.exports = function(app, model) {

    app.post("/api/place", savePlace);
    app.get("/api/place/:pid", getPlaceByPlaceId);

    function savePlace(req, res) {
        var place = req.body;
        model
            .placeModel
            .createPlace(place)
            .then(
                function(place) {
                    res.send(place);
                },
                function(error) {
                    var status = error.statusCode;
                    res.sendStatus(status).send(error);
                }
            );
    }

    function getPlaceByPlaceId(req, res) {
        var placeId = req.params.pid;

        model
            .placeModel
            .getPlaceByPlaceId(placeId)
            .then(function (placeObj) {
                res.send(placeObj);
            },
            function (error) {
                res.sendStatus(400).send(error);
            })
    }
    

};