import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TBox, TMode, TOver, TStart } from "../@types/minesweeper";
import { easy, hard, midd, mineBoxSize } from "../constants/minesweeper";
import {
  handleClick,
  handleContextMenu,
  handleDoubleClick,
  handleMouseDown,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseUp,
} from "../utils/minesweeper/eventListeners";
import {
  countMinesAround,
  didIStepped,
  didIWon,
  getMinesIndex,
} from "../utils/minesweeper/utils";

// ------------- INTERFACE -------------

interface IBoxContent {
  isMine: boolean;
}
interface IMineBoxShellProps {
  isRevealed: boolean;
  isMine: boolean;
  over: TOver;
  onClick: (e: any) => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// ------------- STYLED COMPONENTS -------------
const Container = styled.div`
  display: grid;
  gap: 1px;
`;

const MineBox = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  background-color: lightgray;
`;

const MineBoxShell = styled.div<IMineBoxShellProps>`
  position: absolute;
  z-index: 10;
  width: 25px;
  height: 25px;
  background-color: lightgray;
  border-top: 3px solid whitesmoke;
  border-right: 2px solid dimgray;
  border-left: 3px solid whitesmoke;
  border-bottom: 2px solid dimgray;
  cursor: default;
  opacity: ${(props) => {
    if (props.over.bool && !props.over.isVictory && props.isMine) {
      console.log("Boom!!!");
      return 0;
    }
    if (props.isRevealed) {
      return 0;
    }
    if (!props.isRevealed) {
      return 0.6;
    }
  }};
` as React.FC<IMineBoxShellProps>;

const BoxContent = styled.div<IBoxContent>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isMine ? "red" : "lightgray")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
` as React.FC<IBoxContent>;

// -------------  MAIN COMPONENT -------------

const Minesweeper = () => {
  const [mode, setMode] = useState<TMode>(midd);
  const [boxes, setBoxes] = useState<TBox | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [start, setStart] = useState<TStart>({ bool: false, id: 0 });
  const [over, setOver] = useState<TOver>({ bool: false, isVictory: false });

  useEffect(() => {
    setStart({ bool: false, id: 0 });
    setOver({ bool: false, isVictory: false });
    const stateArr = Array.from(Array(mode.size.x * mode.size.y).keys());
    const stateObj: TBox = {};
    stateArr.forEach(
      (num) =>
        (stateObj[num + 1] = {
          value: -1,
          isMine: false,
          isFlaged: false,
          isQuestion: false,
          isRevealed: false,
        })
    );
    setBoxes(stateObj);
  }, [mode]);

  useEffect(() => {
    if (start.bool && boxes) {
      const newBoxes = { ...boxes };
      const minesIndex = getMinesIndex(mode, start.id);
      Object.entries(boxes).forEach(([key, value]) => {
        const count = countMinesAround(mode, minesIndex, parseInt(key));
        newBoxes[parseInt(key)].value = minesIndex.has(parseInt(key))
          ? -1
          : count;
        newBoxes[parseInt(key)].isMine = minesIndex.has(parseInt(key))
          ? true
          : false;
      });
      setBoxes(newBoxes);
      setIsReady(true);
    }
  }, [start]);

  useEffect(() => {
    didIStepped(boxes, setOver);
    didIWon(boxes, setOver);
  }, [boxes]);

  return (
    <>
      <span>
        {!over.bool
          ? ""
          : over.bool && over.isVictory
          ? "You won!"
          : "You lost..."}
      </span>
      <Container
        style={{
          width: "min-content",
          backgroundColor: "dimgray",
          gridTemplateColumns: `repeat(${mode.size.x}, ${mineBoxSize}px)`,
        }}
      >
        {boxes &&
          Object.entries(boxes).map(
            ([_, { isRevealed, isMine, isFlaged, isQuestion, value }], i) => {
              return (
                <MineBox key={i} id={`${i + 1}`}>
                  <MineBoxShell
                    isRevealed={isRevealed}
                    over={over}
                    isMine={isMine}
                    onClick={(e) =>
                      handleClick(e, mode, boxes, over, setBoxes, setOver)
                    }
                    onContextMenu={(e) =>
                      handleContextMenu(e, boxes, over, setBoxes)
                    }
                    onDoubleClick={(e) =>
                      handleDoubleClick(e, mode, boxes, over, setBoxes)
                    }
                    onMouseDown={(e) => handleMouseDown(e, mode, over)}
                    onMouseUp={(e) =>
                      handleMouseUp(
                        e,
                        mode,
                        boxes,
                        start,
                        over,
                        setBoxes,
                        setStart,
                        setOver
                      )
                    }
                    onMouseEnter={(e) => handleMouseEnter(e, mode, over)}
                    onMouseLeave={(e) => handleMouseLeave(e, mode, over)}
                  >
                    {isFlaged ? "🚩" : isQuestion ? "❓" : ""}
                  </MineBoxShell>
                  {isReady && (
                    <BoxContent isMine={isMine}>
                      {value === -1 ? "💣" : value === 0 ? "" : value}
                    </BoxContent>
                  )}
                </MineBox>
              );
            }
          )}
      </Container>
      <select
        defaultValue={midd.level}
        onChange={(e) => {
          if (e.currentTarget.value === easy.level) {
            setMode(easy);
          } else if (e.currentTarget.value === midd.level) {
            setMode(midd);
          } else {
            setMode(hard);
          }
        }}
      >
        <option value={easy.level}>Easy</option>
        <option value={midd.level}>Moderate</option>
        <option value={hard.level}>Hard</option>
      </select>
    </>
  );
};

export default Minesweeper;
