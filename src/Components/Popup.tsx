import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { TLeaderboards, TMode } from "../@types/minesweeper";
import { processData } from "../utils/minesweeper/utils";
import { timeToString } from "../utils/globalUtils";

interface IPopupProps {
  time: number;
  record: number;
  mode: TMode;
  leaderboard: TLeaderboards | null;
  setLeaderboard: React.Dispatch<React.SetStateAction<TLeaderboards | null>>;
}

const Wrapper = styled.article`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 400px;
  background-color: powderblue;
  border-radius: 5px;
  padding: 20px;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;
const Text = styled.span``;
const Form = styled.form``;
const Input = styled.input`
  display: block;
`;
const Button = styled.button``;

const Popup: React.FC<IPopupProps> = ({
  time,
  record,
  mode,
  leaderboard,
  setLeaderboard,
}) => {
  const [text, setText] = useState("");
  return (
    <Wrapper>
      <Header>
        <Text>It's a new record!</Text>
        <Button>
          <span role="img" aria-label="close">
            ❌
          </span>
        </Button>
      </Header>
      <body>
        <Text>{timeToString(record)}</Text>
        <Text>
          Difficulty: {mode.level === "midd" ? "moderate" : mode.level}
        </Text>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
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
        >
          <Input
            name="username"
            type="text"
            placeholder="what is your name?"
            value={text}
            //   required
            onChange={(e) => setText(e.target.value)}
          ></Input>
          <Button type="submit">Submit</Button>
        </Form>
      </body>
    </Wrapper>
  );
};

export default Popup;
