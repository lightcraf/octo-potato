const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

const formidable = require('formidable');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post("/api/add", function (req, res) {
    const form = new formidable.IncomingForm();
    const newContent = {};


    form.parse(req);
    form.keepExtensions = true;
    form.uploadDir = __dirname + "/uploads";

    form.on('field', function(name, value) {
        console.log(1);
        console.log(name, value);
        newContent[name] = value;
        console.log(1);
    });


    form.on('file', function(name, file) {
        console.log(3);
        console.log(file.name);
        console.log(path.basename(file.path));
        newContent[name] = path.basename(file.path);
        console.log(file.path);
        console.log(3);
    });

    form.on('end', function() {
        console.log(newContent);
        res.send("Ok");
    });
});

require("./routes.js")(app);

app.use(function (req, res, next) {
    res.type("text/html");
    res.status(404).send("<h1>404 - Not Found</h1>");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type("text/html");
    res.status(500).send("<h1>500 - Server Error</h1>");
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});