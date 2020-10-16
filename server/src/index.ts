import Redis from "ioredis";
import express from "express";
import cors from "cors";
import { easy, midd, hard } from "../../src/constants/minesweeper";

const EASY = "minesweeper-easy";
const MIDD = "minesweeper-midd";
const HARD = "minesweeper-hard";

const app = express();
const redis = new Redis();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/minesweeper/post", (req, res) => {
  const { username, time, mode } = req.body;
  let KEY = "";
  switch (mode.level) {
    case easy.level: {
      KEY = EASY;
      break;
    }
    case midd.level: {
      KEY = MIDD;
      break;
    }
    case hard.level: {
      KEY = HARD;
      break;
    }
  }
  redis.zadd(KEY, time, username);
  redis.zrange(KEY, 0, 9, "WITHSCORES").then((data) => res.send(data));
});

app.get("/api/minesweeper/leaderboard", async (_, res) => {
  const result: { easy: string[]; midd: string[]; hard: string[] } = {
    easy: await redis.zrange(EASY, 0, 9, "WITHSCORES"),
    midd: await redis.zrange(MIDD, 0, 9, "WITHSCORES"),
    hard: await redis.zrange(HARD, 0, 9, "WITHSCORES"),
  };
  res.send(result);
});

app.listen(4000, () => console.log("✅ Server listening"));
