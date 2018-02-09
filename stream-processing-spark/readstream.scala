import spark.implicits._
import org.apache.spark.sql._
import org.apache.spark.sql.types._

// Set up the Kafka connection
val kafkaDF = spark.
    readStream.
    format("kafka").
    option("kafka.bootstrap.servers", "localhost:9092").
    option("subscribe", "transactions").
    option("startingOffests", "latest").
    load()

// Parse the received JSON data from Kafka
var streamingDF = kafkaDF.
    select(($"value").cast(StringType).alias("data")).
    select(
        // Category column
        get_json_object($"data", "$.category").cast(StringType).alias("category"),
        // Sales (money) column
        get_json_object($"data", "$.sales").cast(DoubleType).alias("sales"),
        // Need to divide by 1000 to convert to seconds (Javascript Date.now() outputs in milliseconds)
        from_unixtime(get_json_object($"data", "$.ts") / 1000).cast(TimestampType).alias("ts")
    );

// Do a window of 4 seconds calculation every 2 seconds
// Tolerate late data up to 4 seconds
// The as[] is to convert dataframe to DS
var streamingWindowDS = streamingDF.
    withWatermark("ts", "4 seconds").
    groupBy(
        $"category",
        // group by 4 seconds window, calculate every 2 seconds
        window($"ts", "4 seconds")
    ).
    agg(
        expr("sum(sales) as running_sum_sales")
    )

/*
// For debugging purposes from spark-shell only
// Stop by issuing 
var queryConsole = streamingWindowDS.
    writeStream.
    format("console").
    option("truncate", false).
    start
*/

// Spark 2.2.0 has kafka sink. Spark < 2.2.0 needs to implement ForeachWriter
var query = streamingWindowDS.
    writeStream.
    format("kafka").
    option("kafka.bootstrap.servers", "localhost:9092").
    option("topic", "aggregations").
    start


/*
// I don't know why the classes definitions here need a complete package.class notation
// Pre spark 2.2.0 code below
case class Output(category: String, running_sum_sales: Double)

class  KafkaSink(topic:String, servers:String) extends org.apache.spark.sql.ForeachWriter[Output] {
    val kafkaProperties = new  java.util.Properties()
    kafkaProperties.put("bootstrap.servers", servers)
    kafkaProperties.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer")
    kafkaProperties.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer")

    val results = new scala.collection.mutable.HashMap[String, String]
    var producer: org.apache.kafka.clients.producer.KafkaProducer[String, String] = _
    var gson: com.google.gson.Gson = _

    def open(partitionId: Long,version: Long): Boolean = {
        producer = new org.apache.kafka.clients.producer.KafkaProducer(kafkaProperties)
        gson = new com.google.gson.Gson
        true
    }

    def process(value: Output): Unit = {
        producer.send(new org.apache.kafka.clients.producer.ProducerRecord(topic, gson.toJson(value)))
    }

    def close(errorOrNull: Throwable): Unit = {
        producer.close()
    }
}

val topic = "aggregations"
val brokers = "localhost:9092"
val writer = new KafkaSink(topic, brokers)

val query = streamingWindowDS.
    writeStream.
    foreach(writer).
    outputMode("complete").
    trigger(ProcessingTime("10 seconds"))
    start()
*/