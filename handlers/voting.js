const sqlite3 = require("sqlite3").verbose();
const config = require("config");
const dbConfig = config.get("dbConfig");
const db = new sqlite3.Database(`${dbConfig.dbPath}/${dbConfig.dbName}`);

exports.votingProcessGet = function (req, res) {
    const contentId = Number(req.params["id"]);
    const userId = res.locals.userId;

    if (!Number.isInteger(contentId) || contentId < 1 || contentId > 10000000) {
        return res.send({ voteError: true });
    }

    if (res.locals.isLoggedIn) {
        db.get("SELECT rating FROM user_votes WHERE user_id = ? AND content_id = ?", [userId, contentId], function (err, row) {
            if (err) {
                throw err;
            }
            
            if (row) {
                return res.send({rating: row.rating});
            } else {
                return res.send({rating: 0});
            }
        });
    } else {
        return res.send({ voteError: false });
    }
};

exports.votingProcessPost = function (req, res) {
    const userId = res.locals.userId;
    const contentId = Number(req.params["id"]);
    const rating = Number(req.body.rating);

    if (userId === undefined) {
        return res.send({ voteError: true });
    }

    if (!Number.isInteger(contentId) || contentId < 1 || contentId > 10000000 ||
        !Number.isInteger(rating) || rating < 1 || rating > 10) {
        return res.send({ voteError: true });
    }

    function checkUserRating() {
        return new Promise((resolve, reject) => {
            db.get("SELECT rating FROM user_votes WHERE user_id = ? AND content_id = ?", [userId, contentId], function (err, row) {
                if (err) {
                    reject(err);
                }
    
                if (row) {
                    resolve(true);
                    return res.send({ voteError: true });
                } else {
                    resolve(false);
                }
            });
        });
    }

    function insertUserRating() {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO user_votes (user_id, content_id, rating) VALUES (?, ?, ?)", [userId, contentId, rating], function (err) {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }

    function getRating() {
        const newRating = { ratingCount: 0, ratingSum: 0, rating: 0 }
        return new Promise((resolve, reject) => {
            db.get("SELECT rating_count, rating_sum FROM content WHERE id = ?", [contentId], function (err, row) {
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
            db.run("UPDATE content SET rating_count = ?, rating_sum = ?, rating = ? WHERE id = ?", [newRating.ratingCount, newRating.ratingSum, newRating.rating, contentId], function (err) {
                if (err) {
                    reject(err);
                }
                res.send(newRating);
            });
        });
    }

    async function makeVote() {
        try {
            const isUserVoted = await checkUserRating();
            if (!isUserVoted) {
                await insertUserRating();
                const newRating = await getRating();
                await updateRating(newRating);
            }
        } catch (error) {
            console.log(error);
        }
    }

    makeVote();
};