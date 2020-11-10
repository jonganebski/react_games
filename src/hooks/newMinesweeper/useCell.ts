import { useState } from "react";
import { CellService } from "utils/newMinesweeper/utils";

export const useCell = (cell: CellService) => {
  const [value, setValue] = useState("");

  const onContextMenu = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
  };

  const onMouseUp = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    const { isSafe, value } = cell.changeStatus(e.button);
    setValue(value);
    if (!isSafe) {
      // gameover
    }
  };
  return { value, onMouseUp, onContextMenu };
};
