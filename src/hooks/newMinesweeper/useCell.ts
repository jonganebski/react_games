import { CellService, getArroundCells } from "utils/newMinesweeper/utils";

export const useCell = (
  field: CellService[][],
  setField: React.Dispatch<React.SetStateAction<CellService[][] | null>>,
  cell: CellService
) => {
  const onContextMenu = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
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
    const arroundCells = getArroundCells(field, cell.rowIdx, cell.colIdx);
    if (e.buttons === 1) {
      cell.isDown = true;
    } else if (e.buttons === 3) {
      cell.isDown = true;
      arroundCells.forEach((cell: CellService) => (cell.isDown = true));
    }
    setField([...field]);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
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

  const autoReveal = (
    field: CellService[][],
    rowIdx: number,
    colIdx: number
  ) => {
    const cells: CellService[] = getArroundCells(field, rowIdx, colIdx);
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].status !== "revealed") {
        const { value } = cells[i].changeStatus("reveal");
        if (value === "") {
          autoReveal(field, cells[i].rowIdx, cells[i].colIdx);
        }
      }
    }
  };

  const gameover = () =>
    field.forEach((row) =>
      row.forEach((cell) => {
        if (cell.isMine && cell.status !== "flaged") {
          cell.changeStatus("reveal");
        }
      })
    );

  const onMouseUp = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    cell.isDown = false;
    const arroundCells = getArroundCells(field, cell.rowIdx, cell.colIdx);
    arroundCells.forEach((cell: CellService) => (cell.isDown = false));
    if (e.buttons === 2) {
      arroundCells.forEach((cell: CellService) => {
        if (cell.status === "init") {
          const { isSafe, value } = cell.changeStatus("reveal");
          if (value === "") {
            autoReveal(field, cell.rowIdx, cell.colIdx);
          }
          if (!isSafe) {
            gameover();
            console.log("GAME OVER");
          }
        }
      });
    }
    if (e.button === 0) {
      if (!e.currentTarget.value) {
        const { isSafe, value } = cell.changeStatus("reveal");
        if (value === "") {
          autoReveal(field, cell.rowIdx, cell.colIdx);
        }
        if (!isSafe) {
          gameover();
          console.log("GAME OVER");
        }
      }
    } else if (e.button === 2) {
      const { value } = cell.changeStatus("else");
    }
    setField([...field]);
    console.log(field);
  };
  return {
    value: cell.getValue(),
    onMouseUp,
    onMouseDown,
    onMouseLeave,
    onMouseEnter,
    onContextMenu,
  };
};
