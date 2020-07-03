const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const dbConfig = config.get("dbConfig");
const db = new sqlite3.Database(`${dbConfig.dbPath}/${dbConfig.dbName}`);

exports.contentList = function (req, res) {
    db.all(`SELECT id, type, title, description, genre, rating_count, 
        rating, poster, image_1, image_2 FROM content`, [], (err, rows) => {
        if (err) {
            throw err;
        }
        const pageData = rows;
        res.send(pageData);
    });
};