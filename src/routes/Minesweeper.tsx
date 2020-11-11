import Button from "components/Minesweeper/Button";
import Cell from "components/Minesweeper/Cell";
import FieldHeader from "components/Minesweeper/FieldHeader";
import Popup from "components/Minesweeper/Popup";
import Leaderboard from "components/LeaderBoard";
import { CELL_SIZE, easy, hard, midd } from "constants/minesweeper";
import { useField } from "hooks/minesweeper/useField";
import { useGameStatus } from "hooks/minesweeper/useGameStatus";
import { usePlayerEmoji } from "hooks/minesweeper/usePlayerImoji";
import { useLeaderboard } from "hooks/useLeaderboard";
import { usePopup } from "hooks/usePopup";
import { Difficulty } from "interfaces/minesweeper.interface";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface FieldProps {
  difficulty: Difficulty;
}

const Wrapper = styled.div`
  position: relative;
  height: 90vh;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Field = styled.section<FieldProps>`
  width: min-content;
  display: grid;
  grid-gap: 1px;
  background-color: dimgray;
  border: 1px solid dimgray;
  grid-template-columns: ${({ difficulty }) =>
    `repeat(${difficulty.size.x}, ${CELL_SIZE}px)`};
  grid-template-rows: ${({ difficulty }) =>
    `repeat(${difficulty.size.y}, ${CELL_SIZE}px)`};
`;

const FieldContainer = styled.main`
  width: min-content;
`;

const ButtonGroup = styled.div``;

const NewMinesweeper = () => {
  const { field, setField, generateField } = useField();
  const {
    difficulty,
    time,
    flagCount,
    gameStatus,
    gameReady,
    gameStart,
    gameOver,
  } = useGameStatus(field, generateField);
  const { imoji, mouseEventHandlers } = usePlayerEmoji(gameStatus);
  const { leaderboard, setLeaderboard } = useLeaderboard(difficulty.GET_URL);
  const { popup, setPopup, handleSubmit } = usePopup(
    gameStatus === "victory",
    leaderboard,
    setLeaderboard,
    time
  );

  return (
    <Wrapper>
      {popup.bool && !popup.submitted && (
        <Popup
          time={time}
          difficulty={difficulty}
          setPopup={setPopup}
          handleSubmit={handleSubmit}
        />
      )}
      <Left>
        <FieldContainer>
          <FieldHeader
            difficulty={difficulty}
            imoji={imoji}
            time={time}
            gameReady={gameReady}
            flagCount={flagCount}
          />
          <Field difficulty={difficulty} {...mouseEventHandlers}>
            {field?.map((row) =>
              row.map((cell, colIdx) => (
                <Cell
                  key={colIdx}
                  field={field}
                  setField={setField}
                  cell={cell}
                  gameStatus={gameStatus}
                  gameStart={gameStart}
                  gameOver={gameOver}
                />
              ))
            )}
          </Field>
        </FieldContainer>
      </Left>
      <Right>
        <ButtonGroup>
          <Button
            onClick={() => gameReady(easy)}
            text="easy"
            active={difficulty.level === "easy"}
            margin="10px 0px 10px 0px"
          />
          <Button
            onClick={() => gameReady(midd)}
            text="moderate"
            active={difficulty.level === "midd"}
            margin="10px 0px 10px 0px"
          />
          <Button
            onClick={() => gameReady(hard)}
            text="hard"
            active={difficulty.level === "hard"}
            margin="10px 0px 10px 0px 0px 10px 0px"
          />
          <Link to="/">
            <Button text="HOME" margin="50px 0px 0px 0px" />
          </Link>
        </ButtonGroup>
        <Leaderboard leaderboard={leaderboard} />
      </Right>
    </Wrapper>
  );
};

export default NewMinesweeper;
