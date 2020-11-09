import React from "react";
import styled from "styled-components";
import { useBox } from "../../hooks/sudoku/useBox";
import {
  handleBoxBorderRight,
  handleBoxBorderTop,
  handleInputColor,
  handleInputFontWeight,
} from "../../utils/sudoku/styleHandlers";

export interface IBoxContainerProps {
  isValid?: boolean;
  isFixed?: boolean;
}

const BoxContainer = styled.div<IBoxContainerProps>`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: ${(props) => (props.isFixed ? "whitesmoke" : "white")};
  cursor: pointer;
  font-size: 22px;
  border-top: ${({ className }) => handleBoxBorderTop(className)};
  border-right: ${({ className }) => handleBoxBorderRight(className)};
`;

const InputsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Input = styled.input<IBoxContainerProps>`
  all: unset;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 10;
  font-weight: ${handleInputFontWeight};
  color: ${handleInputColor};
  &:focus {
    background-color: #ebf8ff;
  }
`;

const Notes = styled.div`
  all: unset;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Note = styled.div`
  all: unset;
  font-size: 12px;
  text-align: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

interface BoxProps {
  rowIdx: number;
  numIdx: number;
  num: number;
  hotTemplate: number[][];
  coolTemplate: React.MutableRefObject<number[][]>;
  notesOn: boolean;
  solved: boolean;
  setHotTemplate: React.Dispatch<React.SetStateAction<number[][] | null>>;
}

const Box: React.FC<BoxProps> = ({
  rowIdx,
  numIdx,
  num,
  hotTemplate,
  coolTemplate,
  notesOn,
  solved,
  setHotTemplate,
}) => {
  const { indicator, isFixed, isValid, setCurrentBox, handleKeyDown } = useBox(
    rowIdx,
    numIdx,
    num,
    hotTemplate,
    coolTemplate,
    notesOn,
    solved,
    setHotTemplate
  );
  return (
    <BoxContainer className={indicator} isFixed={isFixed}>
      <InputsContainer>
        <Input
          type="text"
          id={indicator}
          isValid={num === 0 ? true : isValid}
          isFixed={isFixed}
          value={num === 0 ? "" : num}
          readOnly={true}
          maxLength={1}
          onFocus={() => setCurrentBox(`${rowIdx}-${numIdx}`)}
          onKeyDown={handleKeyDown}
        ></Input>
        <Notes>
          {Array.from(Array(9).keys()).map((n, i) => {
            const id = `note-${rowIdx}-${numIdx}-${n + 1}`;
            return <Note key={i} id={id}></Note>;
          })}
        </Notes>
      </InputsContainer>
    </BoxContainer>
  );
};

export default Box;
