const formidable = require("formidable");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const DB_PATH = "public/db/content.db";
const db = new sqlite3.Database(DB_PATH);

exports.addContent = function (req, res) {
    const form = new formidable.IncomingForm();
    const newContent = {};
    const errors = {
        titleError: false,
        descriptionError: false,
        typeError: false,
        genreError: false,
        fileError: false
    };
    const contentTypes = ["video", "book"];
    const contentGenres = ["action", "drama", "sci-fi", "cookbook", "romance", "science"];

    form.parse(req);
    form.keepExtensions = true;
    form.uploadDir = "./client/public/content-images";
    form.maxFileSize = 5 * 1024 * 1024;
    form.maxFields = 6;

    form.on("field", function (name, value) {
        if (name === "title") {
            if (value.trim().length === 0 || value.trim().length > 100) {
                errors.titleError = true;
            } else {
                newContent[name] = value;
            }
        } else if (name === "description") {
            if (value.trim().length === 0 || value.trim().length > 1000) {
                errors.descriptionError = true;
            } else {
                newContent[name] = value;
            }
        } else if (name === "type") {
            if (!contentTypes.includes(value.toLowerCase())) {
                errors.typeError = true;
            } else {
                newContent[name] = value;
            }
        } else if (name === "genre") {
            if (!contentGenres.includes(value.toLowerCase())) {
                errors.genreError = true;
            } else {
                newContent[name] = value;
            }
        }
    });

    form.on("file", function (name, file) {
        if (file.size == 0) {
            errors.fileError = true;
        }

        if (file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg") {
            newContent[name] = path.basename(file.path);
        } else {
            errors.fileError = true;
        }
    });

    form.on("error", function (err) {
        console.log(err);
        return res.send({ errors });
    });

    form.on("end", function () {
        for (let x in errors) {
            if (errors[x] === true) {
                return res.send({ errors });
            }
        }

        db.run(`INSERT INTO content (type, title, description, genre, rating_count, rating_sum, rating, poster, image_1, image_2) 
            VALUES (?, ?, ?, ?, 0, 0, 0, ?, ?, ?)`, [newContent.type, newContent.title, newContent.description, newContent.genre, newContent.poster, newContent.secondImg, newContent.thirdImg], function (err) {
            if (err) {
                console.log(err);
            }
            return res.send({ status: 200 });
        });
    });
};