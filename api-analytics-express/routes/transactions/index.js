const express = require('express');
const router = express.Router();
const auth = require("../../app-auth");
const kafka = require("kafka-node");
const kafkaClient = new kafka.Client('localhost:2181', 'node-client');
const kafkaProducer = new kafka.HighLevelProducer(kafkaClient);

/** Kafka Callbacks */
kafkaProducer.on('ready', function(){
  console.log('Kafka connected');
});
kafkaProducer.on('error', function(){
  console.log('Kafka error');
  // Reconnect?
});

/* Accept Transactions */
router.post('/', function(req, res, next) {
  // The contain of req.body is a JSON object of the form fields.
  // Numeric values are converted to strings automatically
  const obj = {
    'ts': Date.now(),
    'category': req.body['Product Category'],
    'sales': req.body['Sales']
  };

  // Send data to kafka producer
  // TODO: handle when kafka is not connected?
  kafkaProducer.send(
    [
      {
        topic: 'transactions',
        messages: JSON.stringify(obj),
        attributes: 1
      }
    ], 
    function(error, result){ 
      if(error){
        console.log('Failed to send to Kafka: ' + error);
      } else {
        console.log(result);
      }
    }
  );

  res.sendStatus(204);
});

/** Handle pingback from Kafka */
router.post('/summary', function(req, res, next){
  console.log(req.body)
  // Temporary todo: Emit to subsribing sockets in realtime
  req.io.emit('transactions-summary', req.body);
});

module.exports = router;
