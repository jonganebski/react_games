import { Request, Response } from "express";
import { redis } from "./index";
import { getExpireDate } from "./utils";

const KEY = {
  EASY: "minesweeper-easy",
  MIDD: "minesweeper-midd",
  HARD: "minesweeper-hard",
};

const getKey = (param: string): [boolean, string] => {
  if (param === "easy") {
    return [false, KEY.EASY];
  } else if (param === "midd") {
    return [false, KEY.MIDD];
  } else if (param === "hard") {
    return [false, KEY.HARD];
  } else {
    return [true, ""];
  }
};

export const handleMinsweeperPost = (req: Request, res: Response) => {
  const { username, time } = req.body;
  const { difficulty } = req.params;
  try {
    const [error, KEY] = getKey(difficulty);
    if (error) {
      throw new Error("Wrong Parameter");
    }
    redis.zadd(KEY, time, username);
    redis.zrange(KEY, 0, 9, "WITHSCORES").then((data) => res.send(data));
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};

export const handleMinesweeperGet = async (req: Request, res: Response) => {
  const { difficulty } = req.params;
  try {
    const [error, KEY] = getKey(difficulty);
    if (error) {
      throw new Error("Wrong Parameter");
    }
    const result = await redis.zrange(KEY, 0, 9, "WITHSCORES");
    await redis.expireat(KEY, getExpireDate());
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};
