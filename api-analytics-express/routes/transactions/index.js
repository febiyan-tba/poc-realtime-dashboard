const express = require('express');
const router = express.Router();
const auth = require("../../app-auth");

var kafka = require("kafka-node");
var kafkaClient = new kafka.Client('localhost:2181', 'node-client');
var kafkaProducer = new kafka.HighLevelProducer(kafkaClient);
kafkaProducer.on('ready', function(){
  console.log('Kafka connected');
});
kafkaProducer.on('error', function(){
  console.log('Kafka error');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Pass along to kafka
  res.sendStatus(204);
});

/* Accept Transactions */
router.post('/', function(req, res, next) {
  // The contain of req.body is a JSON object of the form fields.
  // Numeric values are converted to strings automatically
  const obj = {
    'category': req.body['Product Category'],
    'sales': req.body['Sales']
  };

  // Send data to kafka producer
  // TODO: handle when kafka is not connected?
  kafkaProducer.send([
      {
        topic: 'transactions',
        messages: JSON.stringify(obj),
        attributes: 1
      }
    ], function(error, result){ 
    if(error){
      console.log('Failed to send to Kafka: ' + error);
    } else {
      console.log(result);
    }
  });

  // Temporary todo: Emit to subsribing sockets in realtime
  req.io.emit('transactions-summary', obj);

  res.sendStatus(204);
});
router.get('/live', function(req, res, next) {
  res.sendStatus(204);
  //res.sendFile(path.resolve('index.html'));
  // Send a broadcast when connection
  
});
module.exports = router;
