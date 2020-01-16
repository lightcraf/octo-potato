const sqlite3 = require("sqlite3").verbose();
const DB_PATH = "public/db/content.db";
const db = new sqlite3.Database(DB_PATH);

exports.vote = function (req, res) {
    const id = Number(req.params["id"]);
    const rating = Number(req.body.rating);

    if (!Number.isInteger(rating)) {
        return res.send({ voteError: true });
    } else if (rating < 1 || rating > 10) {
        return res.send({ voteError: true });
    }

    if (!Number.isInteger(id)) {
        return res.send({ voteError: true });
    } else if (id < 1 || id > 10000000) {
        return res.send({ voteError: true });
    }

    function getRating() {
        const newRating = { ratingCount: 0, ratingSum: 0, rating: 0 }
        return new Promise((resolve, reject) => {
            db.get("SELECT rating_count, rating_sum FROM content WHERE id = ?", [id], function (err, row) {
                if (err) {
                    throw err;
                }
                newRating.ratingCount = row.rating_count + 1;
                newRating.ratingSum = row.rating_sum + rating;
                newRating.rating = Number(((row.rating_sum + rating) / (row.rating_count + 1)).toFixed(1));
                resolve(newRating);
            });
        });
    }

    function updateRating(newRating) {
        return new Promise((resolve, reject) => {
            db.run("UPDATE content SET rating_count = ?, rating_sum = ?, rating = ? WHERE id = ?", [newRating.ratingCount, newRating.ratingSum, newRating.rating, id], function (err) {
                if (err) {
                    reject(err);
                }
                res.send(newRating);
            });
        });
    }

    async function makeVote() {
        try {
            const newRating = await getRating();
            await updateRating(newRating);
        } catch (error) {
            console.log(error);
        }
    }

    makeVote();
};