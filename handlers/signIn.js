const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const dbConfig = config.get("dbConfig");
const db = new sqlite3.Database(`${dbConfig.dbPath}/${dbConfig.dbName}`);
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = config.get("jwtSecret");

exports.signInProcessPost = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const errors = { loginError: false };
    const USERNAME_PATTERN = /^[a-zA-Z0-9]+$/;
    const PASSWORD_PATTERN = /^\S{6,}$/;

    if (USERNAME_PATTERN.test(username) && PASSWORD_PATTERN.test(password)) {
        db.get("SELECT id, username, password FROM users WHERE username = ?", [username], function (err, row) {
            if (err) {
                throw err;
            }
            if (row) {
                bcrypt.compare(password, row.password, function (err, response) {
                    if (response === true) {
                        const payload = {
                            userId: row.id,
                            username: username
                        };
                        const token = jwt.sign(payload, jwtSecret, { expiresIn: 1000*60*60 });
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