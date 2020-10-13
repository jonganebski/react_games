import Redis from "ioredis";
import express from "express";

const app = express();
const redis = new Redis();

redis.set("foo", "bar");

redis.get("foo", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => console.log("✅ Server listening"));
