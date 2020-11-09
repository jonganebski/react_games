import { StyledProps } from "styled-components";
import { IBoxProps } from "../../Components/Sudoku/Sudoku";

export const handleBoxBorderTop = (className?: string) => {
  if (className) {
    if (className.includes("row4") || className.includes("row7")) {
      return "1px solid black";
    }
  } else {
    return "none";
  }
};

export const handleBoxBorderRight = (className?: string) => {
  if (className) {
    if (className.includes("column3") || className.includes("column6")) {
      return "1px solid black";
    }
  } else {
    return "none";
  }
};

export const handleInputFontWeight = (props: StyledProps<IBoxProps>) => {
  const { isValid, isFixed } = props;
  if (isFixed && isValid) {
    return "normal";
  } else {
    return "600";
  }
};

export const handleInputColor = (props: StyledProps<IBoxProps>) => {
  const { isValid, isFixed } = props;
  if (isFixed && isValid) {
    return "black";
  }
  if (isValid) {
    return "#3182ce";
  }
  return "red";
};
