import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { TLeaderboards, TMode } from "../@types/minesweeper";
import { processData } from "../utils/minesweeper/utils";
import { timeToString } from "../utils/globalUtils";
import MinesweeperBtn from "./Minesweeper/Button";

interface IPopupProps {
  time: number;
  record: number;
  mode: TMode;
  leaderboard: TLeaderboards | null;
  setLeaderboard: React.Dispatch<React.SetStateAction<TLeaderboards | null>>;
  setIsNewRecord: React.Dispatch<React.SetStateAction<boolean>>;
}

const Wrapper = styled.article`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: powderblue;
  border-radius: 5px;
  padding: 50px 20px 50px 20px;
  z-index: 10;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086);
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:active {
    border-top: 2px solid dimgray;
    border-right: 2px solid whitesmoke;
    border-left: 2px solid dimgray;
    border-bottom: 2px solid whitesmoke;
  }
`;

const Heading = styled.h2`
  font-size: 25px;
`;
const Text = styled.span`
  font-size: 15px;
`;

const Input = styled.input`
  all: unset;
  display: block;
  width: 100%;
  font-family: "Press Start 2P", cursive;
  font-size: 17px;
  letter-spacing: 2px;
  border: 1px solid silver;
  padding: 10px;
  box-sizing: border-box;
`;

const Warning = styled.span`
  color: maroon;
`;

const Popup: React.FC<IPopupProps> = ({
  time,
  record,
  mode,
  leaderboard,
  setLeaderboard,
  setIsNewRecord,
}) => {
  const [text, setText] = useState("");
  return (
    <Wrapper>
      <CloseBtn onClick={() => setIsNewRecord(false)}>
        <span role="img" aria-label="close">
          ❌
        </span>
      </CloseBtn>

      <Heading>It's a new record!</Heading>

      <Text>Record: {timeToString(record)}</Text>
      <Text>Difficulty: {mode.level === "midd" ? "moderate" : mode.level}</Text>
      <div style={{ height: "30px", width: "100%" }}>
        <Input
          name="username"
          type="text"
          placeholder="what is your name?"
          value={text}
          autoComplete="off"
          required
          onChange={(e) => setText(e.target.value)}
        ></Input>
        <Warning>
          {0 < text.length && text.length < 2
            ? "username too short"
            : 15 < text.length
            ? "username too long"
            : ""}
        </Warning>
      </div>
      <MinesweeperBtn
        text="Submit"
        onClick={(e) => {
          e.preventDefault();
          if (text.length < 2 || 15 < text.length) {
            return;
          }
          console.log(text);
          setText("");
          Axios.post("http://localhost:4000/api/minesweeper/post", {
            username: text,
            time,
            mode,
          }).then((res) => {
            const data = processData(res.data);
            const { level } = mode;
            if (leaderboard) {
              setLeaderboard({ ...leaderboard, [level]: data });
            }
          });
        }}
      />
    </Wrapper>
  );
};

export default Popup;
