/**
 * Created by Vinay on 12/10/2016.
 */

module.exports = function (app, model) {

    app.get("/api/feedback/", getAllFeedbacks);
    app.post("/api/feedback/", submitFeedback);
    app.delete("/api/feedback/:fid", deleteFeedback);

    function getAllFeedbacks(req, res) {
        model
            .feedbackModel
            .getFeedback()
            .then(
              function (feedback) {
                  res.send(feedback);
              },
              function (error){
                  res.sendStatus(400).send(error);
              }
            );
    }
    
    function submitFeedback(req, res) {
        var feedback = req.body;
        model
            .feedbackModel
            .createFeedback(feedback)
            .then(
                function (feedback) {
                    res.send(feedback);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteFeedback(req, res) {

        var fid = req.params.fid;
        model
            .feedbackModel
            .deleteFeedback(fid)
            .then(
                function (status) {
                    res.send(true);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }

            );
    }


};