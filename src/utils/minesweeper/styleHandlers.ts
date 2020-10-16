import { StyledProps } from "styled-components";
import { IMineBoxShellProps, IBoxContent } from "../../Components/Minesweeper";

export const getShellOpacity = (props: StyledProps<IMineBoxShellProps>) => {
  if (props.status === 3 && props.isMine && !props.isFlaged) {
    return 0;
  }
  if (props.isRevealed) {
    return 0;
  }
  return 1;
};

export const getContentColor = (props: StyledProps<IBoxContent>) => {
  switch (props.value) {
    case 1:
      return "#00B5D8"; // cyan.500
    case 2:
      return "#38A169"; // green.500
    case 3:
      return "#E53E3E"; // red.500
    case 4:
      return "#3182CE"; // blue.500
    case 5:
      return "#DD6B20"; // orange.500
    case 6:
      return "#319795"; // teal.500
    case 7:
      return "#805AD5"; // pruple.500
    case 8:
      return "black";
  }
};
