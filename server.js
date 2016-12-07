/**
 * Created by Vinay on 11/27/2016.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

/*run the node server*/
require("./server/app")(app);

//Heroku dynamically assigns the port. Need to fetch from env. 3000 port works locally
var port      = process.env.PORT || 3000;
app.listen(port);
