import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { TLeaderboards, TMode } from "../@types/minesweeper";
import { processData } from "../utils/minesweeper/utils";
import { easy, midd } from "../constants/minesweeper";

interface IPopupProps {
  time: number;
  mode: TMode;
  leaderboard: TLeaderboards | null;
  setLeaderboard: React.Dispatch<React.SetStateAction<TLeaderboards | null>>;
}

const Wrapper = styled.article``;
const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;

const Popup: React.FC<IPopupProps> = ({
  time,
  mode,
  leaderboard,
  setLeaderboard,
}) => {
  const [text, setText] = useState("");
  return (
    <Wrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(text);
          Axios.post("http://localhost:4000/api/minesweeper/post", {
            username: text,
            time,
            mode,
          }).then((res) => {
            const data = processData(res.data);
            if (leaderboard) {
              if (mode.level === easy.level) {
                setLeaderboard({ ...leaderboard, easy: data });
              } else if (mode.level === midd.level) {
                setLeaderboard({ ...leaderboard, midd: data });
              } else {
                setLeaderboard({ ...leaderboard, hard: data });
              }
            }
          });
        }}
      >
        <Input
          name="username"
          type="text"
          placeholder="what is your name?"
          //   required
          onChange={(e) => setText(e.target.value)}
        ></Input>
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
};

export default Popup;
