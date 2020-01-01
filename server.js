const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

// const sqlite3 = require("sqlite3").verbose();
// const DB_PATH = "public/db/recipes.db";
// const db = new sqlite3.Database(DB_PATH);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes.js")(app);


// app.get("/api/bbb", function (req, res) {
//     db.all("SELECT id, created, recipe, description FROM recipes ORDER BY created DESC", [], (err, rows) => {
//         if (err) {
//             throw err;
//         }
//         const pageData = rows;
//         console.log(rows);
//         res.send({ recipes: pageData });
//     });
// });


app.use(function (req, res, next) {
    res.type("text/html");
    res.status(404).send("<h1>404 - Not Found</h1>");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type("text/html");
    res.status(500).send("<h1>500 - Server Error</h1>");
});

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});