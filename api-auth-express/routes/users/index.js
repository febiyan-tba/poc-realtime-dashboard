const express = require('express');
const router = express.Router();
const auth = require("../../app-auth");

/* GET users listing. */
router.get('/', auth.authenticate(), function(req, res, next) {
  // Not implemented yet
  res.send({
    hello: "user"
  });
});

module.exports = router;
