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

export type TStart = {
  bool: boolean;
  id: number;
};

export type TOver = {
  bool: boolean;
  isVictory: boolean;
};
