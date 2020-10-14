import { TBox, TMode } from "../Components/main";

export const getMinesIndex = (mode: TMode) => {
  const minesIndex = new Set();
  for (let i = 0; i < 1000; i++) {
    console.log("loop");
    const index = Math.ceil(Math.random() * mode.size.x * mode.size.y);
    minesIndex.add(index);
    if (minesIndex.size === mode.totalMines) {
      break;
    }
  }
  return minesIndex;
};

export const countMinesAround = (mode: TMode, box: TBox, id: number) => {
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
  let arr;
  if (id === 1) {
    arr = [E, SE, S];
  } else if (id === xLength) {
    arr = [S, SW, W];
  } else if (id === lastId) {
    arr = [W, NW, N];
  } else if (id === lastId - xLength + 1) {
    arr = [N, NE, E];
  } else if (id < xLength) {
    arr = [E, SE, S, SW, W];
  } else if (id % xLength === 0) {
    arr = [S, SW, W, NW, N];
  } else if (lastId - xLength + 1 < id && id < lastId) {
    arr = [W, NW, N, NE, E];
  } else if (id % xLength === 1) {
    arr = [N, NE, E, SE, S];
  } else {
    arr = [N, NE, E, SE, S, SW, W, NW];
  }
  console.log("arr: ", arr);
  let count = 0;
  arr.forEach((num) => {
    box[num]?.isMine ?? false ? (count = count + 1) : (count = count + 0);
  });
  return count;
};
