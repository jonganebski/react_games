import { TBox, TMode } from "../Components/main";

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

export const countMinesAround = (
  mode: TMode,
  minedIndex: Set<unknown>,
  id: number
) => {
  let count = 0;
  if (minedIndex) {
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
    let boxesAround;
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
    boxesAround.forEach((id) => {
      if (minedIndex.has(id)) {
        ++count;
      }
    });
  }
  return count;
};
