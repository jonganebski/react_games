import { Request, Response } from "express";
import { easy, hard, midd } from "../../src/constants/minesweeper";
import { redis } from "./index";
import { getExpireDate } from "./utils";

const KEY = {
  EASY: "minesweeper-easy",
  MIDD: "minesweeper-midd",
  HARD: "minesweeper-hard",
};

export const handleMinsweeperPost = (req: Request, res: Response) => {
  const { username, time, mode } = req.body;
  try {
    switch (mode.level) {
      case easy.level: {
        redis.zadd(KEY.EASY, time, username);
        redis
          .zrange(KEY.EASY, 0, 9, "WITHSCORES")
          .then((data) => res.send(data));
        break;
      }
      case midd.level: {
        redis.zadd(KEY.MIDD, time, username);
        redis
          .zrange(KEY.MIDD, 0, 9, "WITHSCORES")
          .then((data) => res.send(data));
        break;
      }
      case hard.level: {
        redis.zadd(KEY.HARD, time, username);
        redis
          .zrange(KEY.HARD, 0, 9, "WITHSCORES")
          .then((data) => res.send(data));
        break;
      }
    }
  } catch {
    res.status(400);
  }
};

export const handleMinesweeperGet = async (_: Request, res: Response) => {
  try {
    const result: { easy: string[]; midd: string[]; hard: string[] } = {
      easy: await redis.zrange(KEY.EASY, 0, 9, "WITHSCORES"),
      midd: await redis.zrange(KEY.MIDD, 0, 9, "WITHSCORES"),
      hard: await redis.zrange(KEY.HARD, 0, 9, "WITHSCORES"),
    };
    await redis.expireat(KEY.EASY, getExpireDate());
    await redis.expireat(KEY.MIDD, getExpireDate());
    await redis.expireat(KEY.HARD, getExpireDate());
    res.send(result);
  } catch {
    res.status(400);
  }
};
