// /routes/tokens/index.js
const express = require('express');
const router = express.Router();
const auth = require("../../app-auth");
const users = require("../../app-mock-users");
const config = require("../../app-config");

/* POST users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body)
    if (req.body.username && req.body.password) {
        // Query for user
        // TODO: replace with a database call
        const username = req.body.username;
        const password = req.body.password;
        const user = users.find(function(u) {
            return u.username === username && u.password === password;
        });
        
        // If user doesn't exist, quit.
        if (user) {
            const token = auth.signToken(user);
            res.json({
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
