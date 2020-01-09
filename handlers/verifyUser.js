exports.verifyUser = function (req, res) {
    const username = res.locals.username;
    const isLoggedIn = res.locals.isLoggedIn;

    return res.send({ isLoggedIn, username });
};