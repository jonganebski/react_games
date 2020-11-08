import { Request, Response } from "express";
import { redis } from "./index";
import { getExpireDate } from "./utils";

const KEY = "sudoku";

export const handleSudokuPost = (req: Request, res: Response) => {
  try {
    const { time, username } = req.body;
    redis.zadd(KEY, time, username);
    redis.zrange(KEY, 0, 9, "WITHSCORES").then((data) => res.send(data));
  } catch {
    res.status(400);
  }
};

export const handleSudokuGet = async (_: Request, res: Response) => {
  try {
    redis.zrange(KEY, 0, 9, "WITHSCORES").then((data) => res.send(data));
    await redis.expireat(KEY, getExpireDate());
  } catch {
    res.status(400);
  }
};
