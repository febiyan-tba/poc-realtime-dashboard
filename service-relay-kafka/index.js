var kafka = require("kafka-node");
var kafkaClient = new kafka.Client('localhost:2181', 'node-client-2');
var axios = require('axios');
 

var kafkaConsumer = new kafka.HighLevelConsumer(
    kafkaClient, 
    [
        { topic: 'transactions-summary' }
    ], 
    {
        groupId: 'node-js-clients'
    }
);

kafkaConsumer.on('message', function(message){
    /**
     * Example message content:
     * { topic: 'transactions-summary',
  value: '{"category":"Furniture","window":{"start":"2018-02-12T11:31:00.000+01:00","end":"2018-02-12T11:31:04.000+01:00"},"sum_sales":146.69}',
  offset: 15,
  partition: 0,
  highWaterOffset: 16,
  key: null }
     */

    axios.post(
        'http://localhost:3000/transactions/summary', 
        JSON.parse(message.value)
    )
    .then(response => {
        console.log("Success");
    })
    .catch(error => {
        console.log(error);
    });
});
  