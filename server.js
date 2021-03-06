const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(function (req, res, next) {    
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, jwtSecret, function (err, decoded) {
            if (err) {
                res.locals.isLoggedIn = false;
                next();
            } else {
                req.decoded = decoded;
                res.locals.isLoggedIn = true;
                res.locals.userId = req.decoded.userId;
                res.locals.username = req.decoded.username;
                next();
            }
        });
    } else {
        res.locals.isLoggedIn = false;
        next();
    }
});

require("./routes.js")(app);

app.use(function (req, res, next) {
    res.type("text/html");
    res.status(404).send("<h1>404 - Not Found</h1>");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type("text/html");
    res.status(500).send("<h1>500 - Server Error</h1>");
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});