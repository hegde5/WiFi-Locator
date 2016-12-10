/**
 * Created by prasadnm on 12/3/16.
 */
module.exports = function(app, model) {

    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    app.use(session({
        secret: 'some secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({usernameField:"email", passwordField:"password"}, localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/checkLoggedIn", checkLoggedIn);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);


    function login(req, res) {
        res.send(req.user);
    }

    function localStrategy(email, password, done) {
        model
            .userModel
            .findUserByEmail(email)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        console.log("User found");
                        return done(null, user);
                    } else {
                        console.log("User Not found");
                        return done(null, false);
                    }
                },
                function(error) {
                    console.log("In error condition");
                    return done(error);
                }
            );
    }

    function serializeUser(user, done) {
        //put user into the current session
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(error) {
                    done(error);
                }
            )
    }

    function checkLoggedIn(req, res) {
        res.send(req.isAuthenticated()? req.user: undefined);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(user)
            .then(
                function(user) {
                    req.login(user, function(err) {
                        if(err) {
                            res.sendStatus(400).send(err);
                        } else {
                            res.send(user);
                        }
                    });
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUser(req, res) {
        if(req.query.email) {
            findUserByEmail(req, res);
        } else {
            res.send(req.user);
        }
    }

    function findUserByEmail(req, res) {
        var email = req.query.email;
        model
            .userModel
            .findUserByEmail(email)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var uid = req.params.uid;
        model
            .userModel
            .findUserById(uid)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = user._id;
        model
            .userModel
            .updateUser(uid, user)
            .then(
                function(status) {
                    //status: {"ok":1,"nModified":1,"n":1}
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        model
            .userModel
            .deleteUser(uid)
            .then(
                function(status) {
                    res.send(true);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


};