import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { TBox, TLeaderboards, TMode } from "../@types/minesweeper";
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
  getContentColor,
  getShellOpacity,
} from "../utils/minesweeper/styleHandlers";
import { didIStepped, didIWon } from "../utils/minesweeper/utils";
import Timer from "./Timer";
import Leaderboard from "./Leaderboard";
import Popup from "./Popup";

// ------------- INTERFACE -------------

export interface IBoxContent {
  value: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlaged: boolean;
  status: number;
}
export interface IMineBoxShellProps {
  isRevealed: boolean;
  isMine: boolean;
  isFlaged: boolean;
  isQuestion: boolean;
  status: number;
  onClick: (e: any) => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// ------------- STYLED COMPONENTS -------------

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px 5px 20px;
  margin-bottom: 10px;
  background-color: silver;
  border-top: 2px solid whitesmoke;
  border-right: 2px solid dimgray;
  border-left: 2px solid whitesmoke;
  border-bottom: 2px solid dimgray;
`;

const MinesCount = styled.div`
  padding: 3px 5px 3px 5px;
  background-color: black;
  color: red;
  font-family: "Press Start 2P", cursive;
`;

const rotate = keyframes`
from {transform: rotate(0deg)}
to {transform: rotate(360deg)}
`;

const Button = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 30px;
  font-size: 15px;
  background-color: silver;
  border-top: 2px solid whitesmoke;
  border-right: 2px solid dimgray;
  border-left: 2px solid whitesmoke;
  border-bottom: 2px solid dimgray;
  cursor: pointer;
  &:active {
    border-top: 2px solid dimgray;
    border-right: 2px solid whitesmoke;
    border-left: 2px solid dimgray;
    border-bottom: 2px solid whitesmoke;
  }
  &:hover span {
    animation: ${rotate} 0.5s linear infinite;
  }
`;

const Grid = styled.article`
  display: grid;
  gap: 1px;
  border: 1px solid dimgray;
`;

const MineBox = styled.section`
  width: ${mineBoxSize}px;
  height: ${mineBoxSize}px;
  position: relative;
  background-color: lightgray;
`;

const MineBoxShell = styled.button<IMineBoxShellProps>`
  position: absolute;
  z-index: 10;
  width: ${mineBoxSize}px;
  height: ${mineBoxSize}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isFlaged ? "greenyellow" : props.isQuestion ? "gold" : "silver"};
  box-shadow: ${(props) =>
    props.isFlaged
      ? "inset 0 0 8px 1px forestgreen"
      : props.isQuestion
      ? "inset 0 0 8px 1px orangered"
      : "none"};
  border-top: 2px solid whitesmoke;
  border-right: 2px solid dimgray;
  border-left: 2px solid whitesmoke;
  border-bottom: 2px solid dimgray;
  cursor: default;
  opacity: ${getShellOpacity};
` as React.FC<IMineBoxShellProps>;

const BoxContent = styled.div<IBoxContent>`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  color: ${getContentColor};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  box-shadow: ${(props) => (props.isMine ? "inset 0 0 8px 1px red" : "none")};
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
` as React.FC<IBoxContent>;

// ------------- SUB FUNCTIONS -------------

// -------------  MAIN COMPONENT -------------

const Minesweeper = () => {
  const [mode, setMode] = useState<TMode>(midd);
  const [boxes, setBoxes] = useState<TBox | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [flagCount, setFlagCount] = useState(0);
  const indicatorRef = useRef<HTMLButtonElement | null>(null);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState(0);
  // status 0: initial, 1: start, 2: failed, 3: victory
  const [leaderboard, setLeaderboard] = useState<TLeaderboards | null>(null);

  useEffect(() => {
    setStatus(0);
  }, [mode]);

  // Create object with out value and mine. This is just for layout.
  useEffect(() => {
    if (status === 0) {
      if (indicatorRef.current) {
        indicatorRef.current.innerHTML = `<span role="img" aria-label="imoji">🙂</span>`;
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
    if (status === 3 && leaderboard) {
      if (mode.level === easy.level) {
        leaderboard.easy.length < 10 && console.log("Record popup");
        leaderboard.easy.some((set) => parseInt(set.time) > time) &&
          console.log("Record popup");
      } else if (mode.level === midd.level) {
        leaderboard.midd.length < 10 && console.log("Record popup");
        leaderboard.midd.some((set) => parseInt(set.time) > time) &&
          console.log("Record popup");
      } else {
        leaderboard.hard.length < 10 && console.log("Record popup");
        leaderboard.hard.some((set) => parseInt(set.time) > time) &&
          console.log("Record popup");
      }
    }
  }, [mode, status]);

  // It keeps tracking how game's over.
  useEffect(() => {
    if (boxes) {
      const flagCount = Object.values(boxes).filter((value) => value.isFlaged)
        .length;
      setFlagCount(flagCount);
      didIStepped(boxes, indicatorRef, setStatus);
      didIWon(boxes, indicatorRef, setStatus);
    }
  }, [boxes]);

  return (
    <div style={{ width: "min-content" }}>
      <Header>
        <MinesCount>
          {(mode.totalMines - flagCount).toString().padStart(3, "0")}
        </MinesCount>
        <Button ref={indicatorRef} onClick={() => setStatus(0)}></Button>
        <Timer time={time} status={status} setTime={setTime} />
      </Header>
      <Grid
        onContextMenu={(e) => e.preventDefault()}
        style={{
          width: "min-content",
          backgroundColor: "dimgray",
          gridTemplateColumns: `repeat(${mode.size.x}, ${mineBoxSize}px)`,
        }}
      >
        {boxes &&
          Object.values(boxes).map(
            ({ isRevealed, isMine, isFlaged, isQuestion, value }, i) => {
              return (
                <MineBox key={i} id={`${i + 1}`}>
                  <MineBoxShell
                    isRevealed={isRevealed}
                    status={status}
                    isMine={isMine}
                    isFlaged={isFlaged}
                    isQuestion={isQuestion}
                    onClick={(e) =>
                      handleClick(
                        e,
                        mode,
                        boxes,
                        status,
                        setBoxes,
                        setStatus,
                        setIsReady
                      )
                    }
                    onContextMenu={(e) =>
                      handleAuxClick(e, boxes, status, setBoxes)
                    }
                    onDoubleClick={(e) =>
                      handleDoubleClick(e, mode, boxes, status, setBoxes)
                    }
                    onMouseDown={(e) =>
                      handleMouseDown(e, mode, status, boxes, indicatorRef)
                    }
                    onMouseUp={(e) =>
                      handleMouseUp(
                        e,
                        mode,
                        boxes,
                        status,
                        indicatorRef,
                        setBoxes
                      )
                    }
                    onMouseEnter={(e) =>
                      handleMouseEnter(e, mode, status, boxes)
                    }
                    onMouseLeave={(e) =>
                      handleMouseLeave(e, mode, status, boxes)
                    }
                  >
                    {isFlaged ? "🚩" : isQuestion ? "❓" : ""}
                  </MineBoxShell>
                  {isReady && (
                    <BoxContent
                      value={value}
                      isMine={isMine}
                      isRevealed={isRevealed}
                      isFlaged={isFlaged}
                      status={status}
                    >
                      {value === -1 && isRevealed
                        ? "💣"
                        : value === -1 && status > 1
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
      </Grid>
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
      <Leaderboard
        mode={mode}
        leaderboard={leaderboard}
        setLeaderboard={setLeaderboard}
      />
      <Popup
        time={time}
        mode={mode}
        leaderboard={leaderboard}
        setLeaderboard={setLeaderboard}
      />
    </div>
  );
};

export default Minesweeper;
