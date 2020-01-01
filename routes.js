const content = require("./handlers/contentList.js");
const rating = require("./handlers/vote.js");
const upload = require("./handlers/uploadContent.js");

module.exports = function (app) {
    app.get("/api/content", content.contentList);
    app.post("/api/content/:id", rating.vote);
    app.post("/api/upload", upload.uploadContent);
};