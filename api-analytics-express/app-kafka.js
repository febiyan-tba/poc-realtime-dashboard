var kafka = require("kafka-node");
var kafkaClient = new kafka.Client('localhost:2181', 'node-client');
var kafkaProducer = new kafka.HighLevelProducer(kafkaClient);

kafkaProducer.on('ready', function(){
  console.log('Kafka connected');
});

kafkaProducer.on('error', function(){
  console.log('Kafka error');
  // Reconnect?
});