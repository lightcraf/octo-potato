exports.signOutProcessGet = function (req, res) {
    res.clearCookie("token");
    res.send({ status: 200 });
};