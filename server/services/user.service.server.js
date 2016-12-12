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
    app.post("/api/checkAdmin", checkAdmin);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", loggedInAndSelf, updateUser);
    app.post("/api/user/:uid/favorites", addToFavorites);
    app.get("/api/user/:uid/favorites", getFavoritesForUser);
    app.put("/api/user/:uid/following", addToFollowing);
    app.get("/api/user/:uid/following", getFollowing);
    app.get("/api/user/:uid/followers", getFollowers);
    app.delete("/api/user/:uid", loggedInAndSelf, deleteUser);

    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var self = req.params.uid == req.user._id;
        if(self && loggedIn) {
            next();
        } else {
            res.sendStatus(400).send("You do not have the permission");
        }
    }


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
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(error) {
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

    function checkAdmin(req, res) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == "ADMIN";
        if(loggedIn && isAdmin) {
            res.send(req.user);
        } else {
            res.send(undefined);
        }
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

    function addToFavorites(req, res) {
        var place = req.body;
        var userId = req.params.uid;

        model
            .userModel
            .addToFavorites(userId, place)
            .then(
                function (userObj) {
                    res.send(userObj);
                },
                function (error) {
                    res.sendStatus(400).send(error);

                }
            );
    }

    function getFavoritesForUser(req, res) {
        var userId = req.params.uid;

        model
            .userModel
            .getFavoritesForUser(userId)
            .then(
                function (userObj) {
                    res.send(userObj);
                },
                function (error) {
                    var status = error.statusCode;
                    res.sendStatus(status).send(error);
                }
            );


    }

    function addToFollowing(req, res) {
        var userId = req.params.uid;
        var followingUserId = req.body.followingUserId;

        model
            .userModel
            .addToFollowing(userId, followingUserId)
            .then(
                function(userObj) {
                    res.send(userObj);
                },
                function(error) {
                    var status = error.statusCode;
                    res.sendStatus(status).send(error);
                }
            );
    }

    function getFollowers(req, res) {
        var userId = req.params.uid;

        model
            .userModel
            .getFollowers(userId)
            .then(
                function(followers) {
                    res.send(followers);
                },
                function(error) {
                    var status = error.statusCode;
                    res.sendStatus(status).send(error);
                }
            );
    }

    function getFollowing(req, res) {
        var userId = req.params.uid;

        model
            .userModel
            .getFollowing(userId)
            .then(
                function(followers) {
                    res.send(followers);
                },
                function(error) {
                    var status = error.statusCode;
                    res.sendStatus(status).send(error);
                }
            );
    }


};