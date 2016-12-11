/**
 * Created by prasadnm on 12/3/16.
 */

module.exports = function(app, model) {

    app.get("/api/place/:pid", getPlaceById);
    
    function getPlaceById(req, res) {
        var placeId = req.params.pid;

        model
            .placeModel
            .getPlaceByPlaceId(placeId)
            .then(function (placeObj) {
                if(placeObj)
                {
                    res.send(placeObj);
                }
                else
                {
                    res.send('0');
                }
            },
            function (error) {
                res.sendStatus(400).send(error);
            })
    }
    

};