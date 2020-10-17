export type TBoxValues = {
  value: number;
  isRevealed: boolean;
  isMine: boolean;
  isFlaged: boolean;
  isQuestion: boolean;
};

export type TBox = {
  [key: number]: TBoxValues;
};

export type TMode = {
  totalMines: number;
  size: {
    x: number;
    y: number;
  };
  level: string;
};

export type TModeLeaderboard = { name: string; time: string };

export type TLeaderboards = {
  [key: string]: TModeLeaderboard[];
  // midd: TModeLeaderboard[];
  // hard: TModeLeaderboard[];
};
