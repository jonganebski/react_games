import { TBox, TMode, TOver } from "../Components/main";

export const getMinesIndex = (mode: TMode, startId: number) => {
  const minesIndex = new Set();
  for (let i = 0; i < 1000; i++) {
    console.log("loop");
    const index = Math.ceil(Math.random() * mode.size.x * mode.size.y);
    if (index !== startId) {
      minesIndex.add(index);
    }
    if (minesIndex.size === mode.totalMines) {
      break;
    }
  }
  return minesIndex;
};

const getBoxesAround = (mode: TMode, id: number) => {
  let boxesAround = [];
  const lastId = mode.size.x * mode.size.y;
  const xLength = mode.size.x;
  const N = id - xLength;
  const NE = N + 1;
  const E = NE + xLength;
  const SE = E + xLength;
  const S = SE - 1;
  const SW = S - 1;
  const W = SW - xLength;
  const NW = W - xLength;
  if (id === 1) {
    //    _________
    //   | 1   E
    //   | S   SE
    boxesAround = [E, SE, S];
  } else if (id === xLength) {
    //  _________
    //    W   9 |
    //    SW  S |
    boxesAround = [S, SW, W];
  } else if (id === lastId) {
    //    NW  N   |
    //    W   81  |
    //  ¯¯¯¯¯¯¯¯¯¯
    boxesAround = [W, NW, N];
  } else if (id === lastId - xLength + 1) {
    //    | N     NE
    //    | 73    E
    //    ¯¯¯¯¯¯¯¯¯¯¯¯
    boxesAround = [N, NE, E];
  } else if (id < xLength) {
    //  ______________
    //    W   5   E
    //    SW  S   SE
    boxesAround = [E, SE, S, SW, W];
  } else if (id % xLength === 0) {
    //    NW  N  |
    //    W   18 |
    //    SW  S  |
    boxesAround = [S, SW, W, NW, N];
  } else if (lastId - xLength + 1 < id && id < lastId) {
    //    NW  N   NE
    //    W   78  E
    //  ¯¯¯¯¯¯¯¯¯¯¯¯¯
    boxesAround = [W, NW, N, NE, E];
  } else if (id % xLength === 1) {
    //    | N     NE
    //    | 17    E
    //    | S     SE
    boxesAround = [N, NE, E, SE, S];
  } else {
    //   NW   N   NE
    //    W   15  E
    //   SW   S   SE
    boxesAround = [N, NE, E, SE, S, SW, W, NW];
  }
  return boxesAround;
};

export const countMinesAround = (
  mode: TMode,
  minedIndex: Set<unknown>,
  id: number
) => {
  let count = 0;
  if (minedIndex) {
    const boxesAround = getBoxesAround(mode, id);
    boxesAround.forEach((id) => {
      if (minedIndex.has(id)) {
        ++count;
      }
    });
  }
  return count;
};

export const revealChain = (mode: TMode, initialId: number, boxes: TBox) => {
  let unhandledEmptyBoxes = [initialId];
  let foundEmptyBoxes: number[] = [];
  for (let i = 0; i < 1000; i++) {
    for (const ID of unhandledEmptyBoxes) {
      const boxesAround = getBoxesAround(mode, ID);
      for (const id of boxesAround) {
        if (boxes[id].value === 0 && !boxes[id].isRevealed) {
          foundEmptyBoxes.push(id);
        }
        if (!boxes[id].isFlaged && !boxes[id].isQuestion) {
          boxes[id].isRevealed = true;
        }
      }
    }
    unhandledEmptyBoxes = foundEmptyBoxes;
    foundEmptyBoxes = [];
    if (unhandledEmptyBoxes.length === 0) {
      break;
    }
  }
};

export const revealAround = (mode: TMode, id: number, boxes: TBox) => {
  const boxesAround = getBoxesAround(mode, id);
  boxesAround.forEach((id) => {
    if (!boxes[id].isFlaged && !boxes[id].isQuestion) {
      boxes[id].isRevealed = true;
    }
    if (boxes[id].value === 0) {
      revealChain(mode, id, boxes);
    }
  });
};

export const didIStepped = (
  boxes: TBox | null,
  setOver: React.Dispatch<React.SetStateAction<TOver>>
) => {
  if (boxes) {
    const iStepped = Object.entries(boxes).some(
      ([_, { isMine, isRevealed }]) => isMine && isRevealed
    );
    if (iStepped) {
      setOver({ bool: true, isVictory: false });
    }
  }
};

export const didIWon = (
  boxes: TBox | null,
  setOver: React.Dispatch<React.SetStateAction<TOver>>
) => {
  if (boxes) {
    const isJobDone = Object.entries(boxes).every(([_, box]) =>
      box.isMine ? box.isFlaged : box.isRevealed
    );
    if (isJobDone) {
      setOver({ bool: true, isVictory: true });
      return;
    } else {
      return;
    }
  }
};
