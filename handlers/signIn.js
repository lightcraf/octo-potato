const sqlite3 = require("sqlite3").verbose();
const DB_PATH = "public/db/content.db";
const db = new sqlite3.Database(DB_PATH);
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const SECRET = "abigsecret";

exports.signInProcessPost = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const errors = { loginError: false };
    const USERNAME_PATTERN = /^[a-zA-Z0-9]+$/;

    if (USERNAME_PATTERN.test(username) && password.trim().length > 0) {
        db.get(`SELECT username, password FROM users WHERE username = ?`, [username], function (err, row) {
            if (err) {
                throw err;
            }
            if (row) {
                bcrypt.compare(password, row.password, function (err, response) {
                    if (response === true) {
                        const token = jwt.sign({ username: username }, SECRET, { expiresIn: 1000*60*60 });
                        res.cookie("token", token, { expires: new Date(Date.now() + 1000*60*60), httpOnly: true });
                        return res.send({ status: 200 });
                    } else {
                        errors.loginError = true;
                        return res.send({ errors });
                    }
                });
            } else {
                errors.loginError = true;
                return res.send({ errors });
            }
        });
    } else {
        errors.loginError = true;
        return res.send({ errors });
    }
};