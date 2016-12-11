/**
 * Created by prasadnm on 12/11/16.
 */
module.exports = function(app,model) {

    app.post("/api/comment", createComment);
    app.get("/api/comment/:cid", getCommentById);
    app.get("/api/comment/review/:rid", getCommentsForReview);
    app.get("/api/comment/user/:uid", getCommentsForUser);

    function createComment(req, res) {
        var comment = req.body;
        model
            .commentModel
            .createComment(comment)
            .then(function(comment) {
                res.send(comment);
            }, function(err) {
                res.sendStatus(400).send(err);
            });
    }

    function getCommentById(req, res) {
        var commentId = req.params.cid;
        model
            .commentModel
            .getCommentById(commentId)
            .then(function(comment) {
                res.send(comment);
            }, function(err) {
                res.sendStatus(400).send(err);
            });
    }

    function getCommentsForReview(req, res) {
        var reviewId = req.params.rid;
        model
            .commentModel
            .getCommentsForReview(reviewId)
            .then(function(reviewComments) {
                res.send(reviewComments);
            }, function(err) {
                console.log("getComment error: "+err.stack);
                res.sendStatus(400).send(err);
            });
    }

    function getCommentsForUser(req, res) {
        var userId = req.params.uid;
        model
            .commentModel
            .getCommentsForUser(userId)
            .then(function(userComments) {
                res.send(userComments);
            }, function(err) {
                res.sendStatus(400).send(err);
            });
    }
};