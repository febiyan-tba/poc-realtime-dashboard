const express = require('express');
const router = express.Router();
const auth = require("../../app-auth");
var path = require("path");

router.io = {};
/* GET users listing. */
router.get('/', function(req, res, next) {
  // Pass along to kafka
  res.sendStatus(204);
});

/* Accept Transactions */
router.post('/', function(req, res, next) {
  res.sendStatus(204);
  // The contain of req.body is a JSON object of the form fields.
  // Numeric values are converted to strings automatically
  // TODO: forward to Kafka

  // Temporary todo: Emit to subsribing sockets in realtime
  const obj = {
    'category': req.body['Product Category'],
    'sales': req.body['Sales']
  };
  req.io.emit('transactions-summary', obj);

});
router.get('/live', function(req, res, next) {
  res.sendStatus(204);
  //res.sendFile(path.resolve('index.html'));
  // Send a broadcast when connection
  
});
module.exports = router;
