import org.apache.kafka.clients.consumer.ConsumerRecord
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.spark.streaming.kafka010._
import org.apache.spark.streaming.kafka010.LocationStrategies.PreferConsistent
import org.apache.spark.streaming.kafka010.ConsumerStrategies.Subscribe
import org.apache.spark.streaming.StreamingContext

import spark.implicits._
import org.apache.spark.sql.types._
val schema = StructType(Array(
    StructField("category", StringType),
    StructField("sales", DoubleType)
))

// Set up the connection DF
val kafkaDF = spark
.readStream
.format("kafka")
.option("kafka.bootstrap.servers", "localhost:9092")
.option("subscribe", "transactions")
.option("startingOffests", "latest")
.load()

// import org.apache.spark.sql.functions._

var streamingDF = kafkaDF.select(
    ($"value").cast("string").alias("data"),
    ($"hittime").cast("timestamp").alias("ts")
)
.as[(String, Timestamp)]
; 

var streamingWindowDF = streamingDF
    .select(
        get_json_object($"data", "$.category").cast("string").alias("category"),
        get_json_object($"data", "$.sales").cast("double").alias("sales"),
        "hittime"
    )
    .groupBy($"category", window($"hittime", "10 minute"))
    .sum("sales");

val execution = streamingWindow.writeStream.format("console").start().awaitTermination();

// df2.select(from_json($"value", schema).as("data")).writeStream.format("console").start().awaitTermination()