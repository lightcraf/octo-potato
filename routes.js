const content = require("./handlers/contentList.js");
const rating = require("./handlers/vote.js");
const add = require("./handlers/addContent.js");
const signUp = require("./handlers/signUp.js");
const signIn = require("./handlers/signIn.js");

module.exports = function (app) {
    app.get("/api/content", content.contentList);
    app.post("/api/content/:id", rating.vote);
    app.post("/api/add", add.addContent);
    app.post("/api/signup", signUp.signUpProcessPost);
    app.post("/api/signin", signIn.signInProcessPost);
};