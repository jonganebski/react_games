import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TBox, TMode, TOver, TStart } from "../@types/minesweeper";
import { easy, hard, midd, mineBoxSize } from "../constants/minesweeper";
import {
  handleAuxClick,
  handleClick,
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
  revealAround,
} from "../utils/minesweeper/utils";
import Timer from "./Timer";

// ------------- INTERFACE -------------

interface IBoxContent {
  isMine: boolean;
  isRevealed: boolean;
  isFlaged: boolean;
  over: TOver;
}
interface IMineBoxShellProps {
  isRevealed: boolean;
  isMine: boolean;
  isFlaged: boolean;
  over: TOver;
  onClick: (e: any) => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onAuxClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// ------------- STYLED COMPONENTS -------------
const Container = styled.div`
  display: grid;
  gap: 1px;
`;

const MineBox = styled.div`
  width: ${mineBoxSize}px;
  height: ${mineBoxSize}px;
  position: relative;
  background-color: lightgray;
`;

const MineBoxShell = styled.div<IMineBoxShellProps>`
  position: absolute;
  z-index: 10;
  width: ${mineBoxSize}px;
  height: ${mineBoxSize}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  border-top: 3px solid whitesmoke;
  border-right: 2px solid dimgray;
  border-left: 3px solid whitesmoke;
  border-bottom: 2px solid dimgray;
  cursor: default;
  opacity: ${(props) => {
    if (
      props.over.bool &&
      !props.over.isVictory &&
      props.isMine &&
      !props.isFlaged
    ) {
      console.log("Boom!!!");
      return 0;
    }
    if (props.isRevealed) {
      return 0;
    }
    if (!props.isRevealed) {
      return 0.7;
    }
  }};
` as React.FC<IMineBoxShellProps>;

const BoxContent = styled.div<IBoxContent>`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isMine && props.isRevealed
      ? "red"
      : props.isMine &&
        props.over.bool &&
        !props.over.isVictory &&
        !props.isFlaged
      ? "red"
      : "lightgray"};
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  cursor: default;
` as React.FC<IBoxContent>;

// -------------  MAIN COMPONENT -------------

const Minesweeper = () => {
  const [mode, setMode] = useState<TMode>(midd);
  const [boxes, setBoxes] = useState<TBox | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [start, setStart] = useState<TStart>({ bool: false, id: 0 });
  const [over, setOver] = useState<TOver>({ bool: false, isVictory: false });
  const [flagCount, setFlagCount] = useState(0);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  const initialized = !start.bool && !over.bool && !isReady;
  const initialize = () => {
    setStart({ bool: false, id: 0 });
    setOver({ bool: false, isVictory: false });
    setIsReady(false);
  };

  useEffect(() => {
    initialize();
  }, [mode]);

  // Create object with out value and mine. This is just for layout.
  useEffect(() => {
    if (initialized) {
      if (indicatorRef.current) {
        indicatorRef.current.style.backgroundColor = "peru";
      }
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
    }
  }, [mode, start, over, initialized]);

  // The mines will be deployed after user's initial click. It prevents initial click is dead end.
  useEffect(() => {
    if (start.bool && boxes) {
      const newBoxes = { ...boxes };
      const minesIndex = getMinesIndex(mode, start.id);
      Object.entries(boxes).forEach(([key, _]) => {
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

  // If initial click's value is 0, it will automatically take auto reveal chaining.
  // I couldn'y handle this in eventlistener. Because onMouseUp is busy taking care of both click action.
  useEffect(() => {
    if (start.id !== 0 && boxes) {
      revealAround(mode, start.id, boxes);
    }
  }, [start.id]);

  // It keeps tracking how game's over.
  useEffect(() => {
    if (boxes) {
      const flagCount = Object.values(boxes).filter((value) => value.isFlaged)
        .length;
      setFlagCount(flagCount);
      didIStepped(boxes, indicatorRef, setOver);
      didIWon(boxes, indicatorRef, setOver);
    }
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
      <button onClick={initialize}>new game</button>
      <span>{mode.totalMines - flagCount}</span>
      <div
        ref={indicatorRef}
        style={{ width: 20, height: 10, backgroundColor: "peru" }}
      ></div>
      <Container
        onContextMenu={(e) => e.preventDefault()}
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
                    isFlaged={isFlaged}
                    onClick={(e) =>
                      handleClick(
                        e,
                        mode,
                        boxes,
                        start,
                        over,
                        setBoxes,
                        setStart
                      )
                    }
                    onAuxClick={(e) => handleAuxClick(e, boxes, over, setBoxes)}
                    onContextMenu={(e) => e.preventDefault()}
                    onDoubleClick={(e) =>
                      handleDoubleClick(e, mode, boxes, over, setBoxes)
                    }
                    onMouseDown={(e) =>
                      handleMouseDown(e, mode, over, boxes, indicatorRef)
                    }
                    onMouseUp={(e) =>
                      handleMouseUp(
                        e,
                        mode,
                        boxes,
                        over,
                        indicatorRef,
                        setBoxes
                      )
                    }
                    onMouseEnter={(e) => handleMouseEnter(e, mode, over, boxes)}
                    onMouseLeave={(e) => handleMouseLeave(e, mode, over, boxes)}
                  >
                    {isFlaged ? "🚩" : isQuestion ? "❓" : ""}
                  </MineBoxShell>
                  {isReady && (
                    <BoxContent
                      isMine={isMine}
                      isRevealed={isRevealed}
                      isFlaged={isFlaged}
                      over={over}
                    >
                      {value === -1 && isRevealed
                        ? "💣"
                        : value === -1 && over.bool
                        ? "💣"
                        : value !== 0 && isRevealed
                        ? value
                        : ""}
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
      <Timer start={start} over={over} />
    </>
  );
};

export default Minesweeper;
