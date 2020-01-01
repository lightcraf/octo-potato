const sqlite3 = require("sqlite3").verbose();
const DB_PATH = "public/db/content.db";
const db = new sqlite3.Database(DB_PATH);

exports.contentList = function (req, res) {
    db.all(`SELECT id, type, title, description, genre, rating_count, 
        rating_sum, poster, image_1, image_2 FROM content`, [], (err, rows) => {
        if (err) {
            throw err;
        }
        const pageData = rows;
        res.send(pageData);
    });
};