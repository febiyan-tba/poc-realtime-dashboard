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

val df = spark.readStream.format("kafka").option("kafka.bootstrap.servers", "localhost:9092").option("subscribe", "transactions").load()

var df2 = df.selectExpr("CAST(value AS STRING)").as[(String)]

df2.select(from_json($"value", schema).as("data")).writeStream.format("console").start().awaitTermination()