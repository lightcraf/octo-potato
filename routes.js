const content = require("./handlers/contentList.js");
const rating = require("./handlers/vote.js");

module.exports = function (app) {
    app.get("/api/content", content.contentList);
    app.post("/api/content/:id", rating.vote);
};