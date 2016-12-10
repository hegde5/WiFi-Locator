/**
 * Created by prasadnm on 12/3/16.
 */
module.exports = function(app) {

    var model = require('./models/model.server.js')();

    require("./services/user.service.server")(app, model);
    require("./services/review.service.server")(app, model);
    require("./services/feedback.service.server")(app, model);
};