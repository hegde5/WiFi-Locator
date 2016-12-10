/**
 * Created by prasadnm on 12/3/16.
 */
module.exports = function(app,model) {

    app.post("/api/review", createReview);
    app.put("/api/review/:rid", markHelpful);
    app.get("/api/review/place/:pid", getReviewsForPlace);
    app.get("/api/review/user/:uid", getReviewsForUser);

    function createReview(req, res) {
        var review = req.body;
        model
            .reviewModel
            .createReview(review)
            .then(function(review) {
                res.send(review);
            }, function(err) {
                res.sendStatus(400).send(err);
            });
    }

    function markHelpful(req, res) {
        var userId = req.body;
        var reviewId = req.params.rid;
        model
            .reviewModel
            .markHelpful(reviewId, userId)
            .then(function(review) {
                res.send(review);
            }, function(err) {
                res.sendStatus(400).send(err);
            });
    }

    function getReviewsForPlace(req, res) {
        var placeId = req.params.pid;
        model
            .reviewModel
            .getReviewsForPlace(placeId)
            .then(
                function(reviews) {
                    res.send(reviews);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function getReviewsForUser(req, res) {
        var userId = req.params.uid;
        model
            .reviewModel
            .getReviewsForUser(userId)
            .then(function(reviews) {
                res.send(reviews);
            }, function(err) {
                res.sendStatus(400).send(err);
            });
    }
};