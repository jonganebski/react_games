import { Request, Response } from "express";
import { redis } from "./index";

const KEY = "tetris";

export const handleTetrisPost = (req: Request, res: Response) => {
  try {
    const { score, username } = req.body;
    redis.zadd(KEY, score, username);
    redis.zrange(KEY, -10, -1, "WITHSCORES").then((data) => res.send(data));
  } catch {
    res.status(400);
  }
};

export const handleTetrisGet = (_: Request, res: Response) => {
  try {
    redis.zrange(KEY, -10, -1, "WITHSCORES").then((data) => res.send(data));
  } catch {
    res.status(400);
  }
};
