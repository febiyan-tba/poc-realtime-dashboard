import spark.implicits._
import org.apache.spark.sql.types._

val schema = StructType(Array(
    StructField("category", StringType),
    StructField("sales", DoubleType)
))

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
    select(($"value").cast("string").alias("data")).
    select(
        // Category column
        get_json_object($"data", "$.category").cast("string").alias("category"),
        // Sales (money) column
        get_json_object($"data", "$.sales").cast("double").alias("sales"),
        // Need to divide by 1000 to convert to seconds (Javascript Date.now() outputs in milliseconds)
        from_unixtime(get_json_object($"data", "$.ts") / 1000).cast("timestamp").alias("ts")
    );

// Do a window calculation every 5 seconds
// Tolerate late data up to 10 seconds
var streamingWindowDF = streamingDF.
    withWatermark("ts", "10 seconds").
    groupBy($"category", window($"ts", "5 seconds")).
    count();

// Print to console
val execution = streamingWindowDF.writeStream.format("console").start().awaitTermination();

// df2.select(from_json($"value", schema).as("data")).writeStream.format("console").start().awaitTermination()