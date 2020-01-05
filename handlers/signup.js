exports.signupProcessPost = function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log(username, email, password);
    res.send({status: "ok"});
};