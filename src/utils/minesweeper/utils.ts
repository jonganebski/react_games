import { TBox, TBoxValues, TMode } from "../../@types/minesweeper";

export const getMinesIndex = (mode: TMode, startId: number) => {
  const minesIndex = new Set();
  for (let i = 0; i < 1000; i++) {
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

export const getBoxesAround = (mode: TMode, id: number) => {
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
  const box = boxes[id];
  let flagsCountAround = 0;
  const minesCountAround = box.value;
  const boxesAround = getBoxesAround(mode, id);
  boxesAround.forEach((id) => {
    const box = boxes[id];
    if (box.isFlaged) {
      ++flagsCountAround;
    }
  });
  if (flagsCountAround === minesCountAround) {
    boxesAround.forEach((id) => {
      const box = boxes[id];
      if (!box.isFlaged && !box.isQuestion) {
        box.isRevealed = true;
      }
      if (box.value === 0) {
        revealChain(mode, id, boxes);
      }
    });
  }
};

export const didIStepped = (
  boxes: TBox | null,
  indicatorRef: React.MutableRefObject<HTMLButtonElement | null>,
  setStatus: React.Dispatch<React.SetStateAction<number>>
) => {
  if (boxes) {
    const iStepped = Object.values(boxes).some(
      ({ isMine, isRevealed }) => isMine && isRevealed
    );
    if (iStepped) {
      setStatus(2);
      Object.values(boxes).forEach(
        (box) => box.isMine && (box.isRevealed = true)
      );
      if (indicatorRef?.current) {
        indicatorRef.current.innerHTML = `<span role="img" aria-label="imoji">💀</span>`;
      }
    }
  }
};

export const didIWon = (
  boxes: TBox | null,
  indicatorRef: React.MutableRefObject<HTMLButtonElement | null>,
  setStatus: React.Dispatch<React.SetStateAction<number>>
) => {
  if (boxes) {
    const isJobDone = Object.values(boxes).every((box) =>
      box.isMine ? box.isFlaged : box.isRevealed
    );
    if (isJobDone) {
      setStatus(3);
      if (indicatorRef?.current) {
        // indicatorRef.current.style.backgroundColor = "green";
        indicatorRef.current.innerHTML = `<span role="img" aria-label="imoji">😎</span>`;
      }
      return;
    } else {
      return;
    }
  }
};

export const paintPressed = (target: EventTarget & HTMLDivElement) => {
  target.style.borderTop = "2px solid dimgray";
  target.style.borderRight = "2px solid whitesmoke";
  target.style.borderBottom = "2px solid whitesmoke";
  target.style.borderLeft = "2px solid dimgray";
};

export const paintUnpressed = (target: EventTarget & HTMLDivElement) => {
  target.style.borderTop = "2px solid whitesmoke";
  target.style.borderRight = "2px solid dimgray";
  target.style.borderBottom = "2px solid dimgray";
  target.style.borderLeft = "2px solid whitesmoke";
};

export const paintPressedAround = (mode: TMode, id: number, boxes: TBox) => {
  const boxesAround = getBoxesAround(mode, id);
  boxesAround.forEach((id) => {
    const boxElement = document.getElementById(id.toString())?.firstChild;
    const box = boxes[id];
    if (boxElement && !box.isFlaged && !box.isQuestion) {
      paintPressed(boxElement as HTMLDivElement);
    }
  });
};

export const paintUnpressedAround = (mode: TMode, id: number, boxes: TBox) => {
  const boxesAround = getBoxesAround(mode, id);
  boxesAround.forEach((id) => {
    const boxElement = document.getElementById(id.toString())?.firstChild;
    const box = boxes[id];
    if (boxElement && !box.isFlaged && !box.isQuestion) {
      paintUnpressed(boxElement as HTMLDivElement);
    }
  });
};

export const startGame = (
  box: TBoxValues,
  setStatus: React.Dispatch<React.SetStateAction<number>>
) => {
  setStatus(1);
  box.isRevealed = true;
};

export const processData = (arr: string[]) => {
  const result: { name: string; time: string }[] = [];
  const set = { name: "", time: "" };
  arr.forEach((el, i) => {
    if (i === 0 || i % 2 === 0) {
      set.name = el;
    } else {
      set.time = el;
      result.push({ ...set });
    }
  });
  return result;
};
