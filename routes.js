const content = require("./handlers/contentList.js");
const rating = require("./handlers/vote.js");
const add = require("./handlers/addContent.js");
const signup = require("./handlers/signup.js");

module.exports = function (app) {
    app.get("/api/content", content.contentList);
    app.post("/api/content/:id", rating.vote);
    app.post("/api/add", add.addContent);
    app.post("/api/signup", signup.signupProcessPost);
};