const content = require("./handlers/contentList.js");
const voting = require("./handlers/voting.js");
const add = require("./handlers/addContent.js");
const signUp = require("./handlers/signUp.js");
const signIn = require("./handlers/signIn.js");
const signOut = require("./handlers/signOut.js");
const verify = require("./handlers/verifyUser.js");

module.exports = function (app) {
    app.get("/api/content", content.contentList);
    app.get("/api/content/:id", voting.votingProcessGet);
    app.post("/api/content/:id", voting.votingProcessPost);
    app.post("/api/add", add.addContent);
    app.post("/api/signup", signUp.signUpProcessPost);
    app.post("/api/signin", signIn.signInProcessPost);
    app.get("/api/signout", signOut.signOutProcessGet);
    app.get("/api/verify", verify.verifyUser);
};