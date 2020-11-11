import { GameStatus } from "types/minsweeper.types";
import { CellService, getArroundCells } from "utils/minesweeper/utils";

export const autoReveal = (
  field: CellService[][],
  rowIdx: number,
  colIdx: number
) => {
  const cells: CellService[] = getArroundCells(field, rowIdx, colIdx);
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].status === "init") {
      const { value } = cells[i].changeStatus("reveal");
      if (value === "") {
        autoReveal(field, cells[i].rowIdx, cells[i].colIdx);
      }
    }
  }
};

export const useCell = (
  field: CellService[][],
  setField: React.Dispatch<React.SetStateAction<CellService[][] | null>>,
  cell: CellService,
  gameStatus: GameStatus,
  gameStart: (rowIdx: number, colIdx: number) => void,
  gameOver: () => void
) => {
  const stopMouseEvents = gameStatus === "gameOver" || gameStatus === "victory";

  const onContextMenu = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (stopMouseEvents) {
      return;
    }
    const arroundCells = getArroundCells(field, cell.rowIdx, cell.colIdx);
    if (e.buttons === 1) {
      cell.isDown = false;
    } else if (e.buttons === 3) {
      cell.isDown = false;
      arroundCells.forEach((cell: CellService) => (cell.isDown = false));
    }
    setField([...field]);
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (stopMouseEvents) {
      return;
    }
    const arroundCells = getArroundCells(field, cell.rowIdx, cell.colIdx);
    if (e.buttons === 1) {
      cell.isDown = true;
    } else if (e.buttons === 3) {
      cell.isDown = true;
      arroundCells.forEach((cell: CellService) => (cell.isDown = true));
    }
    setField([...field]);
  };

  const onDoubleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (stopMouseEvents) {
      return;
    }
    const arroundCells = getArroundCells(field, cell.rowIdx, cell.colIdx);
    if (cell.status === "revealed") {
      if (
        cell.getValue() !==
        arroundCells.filter((cell: CellService) => cell.status === "flaged")
          .length +
          ""
      ) {
        return;
      }
      arroundCells.forEach((cell: CellService) => {
        if (cell.status === "init") {
          const { isSafe, value } = cell.changeStatus("reveal");
          if (value === "") {
            autoReveal(field, cell.rowIdx, cell.colIdx);
          }
          if (!isSafe && gameStatus === "playing") {
            gameOver();
            console.log("GAME OVER");
          }
        }
      });
      setField([...field]);
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (stopMouseEvents) {
      return;
    }
    cell.isDown = true;
    const arroundCells = getArroundCells(field, cell.rowIdx, cell.colIdx);
    if (e.buttons === 3) {
      arroundCells.forEach((cell: CellService) => {
        if (!cell.getValue()) {
          cell.isDown = true;
        }
      });
    }
    setField([...field]);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (stopMouseEvents) {
      return;
    }

    cell.isDown = false;
    const arroundCells = getArroundCells(field, cell.rowIdx, cell.colIdx);
    arroundCells.forEach((cell: CellService) => (cell.isDown = false));
    if (e.buttons === 2) {
      if (
        cell.getValue() !==
        arroundCells.filter((cell: CellService) => cell.status === "flaged")
          .length +
          ""
      ) {
        setField([...field]);
        return;
      }
      arroundCells.forEach((cell: CellService) => {
        if (cell.status === "init") {
          const { isSafe, value } = cell.changeStatus("reveal");
          if (value === "") {
            autoReveal(field, cell.rowIdx, cell.colIdx);
          }
          if (!isSafe && gameStatus === "playing") {
            console.log(gameStatus);
            gameOver();
            console.log("GAME OVER");
          }
        }
      });
    }
    if (e.button === 0) {
      gameStart(cell.rowIdx, cell.colIdx);
      if (!e.currentTarget.value) {
        const { isSafe, value } = cell.changeStatus("reveal");
        if (value === "") {
          autoReveal(field, cell.rowIdx, cell.colIdx);
        }
        if (!isSafe && gameStatus === "playing") {
          gameOver();
          console.log("GAME OVER");
        }
      }
    } else if (e.button === 2) {
      const { value } = cell.changeStatus("else");
    }
    setField([...field]);
  };
  return {
    value: cell.getValue(),
    onMouseUp,
    onMouseDown,
    onMouseLeave,
    onMouseEnter,
    onDoubleClick,
    onContextMenu,
  };
};
